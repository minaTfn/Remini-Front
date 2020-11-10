import React, {useEffect, useState, useCallback} from "react";
import {normalize} from "normalizr";
import {useSelector, useDispatch} from "react-redux";
import _ from "lodash";
import Pagination from "react-js-pagination";
import Loader from 'react-loader';
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import qs from "query-string";
import {myDeliveriesSchema} from "../../utils/schemas";
import {myDeliveriesFetched, myDeliveriesCounted} from "../../reducers/deliverySlice";
import api from "../../utils/api";
import {myDeliveriesSelector, myDeliveriesCountSelector} from "../delivery/selectors";
import DeliveriesList from "../delivery/DeliveriesList";

function DeliveriesPage() {
    const perPage = 9;

    const dispatch = useDispatch();
    const selectState = useSelector((state) => state);
    const myStoredDeliveries = myDeliveriesSelector(selectState);
    const myDeliveriesCount = myDeliveriesCountSelector(selectState);

    const [currentPage, setCurrentPage] = useState(1);
    const [loaded, setLoaded] = useState(true);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchDeliveries = useCallback(async () => {
        // sending page count and current page as parameters to api
        const items = {};
        items.page = currentPage;
        items.page_size = perPage;

        const params = `?${qs.stringify(items, {
            skipNull: true,
        })}`;

        const data = await api.delivery.getMyDeliveries(params);
        // setTotalItems(data.meta.total);
        const normalizedResult = normalize(data.data, [myDeliveriesSchema]);
        dispatch(myDeliveriesFetched(normalizedResult));
        dispatch(myDeliveriesCounted(data.meta.total));

        setLoaded(true);
    }, [dispatch, currentPage]);

    useEffect(() => {
        fetchDeliveries();
    }, [loaded, currentPage, fetchDeliveries]);

    return (
        <Loader loaded={loaded}>
            <div>
                <Link className="btn btn-success" to="my-deliveries/new">
                    <FormattedMessage
                        id="delivery.new"
                        defaultMessage="New Delivery"
                    />
                </Link>
                <DeliveriesList totalItems={myDeliveriesCount} deliveries={myStoredDeliveries} myDelivery/>
                {!_.isEmpty(myStoredDeliveries) && (
                    <>

                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={perPage}
                            totalItemsCount={myDeliveriesCount}
                            pageRangeDisplayed={5}
                            itemClass="page-item"
                            linkClass="page-link"
                            onChange={(e) => handlePageChange(e)}
                        />
                    </>
                )
                }
            </div>
        </Loader>
    );
}

export default DeliveriesPage;

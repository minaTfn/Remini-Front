import React, {useEffect, useState, useCallback} from "react";
import {normalize} from "normalizr";
import {useSelector, useDispatch} from "react-redux";
import _ from "lodash";
import Pagination from "react-js-pagination";
import AddDelivery from "./AddDelivery";
import {myDeliveriesSchema} from "../../utils/schemas";
import {myDeliveriesFetched} from "../../reducers/deliverySlice";
import MyDeliveriesList from "./MyDeliveriesList";

import api from "../../utils/api";
import {myDeliveriesSelector} from "./selectors";
import {convertObjectToUrlParams} from "../common/Functions";

function DeliveriesPage() {
    const perPage = 5;

    const dispatch = useDispatch();
    const selectState = useSelector((state) => state);
    const myStoredDeliveries = myDeliveriesSelector(selectState);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loaded, setLoaded] = useState(true);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchDeliveries = useCallback(async () => {
        // sending page count and current page as parameters to api
        const items = {};
        items.page = currentPage;
        items.page_size = perPage;
        const params = convertObjectToUrlParams(items);

        const data = await api.delivery.getMyDeliveries(params);
        setTotalItems(data.count);
        const normalizedResult = normalize(data.results, [myDeliveriesSchema]);
        await dispatch(myDeliveriesFetched(normalizedResult));

        setLoaded(true);
    }, [dispatch, currentPage]);

    useEffect(() => {
        fetchDeliveries();
    }, [loaded, currentPage, fetchDeliveries]);

    return (
        <>
            <div>
                {_.isEmpty(myStoredDeliveries) && <AddDelivery/>}
                {!_.isEmpty(myStoredDeliveries) && (
                    <MyDeliveriesList deliveries={myStoredDeliveries}/>
                )}
            </div>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={perPage}
                totalItemsCount={totalItems}
                pageRangeDisplayed={5}
                itemClass="page-item"
                linkClass="page-link"
                onChange={(e) => handlePageChange(e)}
            />
        </>
    );
}

export default DeliveriesPage;

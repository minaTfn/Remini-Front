import React, {useEffect, useState, useCallback} from "react";
import {normalize} from "normalizr";
import {useLocation} from "react-router-dom";
import Loader from "react-loader";
import _ from "lodash";
import qs from 'query-string';
import Pagination from "react-js-pagination";
import {myDeliveriesSchema} from "../../utils/schemas";
import DeliveriesList from "../delivery/DeliveriesList";
import api from "../../utils/api";
import SearchDeliveryForm from "../delivery/SearchDeliveryForm";

function HomePage(props) {
    const perPage = 9;

    const query = new URLSearchParams(useLocation().search);
    const page = query.get("page") ? parseInt(query.get("page")) : 1;
    const fromCountry = query.get("fromCountry") ? parseInt(query.get("fromCountry")) : 0;
    const toCountry = query.get("toCountry") ? parseInt(query.get("toCountry")) : 0;
    const q = query.get("q") ? query.get("q") : null;

    const [currentPage, setCurrentPage] = useState(page);
    const [totalItems, setTotalItems] = useState(0);
    const [deliveriesList, setDeliveriesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTitle, setSearchTitle] = useState(q);
    const [origin, setOrigin] = useState(fromCountry);
    const [destination, setDestination] = useState(toCountry);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };



    const fetchDeliveries = useCallback(async () => {
        // sending page count and current page as parameters to api

        const items = {};
        items.page = currentPage;
        items.page_size = perPage;
        items.q = searchTitle;

        if (origin)
            items.fromCountry = origin;

        if (destination)
            items.toCountry = destination;

        const params = `?${qs.stringify(items, {
            skipNull: true,
        })}`;

        // push all the parameters to url
        props.history.push({
            search: params,
        });

        if (!searchTitle || searchTitle.length >= 3) {
            setIsLoading(true);
            const data = await api.delivery.getDeliveries(params);
            setTotalItems(data.meta.total);

            const normalizedResult = normalize(data.data, [myDeliveriesSchema]);
            setDeliveriesList(normalizedResult.entities);

            setIsLoading(false);
        }

    }, [currentPage, searchTitle, origin, destination]);

    useEffect(() => {

        fetchDeliveries();

    }, [currentPage, fetchDeliveries]);

    const onQueryChange = (e) => {
        let q = e.target.value ? e.target.value : null;
        setSearchTitle(q);
        handlePageChange(1);
    }

    const onOriginChange = (value) => {
        const val = value ? parseInt(value.value) : null;
        setOrigin(val);
        handlePageChange(1);
    }
    const onDestinationChange = (value) => {
        const val = value ? parseInt(value.value) : null;
        setDestination(val);
        handlePageChange(1);
    }

    return (

        <>
            <div className="searchPanel mr-md-2 p-3 bg-light pt-4">
                <SearchDeliveryForm
                    onOriginChange={onOriginChange}
                    onDestinationChange={onDestinationChange}
                    onQueryChange={onQueryChange}
                    destination={destination}
                    origin={origin}
                    searchTitle={searchTitle}
                />
            </div>
            <div className="deliveryMain">

                <Loader loaded={!isLoading}>
                    <div className="">
                        {_.isEmpty(deliveriesList) && 'There are no available items'}
                        {!_.isEmpty(deliveriesList) && (
                            <DeliveriesList totalItems={totalItems} deliveries={deliveriesList}/>
                        )}
                        <div className="m-2">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={perPage}
                                totalItemsCount={totalItems}
                                pageRangeDisplayed={5}
                                itemClass="page-item"
                                linkClass="page-link"
                                onChange={(e) => handlePageChange(e)}
                            />
                        </div>

                    </div>
                </Loader>

            </div>
        </>
    );
}

export default HomePage;
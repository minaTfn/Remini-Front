import React, {useEffect, useState, useCallback} from "react";
import {normalize} from "normalizr";
import _ from "lodash";
import Pagination from "react-js-pagination";
import {useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";

import {myDeliveriesSchema} from "../../utils/schemas";
import DeliveriesList from "../delivery/DeliveriesList";
import api from "../../utils/api";
import {convertObjectToUrlParams, convertToSelect} from "../common/Functions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";
import SearchDeliveryForm from "../delivery/SearchDeliveryForm";

function HomePage() {
    const perPage = 9;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [deliveriesList, setDeliveriesList] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [searchTitle, setSearchTitle] = useState('');
    const [origin, setOrigin] = useState(0);
    const [destination, setDestination] = useState(0);
    // const [countriesList, setCountriesList] = useState([]);


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

        const params = convertObjectToUrlParams(items);


        if (!searchTitle.length || searchTitle.length >= 3) {
            const data = await api.delivery.getDeliveries(params);
            setTotalItems(data.meta.total);

            const normalizedResult = normalize(data.data, [myDeliveriesSchema]);
            setDeliveriesList(normalizedResult.entities);

            setLoaded(true);
        }

    }, [currentPage, searchTitle, origin, destination]);

    useEffect(() => {

        fetchDeliveries();

    }, [loaded, currentPage, fetchDeliveries]);


    const onQueryChange = (e) => {
        setSearchTitle(e.target.value);
        setCurrentPage(1);
    }

    const onOriginChange = (value) => {
        setOrigin(parseInt(value.value));
        setCurrentPage(1);
    }
    const onDestinationChange = (value) => {
        setDestination(parseInt(value.value));
        setCurrentPage(1);
    }


    return (
        <>
            <div>
                <SearchDeliveryForm
                    onOriginChange={onOriginChange}
                    onDestinationChange={onDestinationChange}
                    onQueryChange={onQueryChange}
                    destination={destination}
                    origin={origin}
                    searchTitle={searchTitle}
                />

                {_.isEmpty(deliveriesList) && 'There are no available items'}
                {!_.isEmpty(deliveriesList) && (
                    <DeliveriesList deliveries={deliveriesList}/>
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

export default HomePage;
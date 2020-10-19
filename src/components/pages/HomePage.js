import React, {useEffect, useState, useCallback} from "react";
import {normalize} from "normalizr";
import _ from "lodash";
import Pagination from "react-js-pagination";
import {myDeliveriesSchema} from "../../utils/schemas";
import DeliveriesList from "../delivery/DeliveriesList";

import api from "../../utils/api";
import {convertObjectToUrlParams} from "../common/Functions";
import {FormattedMessage} from "react-intl";
import TextFieldGroup from "../common/TextFieldGroup";

function HomePage() {
    const perPage = 5;

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [deliveriesList, setDeliveriesList] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const [searchTitle, setSearchTitle] = useState('');

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchDeliveries = useCallback(async () => {
        // sending page count and current page as parameters to api
        const items = {};
        items.page = currentPage;
        items.page_size = perPage;
        items.q = searchTitle;
        const params = convertObjectToUrlParams(items);

        const data = await api.delivery.getDeliveries(params);
        setTotalItems(data.count);
        const normalizedResult = normalize(data.results, [myDeliveriesSchema]);
        setDeliveriesList(normalizedResult.entities);

        setLoaded(true);
    }, [currentPage, searchTitle]);

    useEffect(() => {
        fetchDeliveries();
    }, [loaded, currentPage, fetchDeliveries]);


    const onSearchChange = (e) => {
        setSearchTitle(e.target.value);
        setCurrentPage(1);
    }



    return (
        <>
            <div>
                <TextFieldGroup
                    label={
                        <FormattedMessage id="global.search" defaultMessage="search"/>
                    }
                    onChange={onSearchChange}
                    field="search"
                    value={searchTitle}
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

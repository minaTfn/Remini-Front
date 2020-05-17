import React, {useEffect, useState, useCallback} from "react";
import { normalize } from "normalizr";
import {useSelector, useDispatch} from "react-redux";
import _ from 'lodash';
import AddDelivery from "./AddDelivery";
import { myDeliveriesSchema } from "../../utils/schemas";
import {myDeliveriesFetched} from "../../reducers/deliverySlice";
import MyDeliveriesList from "./MyDeliveriesList";

import api from "../../utils/api";
import {myDeliveriesSelector} from "./selectors";

function DeliveriesPage() {
    const dispatch = useDispatch();


    const selectState = useSelector(
        (state) => state
    );

    const myStoredDeliveries = myDeliveriesSelector(selectState);
    // console.log('stored',myStoredDeliveries);

    // const selectState = useSelector(
    //     (state) => state
    // );
    // const myStoredDeliveries = myDeliveriesSelector(selectState);
    // const myStoredDeliveryItems = myDeliveryItemsSelector(selectState);

    // const [myDeliveries, setMyDeliveries] = useState(myStoredDeliveries);
    // const [myDeliveryItems, setMyDeliveryItems] = useState(myStoredDeliveryItems);
    const [loaded, setLoaded] = useState(true);


    const fetchDeliveries = useCallback(async () => {
        const data = await api.delivery.getMyDeliveries();
        const normalizedResult = normalize(data.results, [myDeliveriesSchema]);
        await dispatch(myDeliveriesFetched(normalizedResult));
        // console.log('ent',normalizedResult.entities);
        // setMyDeliveries(myDeliveriesSelector(normalizedResult.entities));
        // setMyDeliveryItems(myDeliveryItemsSelector(normalizedResult.entities));
        setLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        // setTimeout(() => {
            fetchDeliveries()
        // }, 2000);

    }, [loaded, fetchDeliveries]);

    return (
        <div>
            {_.isEmpty(myStoredDeliveries) && <AddDelivery/>}
            {!_.isEmpty(myStoredDeliveries) && <MyDeliveriesList deliveries={myStoredDeliveries} />}
        </div>
    );
}

export default DeliveriesPage;

import { createSelector } from '@reduxjs/toolkit';

const deliveriesSelector = state => state.delivery.myDeliveries;
// const deliveryItemsSelector = state => state.deliveryItems;


export const myDeliveriesSelector = createSelector(deliveriesSelector, delivery =>{
        return  (!!delivery) ? delivery : [];
    }
);
// export const myDeliveryItemsSelector = createSelector(deliveryItemsSelector, delivery =>{
//     return  (!!delivery) ? Object.values(delivery) : [];
//     }
// );
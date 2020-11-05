import { createSelector } from '@reduxjs/toolkit';

const deliveriesSelector = state => state.delivery.myDeliveries;
const deliveriesCountSelector = state => state.delivery.myDeliveries.count;


export const myDeliveriesSelector = createSelector(deliveriesSelector, delivery =>{
        return  (!!delivery) ? delivery : [];
    }
);

export const myDeliveriesCountSelector = createSelector(deliveriesCountSelector, count =>{
        return  (!!count) ? count : 0;
    }
);

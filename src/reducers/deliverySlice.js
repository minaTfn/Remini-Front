import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";

const deliverySlice = createSlice({
    name: "delivery",
    initialState: {
        loaded: false,
        myDeliveries: {
            count: 0,
        },
        countries: [],
        deliveryMethods: [],
        paymentMethods: [],
        contactMethods: []
    },
    reducers: {
        newDeliveryAdded: (state, action) => {
            state.myDeliveries = _.merge(action.payload.entities, state.myDeliveries);
            state.myDeliveries.count++;
        },
        editMyDelivery: (state, action) => {
            state.myDeliveries = _.merge(state.myDeliveries, action.payload.entities);
            state.loaded = true;
        },
        deliveryDeleted: (state, action) => {
            state.myDeliveries.deliveryItems = _.omit(state.myDeliveries.deliveryItems, [action.payload]);
            state.myDeliveries.count--;
        },
        myDeliveriesCounted: (state, action) => {
            state.myDeliveries.count = action.payload;
        },
        myDeliveriesFetched: (state, action) => {
            return {
                ...state,
                myDeliveries: {
                    ...action.payload.entities,
                },
                loaded: true,
            };
        },
        countriesFetched: (state, action) => {
            return {
                ...state,
                countries: {
                    ...action.payload,
                }
            };
        },
        deliveryMethodsFetched: (state, action) => {
            return {
                ...state,
                deliveryMethods: {
                    ...action.payload,
                }
            };
        },
        paymentMethodsFetched: (state, action) => {
            return {
                ...state,
                paymentMethods: {
                    ...action.payload,
                }
            };
        },
        contactMethodsFetched: (state, action) => {
            return {
                ...state,
                contactMethods: {
                    ...action.payload,
                }
            };
        },
    },
});

export const {
    newDeliveryAdded,
    myDeliveriesFetched,
    myDeliveriesCounted,
    editMyDelivery,
    countriesFetched,
    paymentMethodsFetched,
    deliveryMethodsFetched,
    contactMethodsFetched,
    deliveryDeleted
} = deliverySlice.actions;
export default deliverySlice.reducer;

import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";

const deliverySlice = createSlice({
    name: "delivery",
    initialState: {loaded: false, myDeliveries: {},countries:[],deliveryMethods:[],paymentMethods:[],contactMethods:[]},
    reducers: {
        newDeliveryAdded: (state, action) => {
            // console.log('pay',action.payload);
            state.myDeliveries = _.merge({}, state.myDeliveries, action.payload.entities);
        },
        editMyDelivery: (state, action) => {
            state.myDeliveries = _.merge({}, state.myDeliveries, action.payload.entities);
            state.loaded = true;
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
    editMyDelivery,
    countriesFetched,
    paymentMethodsFetched,
    deliveryMethodsFetched,
    contactMethodsFetched
} = deliverySlice.actions;
export default deliverySlice.reducer;

import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";

const deliverySlice = createSlice({
    name: "delivery",
    initialState: {loaded: false, myDeliveries: []},
    reducers: {
        newDeliveryAdded: (state, action) => {
            // console.log('pay',action.payload);
            state.myDeliveries = _.merge({},state.myDeliveries,action.payload.entities);
        },
        editMyDelivery: (state, action) => {
            state.myDeliveries = _.merge({},state.myDeliveries,action.payload.entities);
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
    },
});

export const {
    newDeliveryAdded,
    myDeliveriesFetched,
    editMyDelivery,
    addPaymentMethod,
    addDeliveryMethod,
    addContactMethod
} = deliverySlice.actions;
export default deliverySlice.reducer;

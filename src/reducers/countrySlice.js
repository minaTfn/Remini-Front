import {createSlice} from "@reduxjs/toolkit";
import _ from "lodash";

const countrySlice = createSlice({
    name: "countries",
    initialState: {},
    reducers: {
        countriesFetched: (state, action) => {
            return {

                    ...action.payload,
            };
        },
    },
});

export const {
    countriesFetched,
} = countrySlice.actions;
export default countrySlice.reducer;

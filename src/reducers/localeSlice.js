// import { LOCALE_SET } from "../actions/types";
//
// export default function localeSlice(state = { lang: "en" }, action = {}) {
//     switch (action.type) {
//         case LOCALE_SET:
//             return { lang: action.lang };
//         default:
//             return state;
//     }
// }

import {createSlice} from "@reduxjs/toolkit";

const localeSlice = createSlice({
    name: "locale",
    // initialState: {lang: "en"},
    initialState:"en",
    reducers: {
        localeSet: (state, action) => action.payload,
    },
});

export const {localeSet} = localeSlice.actions;
export default localeSlice.reducer;

import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {loaded: false},
    reducers: {
        userFetched: (state, action) => {
            return {
                ...state,
                ...action.payload,
                loaded: true
            }
        },
        userLoggedOut() {
            return {
                loaded: true
            }
        }
    },
});

export const {userFetched, userLoggedOut, loadedSet} = userSlice.actions
export default userSlice.reducer

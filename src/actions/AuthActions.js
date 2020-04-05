import setAuthorizationToken from "../utils/SetAuthorizationToken";
import {SET_CURRENT_USER} from "./types";
import api from '../api';
import * as JWT from "jwt-decode";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

// export function setLoginUser() {
//     return function (dispatch) {
//         return api.user.setUserLogin().then(res => {
//             dispatch(setCurrentUser(res))
//         })
//     };
// }

export function login(data) {
    return dispatch => {
        return api.user.login(data).then(res => {
            const {token} = res;
            localStorage.setItem('jwtToken', token);
            setAuthorizationToken(token);
            const payload = JWT(token);
            const user = {
                email: payload.email,
                confirmed: payload.email_verified,
            };
            dispatch(setCurrentUser(user));
        })
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

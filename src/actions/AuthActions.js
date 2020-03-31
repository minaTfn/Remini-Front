import axios from 'axios';
import setAuthorizationToken from "../utils/SetAuthorizationToken";
import {SET_CURRENT_USER} from "./types"

export function setCurrentUser(user) {
    return{
        type : SET_CURRENT_USER,
        user
    }
}
export function setLoginUser() {
    return function(dispatch) {
        return axios.get('http://192.168.7.30:8000/api/accounts/user-info/').then(
            res =>{ dispatch(setCurrentUser(res.data));}
        );
    };
}

export function login(data) {
    return dispatch =>{
        return axios.post('http://192.168.7.30:8000/api/accounts/token-auth/',data).then(res =>{
            const token = res.data.token;
            localStorage.setItem('jwtToken',token);
            setAuthorizationToken(token);
        })
    }
}

export function logout() {
    return dispatch =>{
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

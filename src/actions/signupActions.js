import api from '../api';

export function userSignupRequest(userData) {
    return dispatch =>{
        return api.user.userSignup(userData)
    }
}
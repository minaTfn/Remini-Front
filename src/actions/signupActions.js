import axios from 'axios';

export function userSignupRequest(userData) {
    return dispatch =>{
        return axios.post('http://192.168.7.30:8000/api/accounts/register/',userData)
    }
}
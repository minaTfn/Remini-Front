import axios from "axios";

const server = 'http://192.168.7.30:8000/api/';

export default {
    user: {
        login: (credentials) => axios.post(`${server}accounts/token-auth/`, credentials).then((res) => res.data),
        setUserLogin: () => axios.get(`${server}accounts/user-info/`).then(res => res.data),
        userSignup: (userData) => axios.post(`${server}accounts/register/`, userData).then((res) => res.data),
        getUserInfo: () => axios.get(`${server}accounts/user-info/`).then(res => res.data),
        editUserInfo: (data) => axios.put(`${server}accounts/user-info/`, data).then(res => res.data),
        changePassword: (data) => axios.put(`${server}accounts/change-password/`, data).then(res => res.data),
    },
};

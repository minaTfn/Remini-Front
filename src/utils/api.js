import axios from "axios";

const server = 'http://127.0.0.1:8000/api/';

export default {
    user: {
        login: (credentials) => axios.post(`${server}auth/login/`, credentials).then((res) => res.data),
        userSignup: (userData) => axios.post(`${server}auth/register/`, userData).then((res) => res.data),
        fetchCurrentUser: () => axios.get(`${server}auth/user-profile/`).then(res => res.data.data),
        VerifyEmailRequest: () => axios.get(`${server}auth/email/resend/`).then(res => res.data),
        changePassword: (data) => axios.post(`${server}auth/change-password/`, data).then(res => res.data),
        editUserInfo: (data) => axios.put(`${server}auth/edit-profile/`, data).then(res => res.data),
        // confirmEmail: (id, params) => axios.get(`${server}auth/email/verify/${id}${params}`).then(res => res.data),
        ResetToken: token => axios.post(`${server}auth/refresh/`, token).then(res => res.data),
        ResetPasswordRequest: email => axios.post(`${server}password/email/`, email).then(res => res.data),
        ValidateToken: data => axios.post(`${server}password/reset/`, data).then(res => res.data),
        contactUs: data => axios.post(`${server}contactUs/`, data).then((res) => res.data),

    },
    delivery: {
        getDeliveries: (params) => axios.get(`${server}deliveries/${params}`).then((res) => res.data),
        countries: () => axios.get(`${server}countries/`).then(res => res.data.data),
        getDelivery: (slug) => axios.get(`${server}deliveries/${slug}/`).then((res) => res.data.data),
        getMyDelivery: (slug) => axios.get(`${server}my-deliveries/${slug}/`).then((res) => res.data.data),
        getContactInfo: (slug) => axios.get(`${server}deliveries/${slug}/contact-info`).then((res) => res.data.data),
        cities: (country,params='') => axios.get(`${server}cities/${country}/${params}`).then(res => res.data.data),
        getPaymentMethods: () => axios.get(`${server}getPaymentMethods/`).then(res => res.data.data),
        getDeliveryMethods: () => axios.get(`${server}getDeliveryMethods/`).then(res => res.data.data),
        getContactMethods: () => axios.get(`${server}getContactMethods/`).then(res => res.data.data),
        newDelivery: (data) => axios.post(`${server}deliveries/`, data).then((res) => res.data),
        getMyDeliveries: (params) => axios.get(`${server}my-deliveries/${params}`).then((res) => res.data),
        deleteDelivery: (slug) => axios.delete(`${server}deliveries/${slug}/`).then((res) => res.data),
        editDelivery: (slug, data) => axios.put(`${server}deliveries/${slug}/`, data).then((res) => res.data),
        addFavorite:(slug) => axios.post(`${server}deliveries/${slug}/favorites`).then((res) => res.data),
    },

};

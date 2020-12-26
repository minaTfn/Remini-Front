import axios from "axios";

const baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? 'http://127.0.0.1:8000/api/' : 'https://admin.reminitravel.ir/api/';

const request = axios.create({
    baseURL: baseUrl,
});


export default {
    user: {
        login: (credentials) => request.post(`auth/login`, credentials).then((res) => res.data),
        userSignup: (userData) => request.post(`auth/register`, userData).then((res) => res.data),
        fetchCurrentUser: () => request.get(`auth/user-profile`).then(res => res.data.data),
        VerifyEmailRequest: () => request.get(`auth/email/resend`).then(res => res.data),
        changePassword: (data) => request.post(`auth/change-password`, data).then(res => res.data),
        editUserInfo: (data) => request.put(`auth/edit-profile`, data).then(res => res.data),
        // confirmEmail: (id, params) => request.get(`auth/email/verify/${id}${params}`).then(res => res.data),
        ResetToken: token => request.post(`auth/refresh`, token).then(res => res.data),
        ResetPasswordRequest: email => request.post(`password/email`, email).then(res => res.data),
        ValidateToken: data => request.post(`password/reset`, data).then(res => res.data),
        contactUs: data => request.post(`contactUs`, data).then((res) => res.data),

    },
    delivery: {
        getDeliveries: (params) => request.get(`deliveries${params}`).then((res) => res.data),
        countries: () => request.get(`countries`).then(res => res.data.data),
        getDelivery: (slug) => request.get(`deliveries/${slug}`).then((res) => res.data.data),
        getMyDelivery: (slug) => request.get(`my-deliveries/${slug}`).then((res) => res.data.data),
        getContactInfo: (slug) => request.get(`deliveries/${slug}/contact-info`).then((res) => res.data.data),
        cities: (country,params='') => request.get(`cities/${country}${params}`).then(res => res.data.data),
        getPaymentMethods: () => request.get(`getPaymentMethods`).then(res => res.data.data),
        getDeliveryMethods: () => request.get(`getDeliveryMethods`).then(res => res.data.data),
        getContactMethods: () => request.get(`getContactMethods`).then(res => res.data.data),
        newDelivery: (data) => request.post(`deliveries`, data).then((res) => res.data),
        getMyDeliveries: (params) => request.get(`my-deliveries${params}`).then((res) => res.data),
        deleteDelivery: (slug) => request.delete(`deliveries/${slug}`).then((res) => res.data),
        editDelivery: (slug, data) => request.put(`deliveries/${slug}`, data).then((res) => res.data),
        addFavorite:(slug) => request.post(`deliveries/${slug}/favorites`).then((res) => res.data),
    },

};

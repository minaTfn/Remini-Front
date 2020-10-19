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

    },
    delivery: {
        getDeliveries: (params) => axios.get(`${server}deliveries/${params}`).then((res) => res.data.result),
        getCountries: () => axios.get(`${server}getCountries/`).then(res => res.data),
        getCities: (country) => axios.get(`${server}getCities/?country_id=${country}`).then(res => res.data),
        getPaymentMethods: () => axios.get(`${server}transportation/payment-methods/`).then(res => res.data),
        getDeliveryMethods: () => axios.get(`${server}transportation/delivery-methods/`).then(res => res.data),
        getContactMethods: () => axios.get(`${server}transportation/contact-methods/`).then(res => res.data),
        newDeliveryAdd: (data) => axios.post(`${server}transportation/delivery-new/`, data).then((res) => res.data),
        getMyDeliveries: (params) => axios.get(`${server}transportation/my-deliveries/${params}`).then((res) => res.data),
        getDelivery: (slug) => axios.get(`${server}transportation/delivery/${slug}/`).then((res) => res.data),
        editDelivery: (slug, data) => axios.put(`${server}transportation/delivery/${slug}/`, data).then((res) => res.data),
    }
};

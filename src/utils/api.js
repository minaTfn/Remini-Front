import axios from "axios";

const server = 'http://192.168.7.30:8000/api/';

export default {
    user: {
        login: (credentials) => axios.post(`${server}accounts/token-auth/`, credentials).then((res) => res.data),
        userSignup: (userData) => axios.post(`${server}accounts/register/`, userData).then((res) => res.data),
        editUserInfo: (data) => axios.put(`${server}accounts/user-info/`, data).then(res => res.data),
        changePassword: (data) => axios.put(`${server}accounts/change-password/`, data).then(res => res.data),
        confirmEmail: (data) => axios.put(`${server}accounts/verify/confirm-verify/`, data).then(res => res.data),
        VerifyEmailRequest: () => axios.put(`${server}accounts/verify/request-verify/`, {validation_type: 'email'}).then(res => res.data),
        ResetPasswordRequest: email => axios.post(`${server}accounts/reset-password/reset_password/`, email).then(res => res.data),
        ValidateToken: data => axios.post(`${server}accounts/reset-password/confirm/`, data).then(res => res.data),
        ResetToken: token => axios.post(`${server}accounts/token-refresh/`, token).then(res => res.data),
        fetchCurrentUser: () => axios.get(`${server}accounts/user-info/`).then(res => res.data),
    },
    delivery: {
        getCountries: () => axios.get(`${server}geography/countries/`).then(res => res.data),
        getCities: (country) => axios.get(`${server}geography/cities/?country=${country}`).then(res => res.data),
        getPaymentMethods: () => axios.get(`${server}transportation/payment-methods/`).then(res => res.data),
        getDeliveryMethods: () => axios.get(`${server}transportation/delivery-methods/`).then(res => res.data),
        getContactMethods: () => axios.get(`${server}transportation/contact-methods/`).then(res => res.data),
        newDeliveryAdd: (data) => axios.post(`${server}transportation/delivery-new/`, data).then((res) => res.data),
        getMyDeliveries: () => axios.get(`${server}transportation/my-deliveries/`).then((res) => res.data),
        getDelivery: (slug) => axios.get(`${server}transportation/delivery/${slug}/`).then((res) => res.data),
        editDelivery: (slug, data) => axios.put(`${server}transportation/delivery/${slug}/`, data).then((res) => res.data),
    }
};

import axios from 'axios';

export function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}
export function setAxiosLanguage(language) {
    axios.defaults.headers.common['Accept-Language'] = language;
}
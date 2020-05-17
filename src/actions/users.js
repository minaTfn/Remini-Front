import api from '../utils/api';
import {userFetched, userLoggedOut} from '../reducers/userSlice';
import {setAuthorizationToken} from "../utils/SetAuthorizationToken";

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken();
    dispatch(userLoggedOut());
};

export const fetchCurrentUser = () => (dispatch) =>
    api.user.fetchCurrentUser().then(user => dispatch(userFetched(user))).catch(() => dispatch(logout()));

export const login = credentials => dispatch =>
    api.user.login(credentials).then(user => {
        localStorage.jwtToken = user.token;
        setAuthorizationToken(user.token);
        dispatch(fetchCurrentUser());
    });

export function userSignupRequest(userData) {
    return dispatch => {
        const data = {"email": userData.email, "password": userData.password};
        return api.user.userSignup(userData).then(() => dispatch(login(data)));
    }
}

export const confirmEmail = emailToken => dispatch =>
    api.user.confirmEmail({"token": emailToken}).then(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        api.user.ResetToken({"token": jwtToken}).then(res => {
            const {token} = res;
            localStorage.setItem('jwtToken', token);
            dispatch(fetchCurrentUser());
        });
    });

export const resetPasswordRequest = (data) => () => api.user.ResetPasswordRequest(data)

export const validateToken = (data) => () => api.user.ValidateToken(data)
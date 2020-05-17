// import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./types";
// import setAuthorizationHeader from "../utils/SetAuthorizationToken";
// import api from '../utils/api';
// import {fetchCurrentUser} from "./users";
//
// export const userLoggedIn = user => ({
//     type: USER_LOGGED_IN,
//     user
// });
//
// export const userLoggedOut = () => ({
//     type: USER_LOGGED_OUT
// });
//
// export const login = credentials => dispatch =>
//     api.user.login(credentials).then(user => {
//         localStorage.jwtToken = user.token;
//         setAuthorizationHeader(user.token);
//         dispatch(fetchCurrentUser());
//     });
//
// export const logout = () => dispatch => {
//     localStorage.removeItem("jwtToken");
//     setAuthorizationHeader();
//     dispatch(userLoggedOut());
// };
//
//
// export const confirmEmail = emailToken => dispatch =>
//     api.user.confirmEmail({"token": emailToken}).then(() => {
//         const jwtToken = localStorage.getItem('jwtToken');
//         api.user.ResetToken({"token":jwtToken}).then(res =>{
//             const {token} = res;
//             localStorage.setItem('jwtToken', token);
//             dispatch(fetchCurrentUser());
//         });
//     });
//
// export const resetPasswordRequest = (data) => () => api.user.ResetPasswordRequest(data)
//
// export const validateToken = (data) => () => api.user.ValidateToken(data)



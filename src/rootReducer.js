import {combineReducers} from "redux";
import flashMessages from './reducers/flashMessages';
import user from './reducers/userSlice';
import locale from './reducers/localeSlice';
import delivery from './reducers/deliverySlice';

export default combineReducers({
    flashMessages,
    user,
    locale,
    delivery
})

import { localeSet } from '../reducers/localeSlice';
import {setAxiosLanguage} from "../utils/SetAuthorizationToken";

export const setLocale = lang => dispatch => {
    if (lang === 'fa') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }

    localStorage.lang = lang;
    dispatch(localeSet(lang));
    setAxiosLanguage(localStorage.lang);
};
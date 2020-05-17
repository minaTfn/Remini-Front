// import { LOCALE_SET } from "./types";
//
// export const localeSet = lang => ({
//     type: LOCALE_SET,
//     lang
// });
//
// export const setLocale = lang => dispatch => {
//     localStorage.lang = lang;
//     dispatch(localeSet(lang));
// };

import { localeSet } from '../reducers/localeSlice';

export const setLocale = lang => dispatch => {
    if (lang === 'fa') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    localStorage.lang = lang;
    dispatch(localeSet(lang));
};
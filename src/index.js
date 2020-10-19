import React from 'react';
import ReactDOM from 'react-dom';
import './theme/default/css/index.css';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.css';
import './theme/default/css/App.css';
import {Route, BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import rootReducer from './rootReducer';
import {setAuthorizationToken, setAxiosLanguage} from "./utils/SetAuthorizationToken";
import App from './App';
import * as serviceWorker from './serviceWorker';
import {fetchCurrentUser} from "./actions/users";
import {userFetched} from './reducers/userSlice';
import {localeSet} from './reducers/localeSlice';

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
});


if (localStorage.lang) {
    if (localStorage.lang === 'fa') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    store.dispatch(localeSet(localStorage.lang));
    setAxiosLanguage(localStorage.lang);
}

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(fetchCurrentUser());
} else {
    store.dispatch(userFetched({}))
}


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App}/>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

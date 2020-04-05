import React from 'react';
import ReactDOM from 'react-dom';
import './theme/default/css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './theme/default/css/App.css';
import {Route, BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import * as JWT from 'jwt-decode';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from "./utils/SetAuthorizationToken";
import {setCurrentUser} from './actions/AuthActions';
import App from './App';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.jwtToken) {
    const payload = JWT(localStorage.jwtToken);
    const user = {
        email: payload.email,
        confirmed: payload.email_verified,
    };
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(user));
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

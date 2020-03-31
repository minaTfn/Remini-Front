import React from 'react';
import ReactDOM from 'react-dom';
import './theme/default/css/index.css';

import {Router, browserHistory} from 'react-router';
import routes from './routes';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from "./utils/SetAuthorizationToken";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);

}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

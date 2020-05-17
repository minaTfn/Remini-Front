import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

const GuestRoute = ({isAuthenticated, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => !isAuthenticated ?  <Component {...props} /> : <Redirect to="/" /> }/>
    )

}

GuestRoute.propTypes = {
    component: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email,
    }
}

export default connect(mapStateToProps)(GuestRoute);
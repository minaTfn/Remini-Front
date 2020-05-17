import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

const UserRoute = ({isAuthenticated, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => isAuthenticated ?  <Component {...props} /> : <Redirect to="/" /> }/>
    )

}

UserRoute.propTypes = {
    // component: PropTypes.object.isRequired || PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]).isRequired,
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email,
    }
}

export default connect(mapStateToProps)(UserRoute);
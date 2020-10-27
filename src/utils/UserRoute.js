import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

const UserRoute = ({isAuthenticated, user, isOwn, component: Component, ...rest}) => {
    return (
        <Route {...rest}
               render={props => isAuthenticated ? <Component {...props} isOwn /> : <Redirect to="/"/>}/>
    )

}

UserRoute.propTypes = {
    // component: PropTypes.object.isRequired || PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isOwn: PropTypes.bool,
    component: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]).isRequired,
}
UserRoute.defaultProps = {
    isOwn: false
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email,
    }
}

export default connect(mapStateToProps)(UserRoute);
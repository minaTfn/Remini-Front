import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setLoginUser} from '../actions/AuthActions'

export default function (ComposedComponent) {
    class Authenticate extends Component {

        componentDidMount() {
            this._checkAndRedirect();
        }

        componentDidUpdate(prevProps) {
            if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
                this._checkAndRedirect();
            }

        }

        _checkAndRedirect() {

            if (localStorage.jwtToken) {
                this.props.setLoginUser().then(
                    (res) => {
                        const {isAuthenticated} = this.props;
                        if (!isAuthenticated) {
                            this.context.router.push('/login');
                        }
                    },
                );
            } else {
                this.context.router.push('/login');
            }

        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated ? <ComposedComponent {...this.props} /> : null}
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    };

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired,
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool,
        setLoginUser: PropTypes.func,
    };

    return connect(
        mapStateToProps,
        {setLoginUser}
    )(Authenticate);

}
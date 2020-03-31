import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import { addFlashMessage} from "../actions/flashMessages";

export default function (ComposedComponent) {
    class Authenticate extends Component {

        componentDidMount() {
            console.log('aaa ');
            console.log('aaa '+this.props.isAuthenticated);

            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You need to login to access this page"
                });
                this.context.router.push('/login');
            }
        }


        // componentWillUpdate(nextPropes) {
        //     if(!nextPropes.isAuthenticated){
        //         this.context.router.push('/');
        //     }
        // }



        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        // addFlashMessage: PropTypes.func.isRequired,
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired,
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated,
        }
    }

    return connect(mapStateToProps)(Authenticate);
}

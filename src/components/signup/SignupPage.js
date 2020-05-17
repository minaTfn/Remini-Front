import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import SignupForm from "./SignupForm";
import { userSignupRequest } from '../../actions/users'
import { addFlashMessage }  from "../../actions/flashMessages";

class SignupPage extends Component {
    submit = data =>
        this.props.userSignupRequest(data).then(() => this.props.history.push("/dashboard"));

    render() {
        const {addFlashMessage} = this.props;
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm submit={this.submit} addFlashMessage={addFlashMessage}/>
                </div>
            </div>
        )
    }

}

SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
};

export default connect(null, {userSignupRequest, addFlashMessage})(SignupPage);
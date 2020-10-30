import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {Modal} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import SignupForm from "./SignupForm";
import { userSignupRequest } from '../../actions/users'
import { addFlashMessage }  from "../../actions/flashMessages";

class SignupPage extends Component {
    submit = data =>
        this.props.userSignupRequest(data).then(() => this.props.onHide());

    render() {
        const {addFlashMessage} = this.props;
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <div className="modalHeader">
                        <FormattedMessage id="login.SignUpPageTitle" defaultMessage="Join to Remini"/>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <SignupForm submit={this.submit} addFlashMessage={addFlashMessage}/>
                </Modal.Body>
            </Modal>
        )
    }

}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

export default connect(null, {userSignupRequest, addFlashMessage})(SignupPage);
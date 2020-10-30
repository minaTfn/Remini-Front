import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Button, Modal} from "react-bootstrap";
import LoginForm from "./LoginForm";
import {login} from "../../actions/users";
import ForgotPasswordPage from "./ForgotPasswordPage";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            forgetPageHeader:'login.forgetPageTitle',
        }
    }

    submit = (data) =>
        this.props.login(data).then(() => this.props.onHide());



    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <div className="modalHeader">
                        <FormattedMessage id={this.props.showForget ? this.state.forgetPageHeader : 'login.LoginPageTitle'} defaultMessage="Login"/>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {this.props.showForget ?
                        <ForgotPasswordPage/>
                        :
                        <>
                            <LoginForm submit={this.submit}/>
                            <Button type="button" className="btn btn-link bg-white border-0" onClick={this.props.onForgetShow}>
                                <FormattedMessage id="login.forgotPassword" defaultMessage="Forgot Password"/>
                            </Button>
                        </>
                    }

                </Modal.Body>
            </Modal>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
    onForgetShow: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    showForget: PropTypes.bool.isRequired,
};

export default connect(null, {login})(LoginPage);

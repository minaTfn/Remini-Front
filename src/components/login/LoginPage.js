import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {Button, Modal, Nav} from "react-bootstrap";
import LoginForm from "./LoginForm";
import {login} from "../../actions/users";
import ForgotPasswordPage from "./ForgotPasswordPage";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showForgetPassword: false
        }
    }

    submit = (data) =>
        this.props.login(data).then(() => this.props.onHide());

    onForgetPassword = () =>
        this.setState({showForgetPassword: true})

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FormattedMessage id="login.LoginPageTitle" defaultMessage="Login"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.showForgetPassword ?
                        <ForgotPasswordPage/>
                        :
                        <>
                            <LoginForm submit={this.submit}/>
                            <Button type="button" className="btn btn-link btn-light" onClick={this.onForgetPassword}>
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
    show: PropTypes.bool.isRequired,
};

export default connect(null, {login})(LoginPage);

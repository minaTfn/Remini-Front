import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import ForgotPasswordFrom from "./ForgotPasswordFrom";
import {resetPasswordRequest} from "../../actions/users"

class ForgotPasswordPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      success: false,
    }
  }

  submit = (data) =>
    this.props.resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <div>
        {this.state.success ? (
          <Alert show variant="success">
            <FormattedMessage id="email.sent" defaultMessage="Email has been sent"/>
          </Alert>
        ) : (
          <ForgotPasswordFrom submit={this.submit} />
        )}
      </div>
    );
  }
}

ForgotPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired,
}

export default connect(null, {resetPasswordRequest})(ForgotPasswordPage);

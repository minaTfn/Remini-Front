import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ForgotPasswordFrom from "./ForgotPasswordFrom";
import {resetPasswordRequest} from "../../actions/users"

class ForgotPasswordPage extends Component {
  state = {
    success: false,
  };

  submit = (data) =>
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));

  render() {
    return (
      <div>
        {this.state.success ? (
          <Alert show variant="success">
            Email has been sent.
          </Alert>
        ) : (
          <ForgotPasswordFrom submit={this.submit} />
        )}
      </div>
    );
  }
}

ForgotPasswordFrom.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired,
}

export default connect(null, {resetPasswordRequest})(ForgotPasswordPage);

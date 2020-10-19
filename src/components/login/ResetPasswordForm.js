import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { ValidateResetPassword } from "../common/Validator";
import TextFieldGroup from "../common/TextFieldGroup";

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlurValidatePassword = this.onBlurValidatePassword.bind(this);
    this.state = {
      data: {
        email: props.email.replace("%40", "@"),
        password: "",
        password_confirmation: "",
        token: props.token,
      },
      isLoading: false,
      errors: {},
    };
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props
        // .submit({ token: this.props.token, password: this.state.data.password,password_confirmation:this.state.data.password, email: this.props.email})
        .submit(this.state.data)
          .catch((err) => {
          this.setState({ errors: err.response.data, isLoading: false });
        });
    }
  }

  onBlurValidatePassword(e) {
    const field = e.target.name;
    const { errors, isValid } = ValidateResetPassword(this.state.data);
    if (!isValid) {
      const varErrors = this.state.errors;
      if (!isValid) {
        varErrors[field] = errors[field];
      } else {
        varErrors[field] = "";
      }
      this.setState({ errors: varErrors });
    }
  }

  isValid() {
    const { errors, isValid } = ValidateResetPassword(this.state.data);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });
  }

  render() {
    const { isLoading, errors, data } = this.state;
    return (
      <div>
        {errors.status && errors.status === "notfound" && (
          <Alert severity="error">
            <Alert variant="success">
              <Alert.Heading>Invalid Token</Alert.Heading>
              <p>
                Your token is Invalid or Expired. Please try to reset your
                password again
              </p>
              <hr />
              <p className="mb-0">
                Go to <Link to="/login">Login Page</Link>
              </p>
            </Alert>
          </Alert>
        )}
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            error={errors.password}
            label="New Password"
            onBlur={this.onBlurValidatePassword}
            onChange={this.onChange}
            field="password"
            value={data.password}
            type="password"
          />
          <TextFieldGroup
            error={errors.password_confirmation}
            label="Confirm New Password"
            onBlur={this.onBlurValidatePassword}
            onChange={this.onChange}
            field="password_confirmation"
            value={data.password_confirmation}
            type="password"
          />
          <div className="form-group">
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Sending Request…" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ResetPasswordForm;

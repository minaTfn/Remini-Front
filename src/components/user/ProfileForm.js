import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";
import _ from "lodash";
import TextFieldGroup from "../common/TextFieldGroup";
import {ValidateProfile, ValidateChangePassword} from "../common/Validator";
import api from "../../utils/api";

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onChgPassClick = this.onChgPassClick.bind(this);
        this.onBlurValidate = this.onBlurValidate.bind(this);
        this.onBlurValidatePassword = this.onBlurValidatePassword.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
        this.state = {
            dataProfile: {
                email: "",
                name: "",
                cell_number: "",
            },
            dataChangePass: {
                password: "",
                password_confirmation: "",
                old_password: "",
            },
            errors: {},
            isEditing: false,
            isLoading: false,
            isPasswordChanging: false,
            isSendingEmail: false,
            emailSent: 0,
        };
    }

    componentDidMount() {
        api.user.fetchCurrentUser().then((res) =>
            this.setState({
                dataProfile: res,
            })
        );
    }

    onEditClick() {
        this.setState({isEditing: !this.state.isEditing});
    }

    onChgPassClick() {
        this.setState({isPasswordChanging: !this.state.isPasswordChanging});
        if (!this.state.isPasswordChanging) {
            this.setState({
                dataChangePass: {
                    password: "",
                    password_confirmation: "",
                    old_password: "",
                },
                errors: {},
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.isEditing) {
            // submit for edit profile
            if (this.isValid()) {
                this.setState({errors: {}, isLoading: true});

                const dataProfile = _.omit(this.state.dataProfile, 'email'); // omit email from editable data
                api.user
                    .editUserInfo(dataProfile)
                    .then(() => {
                        this.setState({
                            isEditing: false,
                            isLoading: false,
                        });
                        this.props.addFlashMessage({
                            type: "success",
                            text: "You've Changed your profile successfully!",
                        });
                    })
                    .catch((error) => {
                        this.setState({errors: error.response.data, isLoading: false});
                    });
            }
        } else if (this.state.isPasswordChanging) {
            // submit for edit password
            if (this.isValidPasswordChange()) {
                this.setState({errors: {}, isLoading: true});
                api.user
                    .changePassword(this.state.dataChangePass)
                    .then((res) => {
                        this.setState({
                            isPasswordChanging: false,
                            isLoading: false,
                        });
                        this.props.addFlashMessage({
                            type: "success",
                            text: res.message,
                        });
                    })
                    .catch((error) => {
                        this.setState({errors: error.response.data.errors, isLoading: false});
                    });
            }
        }
    }

    onChange(e) {
        if (this.state.isPasswordChanging) {
            this.setState({
                dataChangePass: {
                    ...this.state.dataChangePass,
                    [e.target.name]: e.target.value,
                },
            });
        } else {
            this.setState({
                dataProfile: {
                    ...this.state.dataProfile,
                    [e.target.name]: e.target.value,
                },
            });
        }
    }

    onBlurValidate(e) {
        const field = e.target.name;
        const {errors, isValid} = ValidateProfile(this.state.dataProfile);
        if (!isValid) {
            const varErrors = this.state.errors;
            if (!isValid) {
                varErrors[field] = errors[field];
            } else {
                varErrors[field] = "";
            }
            this.setState({errors: varErrors});
        }
    }

    onBlurValidatePassword(e) {
        const field = e.target.name;
        const {errors, isValid} = ValidateChangePassword(
            this.state.dataChangePass
        );
        if (!isValid) {
            const varErrors = this.state.errors;
            if (!isValid) {
                varErrors[field] = errors[field];
            } else {
                varErrors[field] = "";
            }
            this.setState({errors: varErrors});
        }
    }

    isValid() {
        const {errors, isValid} = ValidateProfile(this.state.dataProfile);
        if (!isValid) {
            this.setState({errors});
        }

        return isValid;
    }

    isValidPasswordChange() {
        const {errors, isValid} = ValidateChangePassword(
            this.state.dataChangePass
        );
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    verifyEmail() {
        this.setState({isSendingEmail: true});
        api.user
            .VerifyEmailRequest()
            .then(() => this.setState({isSendingEmail: false, emailSent: 1}))
            .catch(() => this.setState({isSendingEmail: false, emailSent: 2}));
    }

    render() {
        const {
            errors,
            dataProfile,
            isLoading,
            isEditing,
            isPasswordChanging,
            dataChangePass,
            isSendingEmail,
            emailSent
        } = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {isPasswordChanging && (
                        <div>
                            <TextFieldGroup
                                error={errors.old_password}
                                label="Password"
                                onBlur={this.onBlurValidatePassword}
                                onChange={this.onChange}
                                field="old_password"
                                value={dataChangePass.old_password}
                                type="password"
                            />
                            <TextFieldGroup
                                error={errors.password}
                                label="New Password"
                                onBlur={this.onBlurValidatePassword}
                                onChange={this.onChange}
                                field="password"
                                value={dataChangePass.password}
                                type="password"
                            />
                            <TextFieldGroup
                                error={errors.password_confirmation}
                                label="Confirm New Password"
                                onBlur={this.onBlurValidatePassword}
                                onChange={this.onChange}
                                field="password_confirmation"
                                value={dataChangePass.password_confirmation}
                                type="password"
                            />
                        </div>
                    )}
                    {!isPasswordChanging && (
                        <div>
                            {emailSent === 1 ? <Alert variant="success">
                                <Alert.Heading>Verify email has been sent successfully.</Alert.Heading>
                                <p>Please check your email to verify</p>
                            </Alert> : emailSent === 2 ? <Alert variant="danger">
                                <Alert.Heading>Something went wrong.</Alert.Heading>
                                <p>Please try in again</p>
                            </Alert> : ""}

                            <TextFieldGroup
                                label="Email"
                                onChange={this.onChange}
                                value={dataProfile.email}
                                disabled
                                classType="inRow"
                                description={
                                    !this.props.isEmailConfirmed && (
                                        <Button
                                            type="button"
                                            onClick={this.verifyEmail}
                                            variant="outline-info"
                                            disabled={isSendingEmail}
                                        >
                                            {isSendingEmail ? "Sending Email…" : "Verify Email"}
                                        </Button>
                                    )
                                }
                            />
                            <TextFieldGroup
                                error={errors.name}
                                label="Name"
                                onChange={this.onChange}
                                onBlur={this.onBlurValidate}
                                field="name"
                                value={dataProfile.name}
                                type="text"
                                disabled={!isEditing}
                                classType="inRow"
                            />
                            <TextFieldGroup
                                error={errors.cell_number}
                                label="Cell Number"
                                onChange={this.onChange}
                                onBlur={this.onBlurValidate}
                                field="cell_number"
                                value={dataProfile.cell_number}
                                type="number"
                                disabled={!isEditing}
                                classType="inRow"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        {!isPasswordChanging && (
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={this.onEditClick}
                                className={`btn ${
                                    isEditing ? "btn-light border-primary" : "btn-primary"
                                }`}
                            >
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </button>
                        )}
                        {(isEditing || isPasswordChanging) && (
                            <button
                                type="submit"
                                onSubmit={this.onSubmit}
                                disabled={isLoading}
                                style={{marginLeft: 10}}
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        )}
                        {!isEditing && (
                            <button
                                type="button"
                                style={{marginLeft: 10}}
                                disabled={isLoading}
                                onClick={this.onChgPassClick}
                                className="btn btn-light border-primary"
                            >
                                {isPasswordChanging ? "Cancel" : "Change Password"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

ProfileForm.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    isEmailConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isEmailConfirmed: state.user.email_verified,
    };
}

export default connect(mapStateToProps)(ProfileForm);

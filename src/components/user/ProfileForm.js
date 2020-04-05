import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFiledGroup from "../common/TextFiledGroup";
import {ValidateProfile, ValidateChangePassword} from '../common/Validator';
import api from "../../api";

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onChgPassClick = this.onChgPassClick.bind(this);
        this.onBlurValidate = this.onBlurValidate.bind(this);
        this.onBlurValidatePassword = this.onBlurValidatePassword.bind(this);
        this.state = {
            dataProfile: {
                email: '',
                last_name: '',
                first_name: "",
                cell_number: '',
            },
            dataChangePass: {
                new_password: '',
                passwordConfirmation: '',
                old_password: '',
            },
            errors: {},
            isEditing: false,
            isLoading: false,
            isPasswordChanging: false,

        };
    }

    componentDidMount() {
        api.user.getUserInfo().then(res => this.setState({
            dataProfile: res
        }));
    }


    onEditClick() {
        this.setState({isEditing: !this.state.isEditing});
    }

    onChgPassClick() {

        this.setState({isPasswordChanging: !this.state.isPasswordChanging});
        if (!this.state.isPasswordChanging) {
            this.setState({
                dataChangePass: {
                    new_password: '',
                    passwordConfirmation: '',
                    old_password: '',
                },
                errors: {}
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.isEditing) { // submit for edit profile
            if (this.isValid()) {
                this.setState({errors: {}, isLoading: true});
                api.user.editUserInfo(this.state.dataProfile).then(() => {
                    this.setState({
                        isEditing: false,
                        isLoading: false,
                    });
                    this.props.addFlashMessage({
                        type: "success",
                        text: "You've Changed your profile successfully!"
                    });
                }).catch(error => {
                    this.setState({errors: error.response.data, isLoading: false})
                });
            }
        } else if (this.state.isPasswordChanging) { // submit for edit password
            if (this.isValidPasswordChange()) {
                this.setState({errors: {}, isLoading: true});
                api.user.changePassword(this.state.dataChangePass).then(res => {
                    this.setState({
                        isPasswordChanging: false,
                        isLoading: false,
                    });
                    this.props.addFlashMessage({
                        type: "success",
                        text: res.message
                    });
                }).catch(error => {
                    this.setState({errors: error.response.data, isLoading: false})
                });
            }
        }
    }

    onChange(e) {
        if(this.state.isPasswordChanging){
            this.setState({
                dataChangePass: {...this.state.dataChangePass, [e.target.name]: e.target.value}
            });
        }else{
            this.setState({
                dataProfile: {...this.state.dataProfile, [e.target.name]: e.target.value}
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
                varErrors[field] = '';
            }
            this.setState({errors: varErrors})
        }
    }

    onBlurValidatePassword(e) {
        const field = e.target.name;
        const {errors, isValid} = ValidateChangePassword(this.state.dataChangePass);
        if (!isValid) {
            const varErrors = this.state.errors;
            if (!isValid) {
                varErrors[field] = errors[field];
            } else {
                varErrors[field] = '';
            }
            this.setState({errors: varErrors})
        }
    }

    isValid() {
        const {errors, isValid} = ValidateProfile(this.state.dataProfile);
        if (!isValid) {
            this.setState({errors})
        }

        return isValid;
    }

    isValidPasswordChange() {
        const {errors, isValid} = ValidateChangePassword(this.state.dataChangePass);
        if (!isValid) {
            this.setState({errors})
        }
        return isValid;
    }

    render() {
        const {errors, dataProfile , isLoading, isEditing, isPasswordChanging, dataChangePass} = this.state;
        return (
            <div>

                <form onSubmit={this.onSubmit}>

                    {isPasswordChanging &&
                    <div>

                        <TextFiledGroup
                            error={errors.old_password}
                            label="Password"
                            onBlur={this.onBlurValidatePassword}
                            onChange={this.onChange}
                            field="old_password"
                            value={dataChangePass.old_password}
                            type="password"
                        />
                        < TextFiledGroup
                            error={errors.new_password}
                            label="New Password"
                            onBlur={this.onBlurValidatePassword}
                            onChange={this.onChange}
                            field="new_password"
                            value={dataChangePass.new_password}
                            type="password"
                        />
                        <TextFiledGroup
                            error={errors.passwordConfirmation}
                            label="Confirm New Password"
                            onBlur={this.onBlurValidatePassword}
                            onChange={this.onChange}
                            field="passwordConfirmation"
                            value={dataChangePass.passwordConfirmation}
                            type="password"
                        />
                    </div>
                    }
                    {!isPasswordChanging &&
                    <div>
                        <TextFiledGroup
                            label="Email"
                            onChange={this.onChange}
                            value={dataProfile.email}
                            disabled={true}
                            classType="inRow"
                        />
                        < TextFiledGroup
                            error={errors.first_name}
                            label="First Name"
                            onChange={this.onChange}
                            onBlur={this.onBlurValidate}
                            field="first_name"
                            value={dataProfile.first_name}
                            type="text"
                            disabled={!isEditing}
                            classType="inRow"
                        />
                        <TextFiledGroup
                            error={errors.last_name}
                            label="Last Name"
                            onChange={this.onChange}
                            onBlur={this.onBlurValidate}
                            field="last_name"
                            value={dataProfile.last_name}
                            type="text"
                            disabled={!isEditing}
                            classType="inRow"
                        />
                        <TextFiledGroup
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
                    }
                    <div className="form-group">
                        {!isPasswordChanging &&
                        <button type="button" disabled={isLoading} onClick={this.onEditClick}
                                className={`btn ${isEditing ? "btn-light border-primary" : "btn-primary"}`}>
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                        }
                        {(isEditing || isPasswordChanging) &&
                        <button type="submit" onSubmit={this.onSubmit} disabled={isLoading} style={{marginLeft: 10}}
                                className="btn btn-primary">Submit</button>}
                        {!isEditing &&
                        <button type="button" style={{marginLeft: 10}} disabled={isLoading}
                                onClick={this.onChgPassClick}
                                className="btn btn-light border-primary">
                            {isPasswordChanging ? "Cancel" : "Change Password"}
                        </button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

ProfileForm.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
}

export default ProfileForm;

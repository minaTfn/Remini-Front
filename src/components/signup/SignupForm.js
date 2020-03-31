import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFiledGroup from "../common/TextFiledGroup";
import {ValidateSignUp} from '../common/Validator';


class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlurValidate = this.onBlurValidate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            cell_number: '',
            password: '',
            passwordConfirmation: '',
            errors: {},
            isLoading: false,
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    isValid() {
        const {errors, isValid} = ValidateSignUp(this.state);
        if (!isValid) {
            this.setState({errors})
        }
        return isValid;
    }

    onBlurValidate(e) {
        const field = e.target.name;
        const {errors, isValid} = ValidateSignUp(this.state);
        if (!isValid) {
            let varErrors = this.state.errors;
            if (!isValid) {
                varErrors[field] = errors[field];
            } else {
                varErrors[field] = '';
            }
            this.setState({errors: varErrors})
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userSignupRequest(this.state).then(res => {
                // console.log(res);
                this.props.addFlashMessage({
                    type: "success",
                    text: "You've signed up successfully. Welcome!"
                });
                this.context.router.push("/")
            }).catch(error => {
                this.setState({errors: error.response.data, isLoading: false})
            });
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <form autoComplete="off" onSubmit={this.onSubmit}>
                <h2>Join our community!</h2>

                <TextFiledGroup
                    error={errors.email}
                    autoComplete="new-email"
                    label="Email"
                    onChange={this.onChange}
                    onBlur={this.onBlurValidate}
                    field="email"
                    value={this.state.email}
                />
                <TextFiledGroup
                    error={errors.cell_number}
                    label="Cell Number"
                    onChange={this.onChange}
                    onBlur={this.onBlurValidate}
                    field="cell_number"
                    value={this.state.cell_number}
                    type="number"
                />
                <TextFiledGroup
                    error={errors.password}
                    label="Password"
                    autoComplete="new-password"
                    onBlur={this.onBlurValidate}
                    onChange={this.onChange}
                    field="password"
                    value={this.state.password}
                    type="password"
                />
                <TextFiledGroup
                    error={errors.passwordConfirmation}
                    label="Confirm Password"
                    onChange={this.onChange}
                    onBlur={this.onBlurValidate}
                    field="passwordConfirmation"
                    value={this.state.passwordConfirmation}
                    type="password"
                />
                <div className="form-group">
                    <button type="submit" disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sigh Up
                    </button>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
}

SignupForm.contextTypes = {
    router: PropTypes.object.isRequired,
}

export default SignupForm
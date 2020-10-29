import React, {Component} from "react";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import {ValidateSignUp} from '../common/Validator';
import Button from "react-bootstrap/Button";


class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onBlurValidate = this.onBlurValidate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            data: {
                name: '',
                email: '',
                cell_number: '',
                password: '',
                password_confirmation: '',
            },
            errors: {},
            isLoading: false,
        }
    }

    onChange(e) {

        if (e.target.name === 'password')
            this.setState({
                data: {...this.state.data, password_confirmation: e.target.value, [e.target.name]: e.target.value}
            });
        else
            this.setState({
                data: {...this.state.data, [e.target.name]: e.target.value}
            });
    }

    onBlurValidate(e) {
        const field = e.target.name;
        const {errors, isValid} = ValidateSignUp(this.state.data);
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
            this.props.submit(this.state.data).then(() => {
                this.props.addFlashMessage({
                    type: "success",
                    text: "You've signed up successfully. Welcome!"
                });
            }).catch(error => {
                this.setState({errors: error.response.data.errors, isLoading: false})
            });
        }
    }

    isValid() {
        const {errors, isValid} = ValidateSignUp(this.state.data);
        if (!isValid) {
            this.setState({errors})
        }
        return isValid;
    }

    render() {
        const {errors, data, isLoading} = this.state;
        return (
            <form autoComplete="off" onSubmit={this.onSubmit}>
                <TextFieldGroup
                    error={errors.name}
                    label="Name"
                    autoComplete="new-name"
                    onChange={this.onChange}
                    onBlur={this.onBlurValidate}
                    field="name"
                    isRequired
                    value={data.name}
                />
                <TextFieldGroup
                    error={errors.email}
                    autoComplete="new-email"
                    label="Email"
                    onChange={this.onChange}
                    onBlur={this.onBlurValidate}
                    field="email"
                    isRequired
                    value={data.email}
                />
                {/*<TextFieldGroup*/}
                {/*    error={errors.cell_number}*/}
                {/*    label="Cell Number"*/}
                {/*    onChange={this.onChange}*/}
                {/*    onBlur={this.onBlurValidate}*/}
                {/*    field="cell_number"*/}
                {/*    value={data.cell_number}*/}
                {/*    type="number"*/}
                {/*/>*/}
                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    autoComplete="new-password"
                    onBlur={this.onBlurValidate}
                    onChange={this.onChange}
                    field="password"
                    value={data.password}
                    type="password"
                    isRequired
                />
                {/*<TextFieldGroup*/}
                {/*    error={errors.password_confirmation}*/}
                {/*    label="Confirm Password"*/}
                {/*    onChange={this.onChange}*/}
                {/*    onBlur={this.onBlurValidate}*/}
                {/*    field="password_confirmation"*/}
                {/*    value={data.password_confirmation}*/}
                {/*    isRequired*/}
                {/*    type="password"*/}
                {/*/>*/}
                <div className="form-group mt-4">
                    <Button
                        className="w-100"
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting…' : 'Sign Up'}
                    </Button>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
}
export default SignupForm
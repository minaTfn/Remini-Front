import React, {Component} from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import {ValidateForgotPassword} from '../common/Validator';
import TextFieldGroup from "../common/TextFieldGroup";
import Button from 'react-bootstrap/Button'
import {FormattedMessage} from "react-intl";


class ForgotPasswordFrom extends Component {

    constructor(props) {
        super(props);
        this.onBlurValidate = this.onBlurValidate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            data: {
                email: ""
            },
            isLoading: false,
            errors: {}
        };
    }


    onChange(e) {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });
    }

    onBlurValidate(e) {
        const field = e.target.name;
        const {errors, isValid} = ValidateForgotPassword(this.state.data);
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

            }).catch(error => {
                this.setState({errors: error.response.data.errors, isLoading: false})
            });
        }
    }

    isValid() {
        const {errors, isValid} = ValidateForgotPassword(this.state.data);
        if (!isValid) {
            this.setState({errors})
        }
        return isValid;
    }

    render() {
        const {errors, data, isLoading} = this.state;
        return (
            <div>
                {errors.non_field_errors && <Alert severity="error">{errors.non_field_errors}</Alert>}
                <form autoComplete="off" onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        error={errors.email}
                        autoComplete="new-email"
                        label={
                            <FormattedMessage
                                id="email"
                                defaultMessage="Email"
                            />
                        }
                        onChange={this.onChange}
                        onBlur={this.onBlurValidate}
                        field="email"
                        type="email"
                        value={data.email}
                    />
                    <div className="form-group">
                        <Button
                            className="w-100"
                            type="submit"
                            variant="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <FormattedMessage
                                    id="sending.email"
                                    defaultMessage="Sending Email…"
                                />
                            ) : (
                                <FormattedMessage id="submit" defaultMessage="Submit"/>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

ForgotPasswordFrom.propTypes = {
    // addFlashMessage: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
}
export default ForgotPasswordFrom
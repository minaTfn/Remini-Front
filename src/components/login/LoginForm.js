import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import {FormattedMessage} from "react-intl";
import Button from "react-bootstrap/Button";
import TextFieldGroup from "../common/TextFieldGroup";
import {ValidateLogin} from '../common/Validator';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            data: {
                email: "",
                password: ""
            },
            errors: {},
            isLoading: false,
        };
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.submit(this.state.data)
            .catch(err => {
                    if (err.response) {
                        this.setState({errors: err.response.data.data, isLoading: false})
                    }
                }
            );
        }

    }

    isValid() {
        const {errors, isValid} = ValidateLogin(this.state.data);
        if (!isValid) {
            this.setState({errors})
        }

        return isValid;
    }

    onChange(e) {
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });
    }

    render() {
        const {errors, data, isLoading} = this.state;
        return (
            <div>
                {errors && errors.non_field_errors && <Alert severity="error">{errors.non_field_errors}</Alert>}
                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        field="email"
                        label={
                            <FormattedMessage
                                id="email"
                                defaultMessage="Email"
                            />
                        }
                        value={data.email}
                        error={errors.email}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        field="password"
                        label={
                            <FormattedMessage
                                id="login.password"
                                defaultMessage="Password"
                            />
                        }
                        type="password"
                        value={data.password}
                        error={errors.password}
                        onChange={this.onChange}
                    />
                    <div className="form-group mt-4">
                        <Button type="submit" variant="primary" disabled={isLoading} className="w-100">
                            {isLoading ? (
                                <FormattedMessage
                                    id="login.entering"
                                    defaultMessage="Login..."
                                />
                            ) : (
                                <FormattedMessage id="login.submitBtn" defaultMessage="Login"/>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;
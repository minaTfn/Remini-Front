import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import TextFiledGroup from "../common/TextFiledGroup";
import {ValidateLogin} from '../common/Validator';
import {login} from '../../actions/AuthActions';

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

    isValid() {
        const {errors, isValid} = ValidateLogin(this.state.data);
        if (!isValid) {
            this.setState({errors})
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.submit(this.state.data)
                .catch(err =>
                    this.setState({errors: err.response.data, loading: false})
                );
        }

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
                {errors.non_field_errors && <Alert severity="error">{errors.non_field_errors}</Alert>}
                <form onSubmit={this.onSubmit}>
                    <TextFiledGroup
                        field="email"
                        label="Email"
                        value={data.email}
                        error={errors.email}
                        onChange={this.onChange}
                    />
                    <TextFiledGroup
                        field="password"
                        label="Password"
                        type="password"
                        value={data.password}
                        error={errors.password}
                        onChange={this.onChange}
                    />
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default connect(null, {login})(LoginForm);
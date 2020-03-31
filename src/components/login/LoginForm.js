import React, {Component} from 'react';
import TextFiledGroup from "../common/TextFiledGroup";
import {ValidateLogin} from '../common/Validator';
import {connect} from 'react-redux';
import {login} from '../../actions/AuthActions';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLoading: false,
        };
    }

    isValid() {
        const {errors, isValid} = ValidateLogin(this.state);
        if (!isValid) {
            this.setState({errors})
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.login(this.state).then(
                (res) => this.context.router.push("/"),
                (err) => this.setState({errors: err.response.data, isLoading: false})
            );
        }

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors, email, password, isLoading} = this.state;
        return (
            <div>
                {errors.non_field_errors && <Alert severity="error">{errors.non_field_errors}</Alert>}
                <form onSubmit={this.onSubmit}>
                    <TextFiledGroup
                        field="email"
                        label="Email"
                        value={email}
                        error={errors.email}
                        onChange={this.onChange}
                    />
                    <TextFiledGroup
                        field="password"
                        label="Password"
                        type="password"
                        value={password}
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
    login: PropTypes.func.isRequired,
}

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired,
}

export default connect(null, {login})(LoginForm);
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import LoginForm from './LoginForm';
import {login} from '../../actions/AuthActions';

class LoginPage extends Component {
    submit = data =>
        this.props.login(data).then(() => this.props.history.push("/dashboard"));

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col md offset-4">
                    <h1 style={{marginBottom:20}}>Login page</h1>
                    <LoginForm submit={this.submit}/>
                    <Link to="/forgot_password">Forgot Password?</Link>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, {login})(LoginPage);
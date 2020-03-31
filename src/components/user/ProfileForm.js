import React, {Component} from 'react';
import TextFiledGroup from "../common/TextFiledGroup";
import {ValidateProfile} from '../common/Validator';
import axios from "axios";
// import {connect} from 'react-redux';
// import {login} from '../../actions/AuthActions';
// import PropTypes from 'prop-types';
// import Alert from '@material-ui/lab/Alert';

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onBlurValidate = this.onBlurValidate.bind(this);
        this.state = {
            email: '',
            password: '',
            last_name: '',
            first_name: "",
            cell_number: '',
            errors: {},
            isEditing: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        axios.get('http://192.168.7.30:8000/api/accounts/user-info/').then(res => this.setState(res.data));
    }


    isValid() {
        const {errors, isValid} = ValidateProfile(this.state);
        if (!isValid) {
            this.setState({errors})
        }

        return isValid;
    }

    onEditClick(e) {
        this.setState({isEditing: !this.state.isEditing});
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            axios.put('http://192.168.7.30:8000/api/accounts/user-info/', this.state).then((res) => {
                this.setState({
                    isEditing: false,
                    isLoading: false,
                })
            }).catch(error => {
                this.setState({errors: error.response.data, isLoading: false})
            });
        }

    }

    onBlurValidate(e) {
        const field = e.target.name;
        const {errors, isValid} = ValidateProfile(this.state);
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

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors, email, cell_number, first_name, last_name, isLoading, isEditing} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <TextFiledGroup
                        label="Email"
                        onChange={this.onChange}
                        value={email}
                        disabled={true}
                        classType="inRow"
                    />
                    <TextFiledGroup
                        error={errors.first_name}
                        label="First Name"
                        onChange={this.onChange}
                        onBlur={this.onBlurValidate}
                        field="first_name"
                        value={first_name}
                        type="text"
                        disabled={isEditing ? false : true}
                        classType="inRow"
                    />
                    <TextFiledGroup
                        error={errors.last_name}
                        label="Last Name"
                        onChange={this.onChange}
                        onBlur={this.onBlurValidate}
                        field="last_name"
                        value={last_name}
                        type="text"
                        disabled={isEditing ? false : true}
                        classType="inRow"
                    />
                    <TextFiledGroup
                        error={errors.cell_number}
                        label="Cell Number"
                        onChange={this.onChange}
                        onBlur={this.onBlurValidate}
                        field="cell_number"
                        value={cell_number}
                        type="number"
                        disabled={isEditing ? false : true}
                        classType="inRow"
                    />

                    <div className="form-group">
                        <button type="button" disabled={isLoading} onClick={this.onEditClick}
                                className={`btn ${isEditing ? "btn-light border-primary" : "btn-primary"}`}>
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                        {isEditing &&
                        <button type="submit" onSubmit={this.onSubmit} disabled={isLoading} style={{marginLeft: 10}}
                                className="btn btn-primary">Submit</button>}
                        {!isEditing && <button type="button" disabled={isLoading} style={{marginLeft: 10}}
                                               className="btn btn-light border-primary">Change Password</button>}
                    </div>
                </form>
            </div>
        );
    }
}

// ProfileForm.propTypes = {
//     login: PropTypes.func.isRequired,
// }
//
// ProfileForm.contextTypes = {
//     router: PropTypes.object.isRequired,
// }

export default ProfileForm;
// export default connect(null, {login})(ProfileForm);
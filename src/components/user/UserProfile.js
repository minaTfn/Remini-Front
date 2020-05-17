import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ProfileForm from './ProfileForm';
import {addFlashMessage} from "../../actions/flashMessages";

class UserProfile extends Component {

    render() {
        const {addFlashMessage} = this.props;
        return (
            <div className="row">

                <div className="col-md-8 col md offset-lg-1">
                    <h1 style={{marginBottom: 20}}>Profile</h1>
                    <ProfileForm addFlashMessage={addFlashMessage}/>
                </div>

            </div>
        );
    }
}

UserProfile.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
}
export default connect(null, {addFlashMessage})(UserProfile);

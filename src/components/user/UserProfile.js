import React, {Component} from 'react';
import ProfileForm from './ProfileForm'
class UserProfile extends Component {
    render() {
        return (
            <div className="row">

                <div className="col-md-6 col md offset-lg-1">
                    <h1 style={{marginBottom:20}}>Profile</h1>
                    <ProfileForm />
                </div>

            </div>
        );
    }
}

export default UserProfile;
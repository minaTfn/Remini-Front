import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Icon from '@material-ui/core/Icon';
// import {confirmEmail} from '../../actions/users';
// import {convertObjectToUrlParams} from "../common/Functions";


class ConfirmationPage extends Component {

    state = {
        loading: true,
        success: false,
    };

    componentDidMount() {
        // const id = this.props.match.params.id;

        // const items = {};
        if (this.props.match.params.result === 'error') {
            this.setState({loading: false, success: false});
        } else if (this.props.match.params.result === 'verified') {
            this.setState({loading: false, success: true});
        }
        // items.hash = this.props.match.params.hash;
        // items.signature = this.props.match.params.signature;
        // const params = convertObjectToUrlParams(items);

        // const params = this.props.location.search;
        //
        // this.props.confirmEmail(id, params)
        //     .then(() => this.setState({loading: false, success: true}))
        //     .catch(() => this.setState({loading: false, success: false}));
    }

    render() {
        const {loading, success} = this.state;
        return (
            <div>
                {loading && (
                    <Spinner animation="border"/>
                )}

                {!loading &&
                success && (
                    <Alert show variant="success">
                        <Alert.Heading><Icon className="fa fa-plus-circle" color="primary"/> Thank You</Alert.Heading>
                        <p>
                            Your account has been successfully verified.
                        </p>
                        <hr/>
                        <div className="d-flex justify-content-end">
                            <Link to="/dashboard" variant="outline-success">
                                Go to home page!
                            </Link>
                        </div>
                    </Alert>
                )}

                {!loading &&
                !success && (
                    <Alert show variant="danger">
                        <Alert.Heading>Ooops. Invalid token.</Alert.Heading>
                        <p>
                            Your token has been expired...
                        </p>
                    </Alert>

                )}
            </div>
        );
    }
}

// ConfirmationPage.propTypes = {
// confirmEmail: PropTypes.func.isRequired,
// match: PropTypes.shape({
//     params: PropTypes.shape({
//         result: PropTypes.string.isRequired,
//         // hash: PropTypes.string.isRequired,
//         // signature: PropTypes.string.isRequired,
//     }).isRequired
// }).isRequired
// }
export default ConfirmationPage
// export default connect(
//     null, {confirmEmail}
// )(ConfirmationPage);

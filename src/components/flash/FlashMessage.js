import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


class FlashMessage extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            open: true,
        };

    }

    handleClose() {
        this.props.deleteFlashMessage(this.props.message.id);
    };

    render() {
        const {type, text} = this.props.message;
        return (
            <div>
                <Snackbar open={this.state.open} autoHideDuration={6000} onExit={this.handleClose} onClose={this.handleClose}>
                    <Alert action={
                        <button
                            onClick={this.handleClose}
                            className="close">
                            <span>&times;</span>
                        </button>
                    }
                           severity={type}>
                        {text}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
}

export default FlashMessage;
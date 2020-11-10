import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import {ValidateContactUs} from "../../common/Validator";

class ContactForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                email: "",
                mobile: "",
                text: "",
            },
            errors: {},
            isSubmitting: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isAuthenticated && state.data.email !== props.user.email) {
            return {
                data: {
                    email: props.user.email,
                    mobile: props.user.phone,
                },
            };
        }
        return false;
    }

    onChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value,
            },
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isSubmitting: true});
            this.props
                .submit(this.state.data)
                .then(() => {
                    this.setState({
                        isSubmitting: false
                        , data: {
                            email: "",
                            mobile: "",
                            text: "",
                        }
                    });
                })
                .catch((error) => {
                    if (error && error.response) {
                        this.setState({errors: error.response.data.errors, isSubmitting: false});
                    }
                });
        }
    };

    isValid() {
        const {errors, isValid} = ValidateContactUs(this.state.data);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    render() {

        const {user, isAuthenticated} = this.props;
        const {
            errors,
            isSubmitting,
            data
        } = this.state;
        return (
            <div className="col-md-7">
                <p className="pb-4">
                    <FormattedMessage id="contact.description"/>
                </p>
                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        label={
                            <FormattedMessage
                                id="email"
                            />
                        }
                        isRequired
                        field="email"
                        onChange={this.onChange}
                        value={isAuthenticated ? this.props.user.email : data.email}
                        disabled={isAuthenticated}
                    />
                    <TextFieldGroup
                        error={errors.mobile}
                        label={<FormattedMessage id="cellphone"/>}
                        onChange={this.onChange}
                        field="mobile"
                        value={data.mobile}
                        type="text"
                        disabled={!!user.phone}
                    />
                    <TextAreaFieldGroup
                        error={errors.text}
                        label={
                            <FormattedMessage
                                id="description"
                                defaultMessage="Description"
                            />
                        }
                        onChange={this.onChange}
                        isRequired
                        field="text"
                        value={data.text}
                    />
                    <Button type="submit" className="px-4" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <FormattedMessage
                                id="submitting"
                                defaultMessage="submit"
                            />
                        ) : (
                            <FormattedMessage id="submit" defaultMessage="submit"/>
                        )}
                    </Button>
                </form>
            </div>

        );
    }
}

ContactForm.propTypes = {
    user: PropTypes.object,
    isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user,
        isAuthenticated: !!state.user.email
    };
}

export default connect(mapStateToProps)(ContactForm);

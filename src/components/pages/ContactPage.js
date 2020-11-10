import React from "react";
import {connect} from "react-redux";
import {Image} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import banner from "../../theme/default/images/remini_about.jpg";
import ContactForm from "./partials/_contactForm";
import api from "../../utils/api";
import { addFlashMessage } from "../../actions/flashMessages";

const ContactPage = (props) => {

    const onSubmit = (data) => {
        return api.user.contactUs(data)
            .then((res) => {
                    props.addFlashMessage({
                        type: res.type,
                        text: res.message,
                    });
                }
            );
    }

    return (
        <div className="mb-n5">
            <h1 className="font-xl my-4 mr-auto mt-auto pl-2"><FormattedMessage id="nav.contact.us"/></h1>

            <ContactForm submit={onSubmit}/>
            <div className="d-flex">
                <Image width={400} className="ml-auto" src={banner}/>
            </div>
        </div>
    );
}

ContactPage.propTypes = {
    lang: PropTypes.string.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.locale,
    }
}

export default connect(mapStateToProps, {addFlashMessage})(ContactPage);
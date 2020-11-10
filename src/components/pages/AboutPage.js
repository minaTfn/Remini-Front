import React from "react";
import {connect} from "react-redux";
import {Image} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import banner from "../../theme/default/images/remini_about.jpg";
import AboutFa from "./partials/_aboutFa";
import AboutEn from "./partials/_aboutEn";

const AboutPage = (props) => (
    <div className="mb-n5">
        <h1 className="font-xl my-4 mr-auto mt-auto pl-2"><FormattedMessage id="about.remini"/></h1>
        {props.lang === 'fa' ? <AboutFa/> : <AboutEn/>}

        <div className="d-flex">
            <Image width={400} className="ml-auto" src={banner}/>
        </div>
    </div>
);

AboutPage.propTypes = {
    lang: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        lang: state.locale,
    }
}

export default connect(mapStateToProps)(AboutPage);
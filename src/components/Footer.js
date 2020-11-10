import React from "react";
import {Link} from 'react-router-dom';
import {FormattedMessage} from "react-intl";
import logoLight from "../theme/default/images/logo-light.png";

const Footer = () => {

    return (
        <div className="bg-footer pt-5 pb-2 mt-auto">
            <div className="d-flex col-lg-10 col-xl-8 col-md-12 flex-md-row flex-column
                                            flex-column-reverse mx-auto p-2 justify-content-center">
                <div className="d-flex flex-row col-md-7 col-12 justify-content-around">
                    <div className="d-flex footer-links border-footer flex-column align-content-center px-4">
                        <Link to="/about-us">
                            <FormattedMessage id="nav.about.us"/>
                        </Link>
                        <Link to="/contact-us">
                            <FormattedMessage id="nav.contact.us"/>
                        </Link>
                        <Link to="/in-progress">
                            <FormattedMessage id="nav.common.questions"/>
                        </Link>
                    </div>
                    <hr className="vertical"/>
                    <div className="footer-center-item px-4 d-flex footer-links flex-column">
                        <Link to="/in-progress">
                            <FormattedMessage id="nav.login"/>
                        </Link>
                        <Link to="/in-progress">
                            <FormattedMessage id="nav.signUp"/>
                        </Link>
                        <Link to="/in-progress">
                            <FormattedMessage id="nav.privacy"/>
                        </Link>
                    </div>
                </div>

                <div className="d-flex flex-column align-items-left col-md-5 mb-md-0 mb-5 text-center">
                    <div>
                        <img src={logoLight} alt="Remini Travel"/>
                    </div>
                    <div className="slogan text-white font-lg ml-3 mt-4">
                        <FormattedMessage id="slogan"/>
                    </div>
                    <hr className="horizontal mt-3 d-md-none"/>
                </div>
            </div>
            <div className="text-white font-sm text-center">
                <hr className="my-3 horizontal"/>
                <FormattedMessage id="copyright"/>
            </div>
        </div>

    );
}

export default Footer;

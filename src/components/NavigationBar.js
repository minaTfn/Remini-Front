import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import classnames from "classnames"
import {Navbar, NavDropdown, Nav, Container, Image} from "react-bootstrap";
import {logout} from "../actions/users";
import {setLocale} from "../actions/locale";
import avatar from "../theme/default/images/avatar.png";
import logo from "../theme/default/images/logo.jpg";
import LoginPage from "./login/LoginPage";
import SignupPage from "./signup/SignupPage";

class NavigationBar extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoginOpen: false,
            showForgetPassword: false,
            isSignUpOpen: false,
        };

    }

    hideLogin = () => {
        this.setState({isLoginOpen: false, showForgetPassword: false});
    };

    showLogin = () => {
        this.setState({isLoginOpen: true});
    }

    hideSignUp = () => {
        this.setState({isSignUpOpen: false});
    };

    showSignUp = () => {
        this.setState({isSignUpOpen: true});
    }

    onForgetPassword = () =>
        this.setState({showForgetPassword: true})

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const {isAuthenticated, user, location, username} = this.props;
        const {lang} = localStorage;
        const commonLinks = (
            <>
                <Nav.Link as={Link} className="ml-3" to="/about-us" href="/about-us">
                    <FormattedMessage id="nav.about.us" defaultMessage="About Us"/>
                </Nav.Link>
                <Nav.Link as={Link} className="ml-3" to="/contact-us" href="/contact-us">
                    <FormattedMessage id="nav.contact.us" defaultMessage="Contact Us"/>
                </Nav.Link>
            </>
        )


        const userLinks = (
            <Container>
                <Nav className="mr-auto mt-auto" activeKey={location.pathname}>
                    {/*<Nav.Link as={Link} to="/dashboard" href="/dashboard">*/}
                    {/*    <FormattedMessage id="nav.dashboard" defaultMessage="Dashboard"/>*/}
                    {/*</Nav.Link>*/}

                    <Nav.Link as={Link} className="ml-3" to="/my-deliveries" href="/my-deliveries">
                        <FormattedMessage id="nav.my.deliveries" defaultMessage="my deliveries"/>
                    </Nav.Link>

                    {/*<NavDropdown*/}
                    {/*    title={<span><FormattedMessage id="nav.request" defaultMessage="request"/></span>}*/}
                    {/*    id="basic-nav-dropdown"*/}
                    {/*>*/}
                    {/*    <NavDropdown.Item as={Link} to="/request/list" href="/request/list">*/}
                    {/*        <FormattedMessage id="nav.request_list" defaultMessage="request_list"/>*/}
                    {/*    </NavDropdown.Item>*/}
                    {/*    <NavDropdown.Item as={Link} to="/request/new" href="/request/new">*/}
                    {/*        <FormattedMessage id="nav.request_new" defaultMessage="request_new"/>*/}
                    {/*    </NavDropdown.Item>*/}
                    {/*</NavDropdown>*/}
                    {commonLinks}
                </Nav>
                <NavDropdown
                    drop="down"
                    alignRight
                    className="pb-1"
                    title={<><Image src={avatar} width={40} height={40} roundedCircle/> {username}</>}
                    id="basic-nav-dropdown"
                >
                    {/*<FontAwesomeIcon icon={faUserAlt} />*/}
                    {/*<FontAwesomeIcon icon={faUserCircle} />*/}
                    {/*<FontAwesomeIcon icon={faUserAltSlash} />*/}
                    {/*<FontAwesomeIcon icon={faUserTie} />*/}
                    <NavDropdown.Item disabled>{user}</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item as={Link} to="/profile">
                        <FormattedMessage id="nav.profile" defaultMessage="Profile"/>
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/profile">
                        <FormattedMessage
                            id="nav.changePassword"
                            defaultMessage="Change Password"
                        />
                    </NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item href="void()" onClick={this.logout.bind(this)}>
                        <FormattedMessage id="nav.logout" defaultMessage="Logout"/>
                    </NavDropdown.Item>
                </NavDropdown>
            </Container>
        );

        const guestLinks = (
            <Nav className="mr-auto">
                <Nav.Link className="ml-3" onClick={this.showLogin}>
                    <FormattedMessage id="nav.login" defaultMessage="Login"/>
                </Nav.Link>
                <Nav.Link className="ml-3" onClick={this.showSignUp}>
                    <FormattedMessage id="nav.signUp" defaultMessage="Sign Up"/>
                </Nav.Link>
                {commonLinks}
            </Nav>
        );
        return (
            <>
                <LoginPage show={this.state.isLoginOpen}
                           showForget={this.state.showForgetPassword}
                           onForgetShow={this.onForgetPassword}
                           onHide={this.hideLogin}
                />
                <SignupPage show={this.state.isSignUpOpen} onHide={this.hideSignUp}/>
                <Navbar bg="white" className="p-0" expand="lg">
                    <Container fluid="md">
                        <Navbar.Brand as={Link} className="text-white" to="/">
                            <Image src={logo}/>
                        </Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav" className="mt-auto">
                            {isAuthenticated ? userLinks : guestLinks}
                        </Navbar.Collapse>
                        <Nav>
                            <Nav.Link as="button" className={classnames("border-0 btn btn-link language mr-1", {active: (lang === "en")})}
                                      onClick={() => this.props.setLocale("en")}>
                                EN
                            </Nav.Link>{" "}
                            <Nav.Link as="button" className={classnames("border-0 btn btn-link language", {active: (lang === "fa")})}
                                      onClick={() => this.props.setLocale("fa")}>
                                FA
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

NavigationBar.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
};

export default connect(null, {logout, setLocale})(NavigationBar);

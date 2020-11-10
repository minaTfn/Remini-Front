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

        const homeLink = (
            <>
                <Nav.Link as={Link} to="/" href="/">
                    <FormattedMessage id="nav.home" defaultMessage="Home"/>
                </Nav.Link>
            </>
        )
        const commonLinks = (
            <>
                <Nav.Link as={Link} className="ml-lg-3" to="/about-us" href="/about-us">
                    <FormattedMessage id="nav.about.us" defaultMessage="About Us"/>
                </Nav.Link>
                <Nav.Link as={Link} className="ml-lg-3" to="/contact-us" href="/contact-us">
                    <FormattedMessage id="nav.contact.us" defaultMessage="Contact Us"/>
                </Nav.Link>
            </>
        )


        const userLinks = (
            <Nav activeKey={location.pathname}>
                {homeLink}
                <Nav.Link as={Link} className="ml-lg-3" to="/my-deliveries" href="/my-deliveries">
                    <FormattedMessage id="nav.my.deliveries" defaultMessage="my deliveries"/>
                </Nav.Link>
                {commonLinks}
            </Nav>
        );

        const userDropDown = (
            <NavDropdown
                drop="down"
                alignRight
                className="mr-1"
                title={<><Image src={avatar} width={40} height={40} roundedCircle/> <span
                    className="text-info">{username}</span></>}
                id="basic-nav-dropdown"
            >
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
        )

        const guestLinks = (
            <Nav className="mr-auto">
                {homeLink}
                <Nav.Link className="ml-lg-3" onClick={this.showLogin}>
                    <FormattedMessage id="nav.login" defaultMessage="Login"/>
                </Nav.Link>
                <Nav.Link className="ml-lg-3" onClick={this.showSignUp}>
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

                <Navbar bg="white" className="py-0" expand="lg">
                    <Container fluid="md" className="p-0">
                        <Navbar.Brand as={Link} className="text-white" to="/">
                            <Image src={logo} alt="Remini Travel"/>
                        </Navbar.Brand>
                        <div className="d-block d-lg-none userDropDown ml-auto mt-auto">
                            {isAuthenticated && userDropDown}
                        </div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className="my-1"/>
                        <Navbar.Collapse className="mt-auto">
                            <hr className="d-lg-none mb-1 opacity-4 mt-0"/>
                            <Nav className="mr-auto mt-auto">
                                <Navbar.Collapse id="basic-navbar-nav" className="mt-auto">
                                    {isAuthenticated ? userLinks : guestLinks}
                                </Navbar.Collapse>
                            </Nav>
                            <hr className="d-lg-none mb-1 opacity-4"/>
                            <Nav className="flex-row mr-2 pb-1 ml-auto mt-auto" style={{width: "80px"}}>
                                <Nav.Link as="button"
                                          className={classnames("border-0 btn btn-link language mr-1", {active: (lang === "en")})}
                                          onClick={() => this.props.setLocale("en")}>
                                    EN
                                </Nav.Link>{" "}
                                <Nav.Link as="button"
                                          className={classnames("border-0 btn btn-link language", {active: (lang === "fa")})}
                                          onClick={() => this.props.setLocale("fa")}>
                                    FA
                                </Nav.Link>
                            </Nav>
                            <div className="d-none d-lg-block mt-auto">
                                {isAuthenticated && userDropDown}
                            </div>

                        </Navbar.Collapse>
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

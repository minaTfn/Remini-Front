import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import classnames from "classnames"
import {Navbar, NavDropdown, Nav, Container, Image} from "react-bootstrap";
import {logout} from "../actions/users";
import {setLocale} from "../actions/locale";
import avatar from "../theme/default/images/avatar.png";

class NavigationBar extends Component {
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const {isAuthenticated, user, location} = this.props;
        const {lang} = localStorage;
        const userLinks = (
            <Container>
                <Nav className="mr-auto" activeKey={location.pathname}>
                    <Nav.Link as={Link} to="/dashboard" href="/dashboard">
                        <FormattedMessage id="nav.dashboard" defaultMessage="Dashboard"/>
                    </Nav.Link>
                    <NavDropdown
                        title={<span ><FormattedMessage id="nav.delivery" defaultMessage="delivery"/></span>}
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item as={Link} to="/delivery/list" href="/delivery/list">
                            <FormattedMessage id="nav.delivery_list" defaultMessage="delivery_list"/>
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/delivery/new" href="/delivery/new">
                            <FormattedMessage id="nav.delivery_new" defaultMessage="delivery_new"/>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                <Nav>
                    <Nav.Link as="button" className={classnames("bg-info","border-0",{active:(lang === "en")})} onClick={() => this.props.setLocale("en")}>
                        EN
                    </Nav.Link>{" "}
                    <Nav.Link as="button" className={classnames("bg-info","border-0",{active:(lang === "fa")})} onClick={() => this.props.setLocale("fa")}>
                        FA
                    </Nav.Link>
                </Nav>
                <NavDropdown
                    drop="down"
                    alignRight
                    title={<Image src={avatar} width={40} height={40} roundedCircle/>}
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
            </Container>
        );

        const guestLinks = (
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/login">
                    Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                    Sign Up
                </Nav.Link>
            </Nav>
        );
        return (
            <Navbar bg="info" className="navbar-dark" expand="lg">
                <Navbar.Brand as={Link} className="text-white" to="/">
                    ReactJS
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    {isAuthenticated ? userLinks : guestLinks}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavigationBar.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
};

export default connect(null, {logout, setLocale})(NavigationBar);

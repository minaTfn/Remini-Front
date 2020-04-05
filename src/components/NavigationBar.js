import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/AuthActions";
import { Dropdown } from "react-bootstrap";

class NavigationBar extends Component {
  constructor() {
    super();
    this.onDropDownClick = this.onDropDownClick.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  onDropDownClick() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const userLinks = (
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav  mr-auto mt-2 mt-lg-0">
          <li>
            <Dropdown onClick={this.onDropDownClick} show={this.state.isOpen}>
              <Dropdown.Toggle variant="simple" id="dropdown-basic">
                {user.email ? user.email : "Guest"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link
                  onClick={this.onDropDownClick}
                  to="/profile"
                  className="dropdown-item"
                >
                  My Profile
                </Link>
                <Link
                  onClick={this.onDropDownClick}
                  to="profile"
                  className="dropdown-item"
                >
                  Change Password
                </Link>
                <Dropdown.Divider />
                <a
                  href="void()"
                  className="dropdown-item"
                  onClick={this.logout.bind(this)}
                >
                  Logout
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item active">
            <Link to="/postList" className="nav-link">
              Posts
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/create" className="nav-link">
              Create
            </Link>
          </li>
        </ul>
      </div>
    );

    const guestLinks = (
      <ul className="navbar-nav  mr-auto mt-2 mt-lg-0">
        <li className="nav-item active">
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-5">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              ReactJS
            </Link>
          </div>
          <div className="collapse navbar-collapse">
            {isAuthenticated ? userLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);

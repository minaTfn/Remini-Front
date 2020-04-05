import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import FlashMessagesList from "./components/flash/FlashMessagesList";
// import HomePage from "./components/pages/HomePage";
// import DashboardPage from "./components/pages/DashboardPage";
// import SignupPage from "./components/signup/SignupPage";
// import LoginPage from "./components/login/LoginPage";
// import CreatePost from "./components/post/create-post.component";
// import PostList from "./components/post/posts-list.component";
// import GuestRoute from "./utils/GuestRoute";
// import UserProfile from "./components/user/UserProfile";
// import UserRoute from "./utils/UserRoute";
import Routes from "./routes";

const App = ({ location, isAuthenticated }) => (
  <div className="container">
    <FlashMessagesList />
    {isAuthenticated && <NavigationBar />}
    <Routes location={location} />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.user.email,
  };
}

export default connect(mapStateToProps)(App);

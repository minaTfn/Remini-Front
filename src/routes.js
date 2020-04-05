import React from "react";
import { Route } from "react-router";
import PropTypes from 'prop-types';
import DashboardPage from "./components/pages/DashboardPage";
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import CreatePost from "./components/post/create-post.component";
import PostList from "./components/post/posts-list.component";
import UserProfile from "./components/user/UserProfile";
import HomePage from "./components/pages/HomePage";
import GuestRoute from "./utils/GuestRoute";
import UserRoute from "./utils/UserRoute";

const Routes = ({location}) => {
    return (
        <div>
            <Route location={location} path="/" exact component={HomePage} />
            <GuestRoute location={location} path="/login" exact component={LoginPage} />
            <GuestRoute
                location={location}
                path="/signup"
                exact
                component={SignupPage}
            />
            <UserRoute
                location={location}
                path="/dashboard"
                exact
                component={DashboardPage}
            />
            <UserRoute
                location={location}
                path="/create"
                exact
                component={CreatePost}
            />
            <UserRoute
                location={location}
                path="/postList"
                exact
                component={PostList}
            />
            <UserRoute
                location={location}
                path="/profile"
                exact
                component={UserProfile}
            />
        </div>
    );
};

Routes.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export default Routes;



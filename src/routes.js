import React from "react";
import {Route, IndexRoute} from 'react-router'
import App from "./components/App";
import Greetings from "./components/Greetings";
import SignupPage from "./components/signup/SignupPage";
import LoginPage from "./components/login/LoginPage";
import CreatePost from "./components/post/create-post.component";
import PostList from "./components/post/posts-list.component";
import requireAuth from "./utils/requireAuth";
import UserProfile from "./components/user/UserProfile";

export default (

    <Route path="">
        <Route path="/" component={requireAuth(App)}>
            <IndexRoute component={Greetings}/>
            <Route path="profile" component={UserProfile}/>
            <Route path="createNewPost" component={CreatePost}/>
            <Route path="postList" component={PostList}/>
        </Route>
        <Route path="/" component={App}>
            <Route path="login" component={LoginPage}/>
            <Route path="signup" component={SignupPage}/>
        </Route>


    </Route>

)

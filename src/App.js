import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader";
import {IntlProvider} from 'react-intl'
import {Route} from "react-router-dom";
import classnames from "classnames";
import {Container} from "react-bootstrap";
import GuestRoute from "./utils/GuestRoute";
import UserRoute from "./utils/UserRoute";
import {fetchCurrentUser} from "./actions/users";
import messages from "./utils/messages";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import FlashMessagesList from "./components/flash/FlashMessagesList";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import UserProfile from "./components/user/UserProfile";
import ConfirmationPage from "./components/user/ConfirmationPage";
import ResetPasswordPage from "./components/login/ResetPasswordPage";
import NewDeliveryPage from "./components/myDelivery/NewDeliveryPage";
import DeliveriesPage from "./components/myDelivery/DeliveriesPage";
import EditDeliveryPage from "./components/myDelivery/EditDeliveryPage";
import ShowDeliveryPage from "./components/delivery/ShowDeliveryPage";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import InProgressPage from "./components/pages/InProgressPage";


class App extends Component {
    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.fetchCurrentUser();
        }
    }

    render() {
        const {location, isAuthenticated, user, lang, loaded, username} = this.props;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <Container fluid className={classnames('p-0 h-100 bg-main', {"bg-main": location.pathname === '/'})} >
                    <Loader loaded={loaded}>
                        <div className="d-flex flex-column h-100">
                            <NavigationBar location={location} isAuthenticated={isAuthenticated} lang={lang}
                                           user={user} username={username}/>
                            <Route location={location} path="/(:page)?" exact component={HomePage}/>
                            <div className="mainContainer mx-auto px-xl-1 px-md-5 px-3">
                                <FlashMessagesList/>

                                <div className="py-5">
                                    <Route
                                        location={location}
                                        path="/confirmation/:result"
                                        exact
                                        component={ConfirmationPage}
                                    />
                                    <Route
                                        location={location}
                                        path="/contact-us"
                                        exact
                                        component={ContactPage}
                                    />
                                    <Route
                                        location={location}
                                        path="/about-us"
                                        exact
                                        component={AboutPage}
                                    />
                                    <GuestRoute
                                        location={location}
                                        path="/passwordReset/:token/:email"
                                        exact
                                        component={ResetPasswordPage}
                                    />
                                    <Route
                                        location={location}
                                        path="/delivery/:slug"
                                        exact
                                        component={ShowDeliveryPage}
                                    />
                                    <Route
                                        location={location}
                                        path="/in-progress"
                                        exact
                                        component={InProgressPage}
                                    />
                                    <UserRoute
                                        location={location}
                                        path="/dashboard"
                                        exact
                                        component={DashboardPage}
                                    />
                                    <UserRoute
                                        location={location}
                                        path="/my-deliveries"
                                        exact
                                        component={DeliveriesPage}
                                    />
                                    <UserRoute
                                        location={location}
                                        path="/my-deliveries/:slug/edit"
                                        exact
                                        component={EditDeliveryPage}
                                    />
                                    <UserRoute
                                        location={location}
                                        path="/my-delivery/:slug"
                                        exact
                                        isOwn
                                        component={ShowDeliveryPage}
                                    />
                                    <UserRoute
                                        location={location}
                                        path="/my-deliveries/new"
                                        exact
                                        component={NewDeliveryPage}
                                    />
                                    <UserRoute
                                        location={location}
                                        path="/profile"
                                        exact
                                        component={UserProfile}
                                    />
                                </div>
                            </div>
                            <Footer/>
                        </div>

                    </Loader>
                </Container>
            </IntlProvider>
        );
    }
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email,
        user: state.user.email ? state.user.email : "Guest",
        username: state.user.name ? state.user.name :'',
        loaded: state.user.loaded,
        lang: state.locale,
    };
}

export default connect(mapStateToProps, {
    fetchCurrentUser,
})(App);

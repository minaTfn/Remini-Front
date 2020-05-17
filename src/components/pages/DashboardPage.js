import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import { allPostsSelector } from '../../reducers/deliverySlice';
// import AddPost from '../delivery/AddDelivery';

const DashboardPage = ({ posts }) => (
    <div className="jumbotron bg-light mt-1">
        <h2>Dashboard Page</h2>
        {/*{posts.length === 0 && <AddPost/>}*/}
    </div>
);

DashboardPage.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string,
    }),).isRequired,
}

// function mapStateToProps(state) {
    // return {
    //     posts: allPostsSelector(state),
    // }
// }

export default connect()(DashboardPage) ;
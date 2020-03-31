import React from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';


const Post = props => {
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);


    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Content</TableCell>
                        <TableCell align="center">Publish Date</TableCell>
                        <TableCell align="center">Author</TableCell>
                        <TableCell align="center">Like Count</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.posts.map(currentPost => (
                        <TableRow key={currentPost.slug}>
                            <TableCell align="center">{currentPost.title}</TableCell>
                            <TableCell align="center">{currentPost.content}</TableCell>
                            <TableCell align="center">{currentPost.publish_date}</TableCell>
                            <TableCell align="center">{currentPost.author}</TableCell>
                            <TableCell align="center">{currentPost.like_count}</TableCell>
                            <TableCell align="center"><Link to={currentPost.slug + "/edit/"}><EditIcon
                                fontSize="small"/></Link></TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default class PostList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            postsL: [],
        };
    }

    PostsGet() {
        axios.get("http://192.168.7.30:8000/api/post/")
            .then(response => {
                // console.log(response.data.results)
                this.setState({postsL: response.data.results})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
            this.PostsGet();
    }


    render() {
        return (
            <div>
                <Post posts={this.state.postsL}/>
            </div>
        )
    }
}
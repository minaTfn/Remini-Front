import React, {Component} from "react";
import '../../theme/default/css/App.css';
import PostForm from "./postFrom";
import axios from 'axios';
import PropTypes from 'prop-types';


let setDateZero = (date) => {
    return date < 10 ? '0' + date : date;
}

class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        let newDate = new Date();

        this.state = {
            title: "",
            content: "",
            publish_date: newDate.getFullYear() + '-' + setDateZero(newDate.getMonth() + 1) + '-' + setDateZero(newDate.getDate())+'T'+setDateZero(newDate.getHours())+":"+setDateZero(newDate.getMinutes()),
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newPost = {
            title: this.state.title,
            content: this.state.content,
            publish_date: this.state.publish_date,
        }

        axios.post('http://192.168.7.30:8000/api/post-new/', newPost).then(res => {
            this.context.router.push("/")
        });

        let newDate = new Date();
        this.setState({
            title: "",
            content: "",
            publish_date: newDate.getFullYear() + '-' + setDateZero(newDate.getMonth() + 1) + '-' + setDateZero(newDate.getDate())+'T'+setDateZero(newDate.getHours())+":"+setDateZero(newDate.getMinutes()),
        })
    }

    render() {

        return (
            <div>
                <PostForm
                    onChange={this.handleChange}
                    onSubmit={this.onSubmit}
                    states={this.state}
                />
            </div>

        )
    }
}
CreatePost.contextTypes = {
    router: PropTypes.object.isRequired,
}
export default CreatePost;
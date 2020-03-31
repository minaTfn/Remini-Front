import React, {Component} from "react";
import '../../theme/default/css/App.css';
import PostForm from "./postFrom";
import axios from 'axios';


export default class EditPost extends Component{

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: "",
            content: "",
            publish_date: "",
        }
    }
    componentDidMount() {
        axios.get('http://192.168.7.30:8000/api/post/'+this.props.match.params.id+'/edit')
            .then(response =>{
                this.setState({
                    title: response.data.title,
                    content: response.data.content,
                    publish_date: response.data.publish_date,
                })
            })
            .catch(function (error) {
                console.log("edit error : "+error);
            })
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();

        const editPost = {
            title: this.state.title,
            content: this.state.content,
            publish_date: this.state.publish_date,
        }

        axios.put('http://192.168.7.30:8000/api/post/'+this.props.match.params.id+'/edit/', editPost)
            .then(response => {
                this.props.history.push({
                    pathname:"/",
                    state:{
                        updatedItem:response.data
                    }
                });
            });
    }

    render() {
        return(
            <div>
                <PostForm
                    onChange={this.handleChange}
                    // onChangeTitle={this.onChangeTitle}
                    // onChangeContent={this.onChangeContent}
                    onSubmit={this.onSubmit}
                    states={this.state}
                />
            </div>
        )
    }
}
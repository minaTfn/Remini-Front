import React, {Component} from 'react';
import {Dropdown, Form} from "semantic-ui-react";

class SearchDeliveryForm extends Component {
    state = {
        query: "",
        loading: false,
        options: [{
            key: 1,
            value: 1,
            text: "first book",
        },
            {
                key: 2,
                value: 2,
                text: "second book",
            }],
        posts: {}
    }

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: data,

        });
        this.timer = setTimeout(this.fetchOptions(), 1000);
    }

    fetchOptions = () =>{
        if(!this.state.query) return;
        this.setState({
            loading:true,
        })
    }

    render() {
        return (
            <Form>
                <Dropdown
                search
                fluid
                placeholder="search for a post..."
                value={this.state.query}
                onSearchChange={this.onSearchChange}
                options={this.state.options}
                loading={this.state.loading}
                />

            </Form>
        );
    }
}

export default SearchDeliveryForm;
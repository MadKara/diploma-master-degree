import React, { Component } from "react";
import Tag from "./Tag";
import Cookies from 'universal-cookie';

class Tags extends Component {
    constructor() {
        super();
        this.state = {
            tags: []
        };

        this.handleAddition = this.handleAddition.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete = i => {
        this.setState({ tags: this.state.tags.filter((tag, index) => index !== i) });
    };

    handleAddition = tag => {
        this.setState({ tags: [...this.state.tags, tag] });
    };

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        const Id = this.props.Id;

        fetch(`http://localhost:8080/service-api/tags/content/${Id}`, {
        }).then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Item) => { return Item });
                this.setState({ tags: initialItems });
            });
    };


    render() {
        return (
            <div className="input-tag">
                <div>
                    {this.state.tags.map((tag, i) => (
                        <Tag item={tag} key={i} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Tags;
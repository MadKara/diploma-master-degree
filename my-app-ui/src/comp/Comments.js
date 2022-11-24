import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Category from './Category';
import Comment from './Comment';
import CommentEditor from './CommentEditor';
import './Comment.css'

class Comments extends Component {

    constructor() {
        super();
        this.state = {
            comments: []
        };
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        let Id = this.props.contentId
        console.log("comments")
        console.log(Id)
        fetch(`http://localhost:8080/service-api/comments/content/${Id}`, {
            // headers: {
            //     "Authorization": "Bearer " + cookie.get('token')
            // }
        }).then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Item) => { return Item });
                this.setState({ comments: initialItems });
            });

    };
    render() {
        let inc = 0;
        return (
            <div className="mainDivType">
                <div className="commSection">Comment section</div>
                {/* <table>
                    <tbody> */}
                        {
                            this.state.comments.map(item => {
                                inc = inc + 1;
                                return <Comment item={item} key={item.id} key2={inc} />
                            })
                        }
                    {/* </tbody>
                </table> */}
                
                {<CommentEditor contentId={this.props.contentId} userId={this.props.userId} />}
            </div>
        );
    }

}
export default Comments;
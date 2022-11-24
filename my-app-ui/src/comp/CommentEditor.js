import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';
import { withRouter } from "react-router-dom";
// import 'react-dropdown/style.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import './Comment.css'


class CommentEditor extends Component {
    constructor() {
        super();
        this.state = {
            comment: {},
            user: {},
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    // componentDidMount() {
    //     let cookie = new Cookies();
    //     let initialItems = [];
    //     fetch(`http://localhost:8080/service-api/categories/`, {
    //         // headers: {
    //         //     "Authorization": "Bearer " + cookie.get('token')
    //         // }
    //     }).then(response => { return response.json(); })
    //         .then(data => {
    //             initialItems = data.map((Item) => { return Item });
    //             this.setState({ categories: initialItems });
    //             console.log(this.state.categories)
    //         });
    // }

    onSubmit(e) {
        e.preventDefault();

        const contentId = this.props.contentId;
        const userId = this.props.userId;
        console.log(contentId)
        console.log(userId)
        let status;

        fetch(`http://localhost:8080/service-api/comments/?message=${this.state.message}&userId=${userId}&contentId=${contentId}`, {
            method: "POST",
            // body: form_data,
            headers: {
                "Authorization": "Bearer " + new Cookies().get('token'),
                // "content-type": "application/json"
            }
        }).then(function (response) {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 400) {
                NotificationManager.warning('Помилка вхідних даних, повторіть спробу.');
            }
            if (response.status === 200) {
                NotificationManager.success('Новий користувач добавленний');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });

        window.location.reload(false);
    }

    render() {
        return (
            <div className="formAddComment">
                <form onSubmit={this.onSubmit}>
                    {/* <b>Створення нового comment</b> */}
                    
                    <input className='commentInput' type="text" id="message" required={true} placeholder="Введіть message" name="message" onChange={(e) => this.state.message = e.target.value} />
                    
                    <button className='commentButton'>Підтвердити добавлення</button>
               </form>
            </div>
        );
    }
} export default CommentEditor;
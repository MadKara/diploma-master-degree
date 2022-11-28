import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';
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

    onSubmit(e) {
        e.preventDefault();

        const contentId = this.props.contentId;
        const userId = this.props.userId;
        console.log(contentId)
        console.log(userId)
        let status;

        fetch(`http://localhost:8080/service-api/comments/?message=${this.state.message}&userId=${userId}&contentId=${contentId}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + new Cookies().get('token')
            }
        }).then(function (response) {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 400) {
                NotificationManager.warning('Помилка вхідних даних, повторіть спробу.');
            }
            if (response.status === 200) {
                NotificationManager.success('Новий коментар добавленний');
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
                    <input className='commentInput' type="text" required={true} placeholder="Введіть коментар" name="message" onChange={(e) => this.state.message = e.target.value} />
                    <button className='commentButton'>Надіслати</button>
               </form>
            </div>
        );
    }
} export default CommentEditor;
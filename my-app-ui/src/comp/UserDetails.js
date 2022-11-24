import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

class UserDetails extends Component {

    constructor() {
        super();
        this.state = {
            user: {

            }
        };
        fetch(`http://localhost:8080/service-api/users/current`, {
            headers: {
                "Authorization": "Bearer " + new Cookies().get('token')
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                user: data,
            });
        });

        this.deleteElem = this.deleteElem.bind(this);
    }

    deleteElem(e) {
        e.preventDefault();
        let answer = window.confirm("Ви видаляєте користувача " + this.state.user.userName)
        if (answer) {
            fetch(`http://localhost:8080/service-api/users/${this.state.user.id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + new Cookies().get('token')
                }
            }).then(function (response) {
                if (response.status === 500) {
                    NotificationManager.error('Помилка сервера');
                }
                if (response.status === 200) {
                    NotificationManager.success('Успішне видалення');
                }
            });
            this.props.history.push('/auth');
        }
    }



    render() {
        console.log(this.state.user.id);
        return (
            <div className="mainDivDetailsItem">

                <b>Користувач</b><br />
                <b>Ім'я: </b>{this.state.user.userName}<br />
                <b>Поштова скринька: </b>{this.state.user.email}<br />
                <b>День народження: </b>{this.state.user.password}<br />
                <img src={this.state.user.avatarPath} alt="User's avatar" width="100" height="75"></img>
                <b>Content by userId </b>{this.state.user.id}<br />
                <Link to={"/auth/contents-user/" + this.state.user.id}>Users Contents</Link>
                <Link to={"/auth/add-content/" + this.state.user.id}>Add Content</Link>

                <button className="delete" onClick={this.deleteElem}>Видалити</button>
                <Link className="update" to={"/auth/profile-update/" + this.state.user.id}>Оновити профіль</Link>
            </div>
        );
    }
} export default UserDetails; 
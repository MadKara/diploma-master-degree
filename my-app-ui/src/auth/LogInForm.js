import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';
import './LogInForm.css'
import { withRouter } from "react-router-dom";

class LogInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        this.setState({ [target.name]: target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let status;
        fetch(`http://localhost:8080/api/authentication/login`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 400) {
                NotificationManager.warning('Помилка вхідних даних, повторіть спробу.');
                console.log(this.state)
            }
            if (response.status === 200) {
                status = 200;
                NotificationManager.success('Аутентифікація успішна');
                return response.text();
            }
        }).then(data => {
            if (status === 200) {
                const cookies = new Cookies();
                cookies.set('token', data, { path: '/', maxAge: 3600 });
                const { history } = this.props;
                history.push("/auth");
                window.location.reload(false);
            }
        });
    }


    render() {
        
        return (
            <div className="login">
                Для подальшої роботи у системі потрібно ввести свої персональні дані
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input className="login" type="text" id="email" required={true} placeholder="Введіть email" name="email" onChange={this.handleChange} />
                    </div>

                    <div>
                        <input className="login" type="password" id="password" required={true} placeholder="Введіть пароль" name="password" onChange={this.handleChange} />
                    </div>

                    <button className="myButton">Увійти</button>
                </form>
                На цю сторінку вас автоматично переадресовує якщо:<span className="info">1. Ви не авторизовані 2. Час сесії сплив (1 год.)</span>
            </div>
        );
    }
}
export default withRouter(LogInForm);
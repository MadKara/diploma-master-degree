import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import './SignInForm.css'
import { withRouter } from "react-router-dom";

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            userName: '',
            email: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    };

    handleChange(e) {
        let target = e.target;
        this.setState({ [target.name]: target.value });
    }

    onSubmit(e) {
        console.log(this.state)
        e.preventDefault();

        let form_data = new FormData();
        form_data.append('file', this.state.image, this.state.image.name);
        let status;
        fetch(`http://localhost:8080/api/authentication/registration?userName=${this.state.userName}&email=${this.state.email}&password=${this.state.password}`, {  ///?userName=${this.state.userName}
            method: "POST",
            body: form_data,
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
                const { history } = this.props;
                history.push("/logIn");
            }
        });
    }


    render() {

        return (
            <div className="signUpContainer">
                <div className='form'>
                    <div className='signUpTitle'>SignUp</div>
                    <form onSubmit={this.onSubmit}>
                        <div className="imgContainer">
                            <img src='stiker1.png' alt="WTF" className='signUpAvatar' />
                        </div>
                        <p />
                        <input className="signUpInput" type="text" id="userName" required={true} placeholder="Введіть username" name="userName" onChange={this.handleChange} />
                        <p />
                        <input className="signUpInput" type="text" id="email" required={true} placeholder="Введіть email" name="email" onChange={this.handleChange} />
                        <p />
                        <input className="signUpInput" type="password" id="password" required={true} placeholder="Введіть password" name="password" onChange={this.handleChange} />
                        <p />
                        <input className="signin" type="file" id="image" required={true} accept="image/png, image/jpeg" onChange={this.handleImageChange} />
                        <p />
                        <button className='signUpButton'>Підтвердити добавлення</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default withRouter(SignInForm);
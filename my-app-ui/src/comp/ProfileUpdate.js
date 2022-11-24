import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';
import { useRouteMatch, Link, Route, Switch, Redirect } from 'react-router-dom';
import ExtResourcesUpdate from './ExtResourcesUpdate';
import AddTag from './AddTag';
// import ExtResModal from './ExtResModal'


class ProfileUpdate extends Component {
    constructor() {
        super();
        this.state = {
            imgPreview: '',
            id: '',
            userName: '',
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    handleImageChange = (e) => {
        this.setState({
            image: e.target.files[0],
            imgPreview: URL.createObjectURL(e.target.files[0])
        })
    };

    handleChange = (e) => {
        console.log(this.state)
        let target = e.target;
        console.log(e.target.name)
        this.setState({ [target.name]: target.value });
    }

    componentDidMount() {
        let cookie = new Cookies();
        const Id = this.props.match.params.Id;
        let initialItems = [];
        console.log("profile-update")
        console.log(Id)
        console.log(this.props)
        fetch(`http://localhost:8080/service-api/users/current`, {
            headers: {
                "Authorization": "Bearer " + new Cookies().get('token')
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            this.setState(data);
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const Id = this.props.match.params.Id;
        console.log(Id)
        let form_data = new FormData();
        form_data.append('file', this.state.image, this.state.image.name);
        console.log(form_data)

        let cookie = new Cookies();
        // if (this.state.image != null) {
        //     console.log("n");
        //     form_data.append('file', this.state.image, this.state.image.name);
        // }

        fetch(`http://localhost:8080/service-api/users/?email=${this.state.email}&userName=${this.state.userName}&password=${this.state.password}&id=${Id}`, {
            method: "PUT",
            body: form_data,
            headers: {
                "Authorization": "Bearer " + cookie.get('token')
            }
        }).then(function (response) {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 400) {
                NotificationManager.warning('Помилка вхідних даних, повторіть спробу.');
            }
            if (response.status === 200) {
                window.location.reload();
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {
        console.log(this.state.image)
        return (
            <div className="updateCustomer">
                <form onSubmit={this.onSubmit}>
                    <b>Оновлення профілю</b>
                    <img src={this.state.avatarPath} alt="User's avatar" width="100" height="75"></img>
                    <p></p>
                    username:
                    <input type="text" id="username" placeholder="Enter userName" name="userName" value={this.state.userName} onChange={this.handleChange} />
                    <p></p>
                    email:
                    {/* <img src={this.state.logoPath} alt="Icon of item" width="100" height="75"></img> */}
                    <input type="text" id="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <p></p>
                    password:
                    <input type="password" id="password" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <p></p>
                    <img src={this.state.imgPreview} alt="User's avatar" width="100" height="75"></img>
                    change image
                    <input type="file" id="avatar" accept="image/png, image/jpeg" onChange={this.handleImageChange} />
                    <p></p>
                    <button className='myButton'>Підтвердити оновлення</button>
                </form>
            </div>
        );
    }
} export default ProfileUpdate;
import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';
import { useRouteMatch, Link, Route, Switch, Redirect } from 'react-router-dom';
import AddTag from './AddTag';

class ContentUpdate extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            title: '',
            description: '',
            externalResources: [],
            showModal: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    modalOpen() {
        this.setState({ showModal: true });
    }

    modalClose() {
        this.setState({ showModal: false });
    }

    handleChange(e) {
        let target = e.target;
        this.setState({ [target.name]: target.value });
    }

    componentDidMount() {
        let cookie = new Cookies();
        const Id = this.props.match.params.Id;
        let initialItems = [];
        fetch(`http://localhost:8080/service-api/contents/id/${Id}`, {
            headers: {
                "Authorization": "Bearer " + cookie.get('token')
            }
        })
            .then(response => {
                return response.json();
            }).then(data => {
                initialItems = data;
                this.setState(data);
            });
    }

    onSubmit(e) {
        e.preventDefault();
        const Id = this.props.match.params.Id;
        let form_data = new FormData();
        let cookie = new Cookies();

        fetch(`http://localhost:8080/service-api/contents/?title=${this.state.title}&description=${this.state.description}&id=${Id}`, {
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
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <b>Редагування контенту</b>
                    <p>Назва:</p>
                    <input type="text" id="title" placeholder="Введіть назву" name="title" value={this.state.title} onChange={this.handleChange} />
                    <p>Опис:</p>
                    <input type="text" id="description" placeholder="Введіть опис" name="description" value={this.state.description} onChange={this.handleChange} />
                    <p></p>
                    <div>
                        <Link to={"/auth/ext-resources-update/" + this.state.externalResources.id} >Оновити додаткові зовнішні посилання</Link>
                    </div>
                    <p>//////////////////////////////////////////</p>
                    <div>
                        <AddTag Id={this.props.match.params.Id} />
                    </div>
                    <button>Підтвердити оновлення</button>
                </form>
            </div>
        );
    }
} export default ContentUpdate;
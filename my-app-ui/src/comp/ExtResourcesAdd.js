import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class ExtResourcesUpdate extends Component {
    constructor() {
        super();
        this.state = {
            content: {},
            id: '',
            twitter: '',
            instagram: '',
            showModal: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
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
        console.log("ext-res")
        fetch(`http://localhost:8080/service-api/contents/id/${Id}`, {
            headers: {
                "Authorization": "Bearer " + cookie.get('token')
            }
        })
            .then(response => {
                return response.json();
            }).then(data => {
                initialItems = data;
                this.setState({ content: initialItems });
            });
    }

    onSubmit(e) {
        e.preventDefault();
        const Id = this.props.match.params.Id;

        let form_data = new FormData();
        let cookie = new Cookies();

        fetch(`http://localhost:8080/service-api/contents/ext-resources/?instagram=${this.state.instagram}&twitter=${this.state.twitter}&id=${Id}`, {
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
                <Modal isOpen={this.state.showModal}>
                    <form onSubmit={this.onSubmit}>
                        <b>Добавити додаткові зовнішні посилання</b>
                        <p></p>
                        instagram:
                        <input type="text" id="instagram" placeholder="Введіть посилання" name="instagram" value={this.state.instagram} onChange={this.handleChange} />
                        <p></p>
                        twitter:
                        <input type="text" id="twitter" placeholder="Введіть посилання" name="twitter" value={this.state.twitter} onChange={this.handleChange} />
                        <p></p>
                        telegram:
                        <input type="text" id="telegram" placeholder="Введіть посилання" name="telegram" value={this.state.telegram} onChange={this.handleChange} />
                        <p></p>
                        youtube:
                        <input type="text" id="youtube" placeholder="Введіть посилання" name="youtube" value={this.state.youtube} onChange={this.handleChange} />
                        <p></p>
                        tiktok:
                        <input type="text" id="tiktok" placeholder="Введіть посилання" name="tiktok" value={this.state.tiktok} onChange={this.handleChange} />
                        <p></p>
                        <button onClick={this.onSubmit}><Link to={"/auth/add-gallery-content/" + this.state.content.title}>Зберегти</Link></button>
                        <button><Link to={"/auth/add-gallery-content/" + this.state.content.title} >Вийти</Link></button>
                    </form>
                </Modal>
            </div>
        );
    }
} export default ExtResourcesUpdate;
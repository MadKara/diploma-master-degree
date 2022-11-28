import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import AddTag from './AddTag';


class NewGallery extends Component {
    constructor() {
        super();
        this.state = {
            content: {},
            images: [],
            maxNumber: 10
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.handleImages = this.handleImages.bind(this);
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        const title = this.props.match.params.title;

        fetch(`http://localhost:8080/service-api/contents/title/${title}`, {
        })
            .then(response => {
                return response.json();
            }).then(data => {
                initialItems = data;
                this.setState({ content: initialItems });
                console.log(this.state.content)
            });
    }

    handleImages = (e) => {
        this.setState({ images: e.target.files });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.images.length === 0) {
            NotificationManager.warning("Потрібно обрати бодай одне фото!");
            return;
        }
        let form_data = new FormData();
        Array.from(this.state.images).forEach((image) => form_data.append('files', image))

        fetch(`http://localhost:8080/service-api/contents/gallery/?contentId=${this.state.content.id}`, {
            method: "POST",
            body: form_data,
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
                NotificationManager.success('Новий користувач добавленний');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
    }

    render() {
        let Id = this.state.content.id
        console.log(Id)
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <b>Продовження створення</b>
                    <p />
                    <input id='fileUpload' type='file' multiple
                        accept='image/png, image/jpeg'
                        onChange={this.handleImages}
                    />
                    <button >Добавити картинки</button>
                    <p />
                    <Link to={"/auth/add-ext-resources/" + this.state.content.id} >Добавити додаткові зовнішні посилання</Link>
                    <p></p>
                    <div>
                        Запропоновані теги:
                        <AddTag Id={this.state.content.id} />
                    </div>
                    <button onClick={() => window.location.href = "/auth/contents-user/" + this.state.content.user.id} >Переглянути створений контент</button>
                </form>
            </div>
        );
    }
} export default NewGallery;

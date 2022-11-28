import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';
import { withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

class NewContent extends Component {
    constructor() {
        super();
        this.state = {
            content: {},
            user: {},
            categories: []
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        fetch(`http://localhost:8080/service-api/categories/`, {
            // headers: {
            //     "Authorization": "Bearer " + cookie.get('token')
            // }
        }).then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Item) => { return Item });
                this.setState({ categories: initialItems });
                console.log(this.state.categories)
            });
    }

    onSubmit(e) {
        e.preventDefault();
        const Id = this.props.match.params.Id;
        let url;
        if (this.state.content.category === undefined) {
            url = `http://localhost:8080/service-api/contents/?title=${this.state.content.title}&description=${this.state.content.description}&userId=${Id}&mainLink=${this.state.content.browseLink}`;
        } else {
            url = `http://localhost:8080/service-api/contents/?title=${this.state.content.title}&description=${this.state.content.description}&userId=${Id}&categoryId=${this.state.content.category.id}&mainLink=${this.state.content.browseLink}`;
        }

        fetch(url, {
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
                NotificationManager.success('Новий контент добавлено');
            }
        }).catch(function () {
            NotificationManager.error('Помилка сервера');
        });
}

    render() {
        let categoryNames = this.state.categories.map((category) => { return category.name });
        let handleCategory = (e) => {
            let handleCategory;
            this.state.categories.forEach((category) => { if (e.value === category.name) handleCategory = category; });
            this.state.content.category = handleCategory;
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <b>Створення нового контенту</b>
                    <p />
                    <input type="text" id="title" required={true} placeholder="Введіть назву" name="title" onChange={(e) => this.state.content.title = e.target.value} />
                    <p />
                    <input type="text" id="description" required={true} placeholder="Введіть опис" name="description" onChange={(e) => this.state.content.description = e.target.value} />
                    <p />
                    <Dropdown options={categoryNames} onChange={handleCategory} placeholder="Оберіть категорію" />
                    <p />
                    <input type="text" id="browseLink" required={true} placeholder="Введіть основне посилання" name="browseLink" onChange={(e) => this.state.content.browseLink = e.target.value} />
                    <p />
                    <p />
                    <button onClick={() => window.location.href="/auth/add-gallery-content/" + this.state.content.title}>Підтвердити добавлення</button>
                    </form>
            </div>
        );
    }
} export default withRouter(NewContent);
import React, { Component } from "react";
import Tag from "./Tag";
import Cookies from 'universal-cookie';
import { NotificationManager } from 'react-notifications';


class AddTag extends Component {
    constructor() {
        super();
        this.state = {
            tagsByContentId: [],
            tags: [],
            suggestions: []
        };

        this.removeTag = this.removeTag.bind(this)
        this.inputKeyDown = this.inputKeyDown.bind(this)
    }

    removeTag = (id) => {
        fetch(`http://localhost:8080/service-api/tags/remove-from-content/?contentId=${this.props.Id}&tagId=${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + new Cookies().get('token')
            }
        }).then(function (response) {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 200) {
                window.location.reload();
            }
        }).catch(function (error) {
            NotificationManager.error('Помилка сервера');
        });
    }

    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.tagsByContentId.find(tag => tag.label.toLowerCase() === val.toLowerCase())) {
                return;
            }
            if (this.state.tags.find(tag => tag.label.toLowerCase() === val.toLowerCase())) {
                let tag = this.state.tags.find(tag => { return tag.label.toLowerCase() === val.toLowerCase() })
                console.log(tag)
                fetch(`http://localhost:8080/service-api/tags/to-content/?contentId=${this.props.Id}&tagId=${tag.id}`, {
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
                        NotificationManager.success('Новий користувач добавленний');
                    }
                }).catch(function () {
                    NotificationManager.error('Помилка сервера');
                });
            } else {
                fetch(`http://localhost:8080/service-api/tags/new-to-content/?contentId=${this.props.Id}&label=${val}`, {
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
                        NotificationManager.success('Новий користувач добавленний');
                    }
                }).catch(function () {
                    NotificationManager.error('Помилка сервера');
                });
            }
            this.tagInput.value = null;
        }
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems1 = [];
        let initialItems2 = [];
        const Id = this.props.Id;

        Promise.all([fetch(`http://localhost:8080/service-api/tags/content/${Id}`),
        fetch(`http://localhost:8080/service-api/tags/`)])
            .then(([res1, res2]) => { return Promise.all([res1.json(), res2.json()]) })
            .then(([data1, data2]) => {
                initialItems1 = data1.map((Item) => { return Item });
                this.setState({ tagsByContentId: initialItems1 });
                console.log(this.state.tagsByContentId)
                initialItems2 = data2.map((Item) => { return Item });
                this.setState({ tags: initialItems2 });
                console.log(this.state.tags)
            });
    };


    render() {
        return (
            <div className="input-tag">
                <p> Tags </p>
                <div>
                    <ul className="input-tag__tags">
                        {this.state.tagsByContentId.map((tag, i) => (
                            <li key={tag.id}>
                                {tag.label}
                                <button type="button" onClick={() => { this.removeTag(tag.id); }}>&times;</button>
                            </li>
                        ))}
                        <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default AddTag;
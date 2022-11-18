import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';
import { withRouter } from "react-router-dom";
// import 'react-dropdown/style.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';


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
        //console.log(this.state.content.category.id)
        if (this.state.content.category === undefined) {
            NotificationManager.warning("Ви обов'язково маєте вибрати category!");
            return;
        }

        // let userType = this.props.userType;
        //let url = "http://localhost:8080/service-api/contents/";
        // this.state.content.isAdmin = userType;
        // if (userType === 2) { //Admin
        //     url = url + `admin`;
        // }
        const Id = this.props.match.params.Id;
        console.log(Id)
        let status;

        fetch(`http://localhost:8080/service-api/contents/?title=${this.state.content.title}&description=${this.state.content.description}&userId=${Id}&categoryId=${this.state.content.category.id}`, {
            method: "POST",
            // body: form_data,
            headers: {
                "Authorization": "Bearer " + new Cookies().get('token'),
                // "content-type": "application/json"
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

        // .then(data => {
        //     if (status === 200) {
        //         console.log("history push")
        //         const { history } = this.props;
        //         history.push("/auth/contents-user/" + Id);
        //     }
        // })
        // this.props.history.push("/auth/add-gallery-content/" + this.state.title)
    }

    render() {
        // console.log(this.state.content)
        let categoryNames = this.state.categories.map((category) => { return category.name });
        let handleCategory = (e) => {
            let handleCategory;
            this.state.categories.forEach((category) => { if (e.value === category.name) handleCategory = category; });
            this.state.content.category = handleCategory;
            console.log(this.state.content.category)

        }

        return (
            <div className="newItem">
                <form onSubmit={this.onSubmit}>
                    <b>Створення нового content</b>
                    <p />
                    <input className="newItem" type="text" id="title" required={true} placeholder="Введіть title" name="title" onChange={(e) => this.state.content.title = e.target.value} />
                    <p />
                    <input className="newItem" type="text" id="description" required={true} placeholder="Введіть description" name="description" onChange={(e) => this.state.content.description = e.target.value} />
                    <p />
                    <Dropdown className="dropDown" options={categoryNames} onChange={handleCategory} placeholder="Виберіть category" />
                    <p />
                    <p />
                    <button className='myButton' onClick={() => window.location.href="/auth/add-gallery-content/" + this.state.content.title}>Підтвердити добавлення</button>
                    {/* <Link to={"/add-gallery-content/" + this.state.title}></Link> */}

                    {/* <Link to={"/auth/add-info-content/" + this.state.content.title} onClick={this.onSubmit}>Save Main Info</Link> */}
                </form>
            </div>
        );
    }
} export default withRouter(NewContent);
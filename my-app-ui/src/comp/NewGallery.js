import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Dropdown from 'react-dropdown';
import { withRouter } from "react-router-dom";
// import 'react-dropdown/style.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import ReactDropdown from 'react-dropdown';
import Dropzone from 'react-dropzone'
import ExtResourcesUpdate from './ExtResourcesUpdate';
import AddTag from './AddTag';
// import ImageUploading from "react-images-uploading";
// import ImageUploader from './ImageUploader';


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
        // console.log(title)

        fetch(`http://localhost:8080/service-api/contents/title/${title}`, {
        })
        .then(response => {
            return response.json();
        }).then(data => {
            initialItems = data;
            // console.log(initialItems)
            this.setState({content: initialItems});
        });
        // console.log(this.state.content)
    }

    handleImages = (e) => {
        console.log(e.target.files)
        this.setState({ images: e.target.files });
        // console.log(this.state.images)
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.images.length === 0) {
            NotificationManager.warning("Потрібно обрати бодай одне фото!");
            return;
        }
        console.log(this.state.images)

        // const title = this.props.match.params.title;
        let form_data = new FormData();
        Array.from(this.state.images).forEach((image) => form_data.append('files', image))
        // form_data.append('files', this.state.images);
        
        console.log(form_data)

        fetch(`http://localhost:8080/service-api/contents/gallery/?contentId=${this.state.content.id}`, {
            method: "POST",
            body: form_data,
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
    }

    render() {
        // console.log(this.state.content)
        // let categoryNames = this.state.categories.map((category) => { return category.name });
        // let handleCategory = (e) => {
        //     let handleCategory;
        //     this.state.categories.forEach((category) => { if (e.value === category.name) handleCategory = category; });
        //     this.state.content.category = handleCategory;
        //     console.log(this.state.content.category)

        // }
        console.log(this.state.content.id)
        return (
            <div className="newItem">
                <form onSubmit={this.onSubmit}>
                    <b>Створення нового content</b>
                    <input id='fileUpload' type='file' multiple
                        accept='image/png, image/jpeg'
                        onChange={this.handleImages}
                    />
                    {/* <Dropdown className="dropDown" options={categoryNames} onChange={handleCategory} placeholder="Виберіть category" /> */}
                    <p />
                    <p />
                    <Link to={"/auth/add-ext-resources/" + this.state.content.id} >Add Ext Res</Link>
                    <p></p>
                    <div>
                        <AddTag Id={this.state.content.id}/>
                    </div>
                    <button className='myButton' >Добавити картинки</button>
                    <button className='myButton' onClick={() => window.location.href="/auth/contents-user/" + this.state.content.user.id} >Перейти до створених контентів</button>
                </form>
            </div>
        );
    }
} export default NewGallery;

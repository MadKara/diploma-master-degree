import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';
import { useRouteMatch, Link, Route, Switch, Redirect } from 'react-router-dom';
import ExtResourcesUpdate from './ExtResourcesUpdate';
import AddTag from './AddTag';
// import ExtResModal from './ExtResModal'


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
        console.log("contentUpdate")
        console.log(Id)
        console.log(this.props)
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

    // handleImageChange = (e) => {
    //     this.setState({
    //         image: e.target.files[0]
    //     })
    // };

    onSubmit(e) {
        e.preventDefault();
        const Id = this.props.match.params.Id;
        console.log(Id)
        let form_data = new FormData();
        let cookie = new Cookies();
        // if (this.state.image != null) {
        //     console.log("n");
        //     form_data.append('file', this.state.image, this.state.image.name);
        // }

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
            <div className="updateCustomer">
                <form onSubmit={this.onSubmit}>
                    <b>Обновлення даних по content</b>
                    <p></p>
                    Title:
                    <input className="updateCustomer" type="text" id="title" placeholder="Enter title" name="title" value={this.state.title} onChange={this.handleChange} />
                    <p></p>
                    Description:
                    {/* <img src={this.state.logoPath} alt="Icon of item" width="100" height="75"></img> */}
                    <input className="newItem" type="text" id="description" placeholder="Enter description" name="description" value={this.state.description} onChange={this.handleChange} />
                    <p></p>
                    <div>
                        {/* <ExtResModal extResId={this.props.match.params.Id}/> */}
                        <button onClick={this.modalOpen}>Open Modal</button>
                        {/* <ExtResourcesUpdate isOpen={this.state.showModal} close={true} extResId={this.props.match.params.Id}/>                         */}
                        <Link to={"/auth/ext-resources-update/" + this.state.externalResources.id} >ExtResourcesUpdate</Link>
                        {/* <Switch>
                           <Route path={`/auth/ext-resources-update/:Id`} component={ExtResourcesUpdate} />
                        </Switch> */}
                    </div>
                    <p></p>
                    <div>
                        <AddTag Id={this.props.match.params.Id}/>
                    </div>
                    <button className='myButton'>Підтвердити обновлення</button>
                </form>
            </div>
        );
    }
} export default ContentUpdate;
import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

class ExtResourcesUpdate extends Component {
    constructor() {
        super();
        this.state = {
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
        console.log(this.props)
        const Id = this.props.match.params.Id;
        // const Id = this.props.extResId;
        let initialItems = [];
        console.log("ext-res")
        fetch(`http://localhost:8080/service-api/contents/ext-resources/${Id}`, {
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

        // this.state.showModal=this.props.isOpen
    }

    // handleImageChange = (e) => {
    //     this.setState({
    //         image: e.target.files[0]
    //     })
    // };

    onSubmit(e) {
        e.preventDefault();
        const Id = this.props.match.params.Id;
        // const Id = this.props.extResId;

        let form_data = new FormData();
        let cookie = new Cookies();
        // if (this.state.image != null) {
        //     console.log("n");
        //     form_data.append('file', this.state.image, this.state.image.name);
        // }

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
            <div className="updateCustomer">
                <div>ext-div</div>
                <Modal 
                // isOpen={this.state.show}
                isOpen={this.state.showModal}
                // ariaHideApp={false}
                //     isOpen={this.props.isOpen}
                //     onRequestClose={this.handleCloseModal}
                    >
                    <form onSubmit={this.onSubmit}> //
                        <b>Обновлення ext-resources по content</b>
                        <p></p>
                        Inst:
                        <input className="updateCustomer" type="text" id="instagram" placeholder="Enter inst" name="instagram" value={this.state.instagram} onChange={this.handleChange} />
                        <p></p>
                        Twitter:
                        {/* <img src={this.state.logoPath} alt="Icon of item" width="100" height="75"></img> */}
                        <input className="newItem" type="text" id="twitter" placeholder="Enter twitter" name="twitter" value={this.state.twitter} onChange={this.handleChange} />
                        <p></p>
                        {/* <button onClick={function(event) { this.onSubmit(event); this.handleCloseModal(); }} className='myButton'>Підтвердити обновлення</button>
                        <button onClick={this.props.toggleModal}>close</button> */}
                        <button onClick={this.onSubmit}><Link to={"/auth/content-update/"+this.state.id}>Save</Link></button>
                        <button><Link to={"/auth/content-update/"+this.state.id} >Close</Link></button>

                    </form>
                </Modal>
            </div>
        );
    }
} export default ExtResourcesUpdate;
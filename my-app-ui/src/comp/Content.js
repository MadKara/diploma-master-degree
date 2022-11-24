import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Category from './Category';
import Comment from './Comment';
import CommentEditor from './CommentEditor';
import Comments from './Comments';
import Modal from 'react-modal';
import Gallery from './Gallery';
import Tag from './Tag';
import Tags from './Tags';
import axios from 'axios';
import ContentDelete from './ContentDelete';
import './Content.css'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { FaBeer, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';

class Content extends Component {

    constructor() {
        super();
        this.state = {
            content: {
                title: '',
                description: '',
                dateTime: '',
                externalResources: {
                    twitter: '',
                    instagram: ''
                },
                user: {
                    userName: ''
                },
                category: {
                    name: ''
                }
            },
            user: {
                isAdmin: 0
            }
        };
    }

    componentDidMount() {
        let cookie = new Cookies();
        let Id = this.props.match.params.Id
        console.log(Id)

        Promise.all([fetch(`http://localhost:8080/service-api/contents/id/${Id}`),
        fetch(`http://localhost:8080/service-api/users/current`, {
            headers: {
                "Authorization": "Bearer " + new Cookies().get('token')
            }
        })])
            .then(([res1, res2]) => { return Promise.all([res1.json(), res2.json()]) })
            .then(([data1, data2]) => {
                this.setState({
                    content: data1,
                    user: data2
                });
                console.log(this.state.content)
                console.log(this.state.user)
            });

    };
    render() {
        let Id = this.props.match.params.Id;
        return (
            <Modal
                // className="modalContent"
                isOpen={true}>
                <div className="content">

                    {/* <div className='contentInf'> */}
                    <div className='catFox'>
                    <h4 className='catContent'>{this.state.content.category.name}</h4>
                    <div></div>
                    </div>
                    <div className='box2'>
                        <h2 className="contentTitle">{this.state.content.title}</h2>
                        <Link className='closeContent' to={"/auth/contents/" + this.state.content.category.name}>&times;</Link>
                    </div>
                    {/* </div> */}
                    <div className='specialInfoContent'>
                        {<Gallery Id={Id} />}
                        {<Tags Id={Id} />}
                    </div>
                    <div className='desPart'>
                        <div className="des">{this.state.content.description}</div>
                        <div className='userInf'>
                            <div className="userNameContent">{this.state.content.user.userName}</div>
                            <div className="dateTimeContent">{this.state.content.dateTime}</div>
                        </div>
                    </div>
                    {/* <div> */}
                    <div className='moreInf'>Більше про матеріал можна знайти за такими посиланнями:</div>
                    <div className='extResList'>
                        <a href={this.state.content.externalResources.twitter}><FaTwitterSquare size="50px"/></a>
                        <a href={this.state.content.externalResources.instagram}><FaInstagramSquare size="50px"/></a>
                    </div>
                    {/* </div> */}
                    <div className='comments'>
                        {<Comments contentId={Id} userId={this.state.content.user.id} />}
                        {<ContentDelete contentId={Id} isAdmin={this.state.user.isAdmin} catname={this.state.content.category.name} />}
                    </div>
                </div>
            </Modal>
        );
    }
}
export default Content;

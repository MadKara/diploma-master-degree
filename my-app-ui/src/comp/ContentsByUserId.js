import React, { Component, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Content from './ContentEditor';
import Categories from './Categories';
import ContentEditor from './ContentEditor';

class ContentsByUserId extends Component {

    constructor() {
        super();
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        const Id = this.props.match.params.Id;
        console.log("content by id")
        console.log(Id)

        fetch(`http://localhost:8080/service-api/contents/user/${Id}`, { //
            // headers: {
            //     "Authorization": "Bearer " + cookie.get('token')
            // }
        }).then(response => { return response.json(); })
        .then(data => {
            initialItems = data.map((Item) => { return Item });
            this.setState({ items: initialItems });
            console.log(this.state.items)
        });
    };

    render() {
        let inc = 0;
        return (
            <div className="mainDivType">
                <div className="heade">Список content bu user id</div>
                <table>
                    <tbody>
                        {
                            this.state.items.map(item => {
                                inc = inc + 1;
                                return <ContentEditor item={item} key={item.id} key2={inc} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}
export default ContentsByUserId;


import React, { Component, useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Content from './ContentEditor';
import Categories from './Categories';
import Picture from './Picture';

class Gallery extends Component {

    constructor() {
        super();
        this.state = {
            images: []
        };
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        const Id = this.props.Id;
        // console.log(Id)

        fetch(`http://localhost:8080/service-api/contents/gallery/${Id}`, { //
            // headers: {
            //     "Authorization": "Bearer " + cookie.get('token')
            // }
        }).then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Item) => { return Item });
                this.setState({ images: initialItems });
                // console.log(this.state.images)
            });
    };

    render() {
        let inc = 0;
        return (
            <div className="mainDivType">
                <div className="heade">Gallery</div>
                <table>
                    <tbody>
                        {
                            this.state.images.map(item => {
                                inc = inc + 1;
                                return <Picture item={item} key={item.id} key2={inc} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}
export default Gallery;


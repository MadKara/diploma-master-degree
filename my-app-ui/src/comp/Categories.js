import React, { Component, useState } from 'react';
import Cookies from 'universal-cookie';
import Category from './Category';
import './Categories.css'

class Categories extends Component {

    constructor() {
        super();
        this.state = {
            stor: true,
            items: []
        };
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
                this.setState({ items: initialItems });
            });

    };
    render() {
        let inc = 0;
        return (
            <div className="categoryDiv">
                <div className="cat-title">Список categories</div>
                {
                    this.state.items.map(item => {
                        inc = inc + 1;
                        return <Category item={item} key={item.id} key2={inc} />
                    })
                }
            </div>
        );
    }

}
export default Categories;
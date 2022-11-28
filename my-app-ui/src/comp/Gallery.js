import React, { Component, useState, useMemo, useEffect } from 'react';
import Cookies from 'universal-cookie';
import ImgView from './ImgView';

class Gallery extends Component {

    constructor() {
        super();
        this.state = {
            images: [],
            slideIndex: 1
        };
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        const Id = this.props.Id;

        fetch(`http://localhost:8080/service-api/contents/gallery/${Id}`, {
        }).then(response => { return response.json(); })
            .then(data => {
                initialItems = data.map((Item) => { return Item });
                this.setState({ images: initialItems });
            });
    };

    render() {
        return (
            <ImgView item={this.state.images} />
        );
    }
}
export default Gallery;


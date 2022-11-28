import React, { Component, useState, useMemo, useEffect } from 'react';
import Cookies from 'universal-cookie';
import {
    FaBeer, FaTwitter, FaInstagram, FaTelegram,
    FaTiktok, FaYoutube, FaSistrix
} from 'react-icons/fa';

class ExtRes extends Component {

    constructor() {
        super();
        this.state = {
            links: {}
        };
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems = [];
        const Id = this.props.Id;
        console.log(Id)

        fetch(`http://localhost:8080/service-api/contents/ext-resources/${Id}`, { //
            // headers: {
            //     "Authorization": "Bearer " + cookie.get('token')
            // }
        }).then(response => { return response.json(); })
            .then(data => {
                this.setState({ links: data })
            });
    };

    render() {
        let inc = 0;
        console.log(this.state.links)
        let browse = null;
        if (this.state.links.browseLink !== null) {
            browse = (<a href={this.state.links.browseLink}><FaSistrix size="50px" /></a>);
        }
        let inst = null;
        if (this.state.links.instagram !== null) {
            inst = (<a href={this.state.links.instagram}><FaInstagram size="50px" /></a>);
        }
        let twit = null;
        if (this.state.links.twitter !== null) {
            twit = (<a href={this.state.links.twitter}><FaTwitter size="50px" /></a>);
        }
        let tt = null;
        if (this.state.links.tiktok !== null) {
            tt = (<a href={this.state.links.tiktok}><FaTiktok size="50px" /></a>);
        }
        let teleg = null;
        if (this.state.links.telegram !== null) {
            teleg = (<a href={this.state.links.telegram}><FaTelegram size="50px" /></a>);
        }
        let yt = null;
        if (this.state.links.youtube !== null) {
            yt = (<a href={this.state.links.youtube}><FaYoutube size="50px" /></a>);
        }
        return (
            <div>
                {browse}
                {twit}
                {inst}
                {tt}
                {teleg}
                {yt}
            </div>
        );
    }
}
export default ExtRes;


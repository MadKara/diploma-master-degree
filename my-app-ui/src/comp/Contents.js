import React, { Component, useState, useMemo, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ContentEditor from './ContentEditor';
import Categories from './Categories';
import Content from './Content';
import ContentsInfo from './ContentsInfo';
// import TagsSearch from './TagsSearch';

class Contents extends Component {

    constructor() {
        super();
        this.state = {
            q: '',
            items: [],
            filteredItems: [],
            tags: [],
            selectedTag: false
        };

        this.handleSearch = this.handleSearch.bind(this)
        this.handleSearchValue = this.handleSearchValue.bind(this)
        // this.handleSelectedTag = this.handleSelectedTag.bind(this)
        this.handleTagChange = this.handleTagChange.bind(this)
    }

    handleSearchValue(e) {
        this.setState({ q: e.target.value })
    }

    handleSearch(e) {
        let value = e.target.value.toLowerCase();
        let result = [];
        console.log(value);
        result = this.state.items.filter((data) => {
            return data.title.search(value) != -1;
        });
        this.setState({ filteredItems: result })
        console.log(this.state.filteredItems)
    }

    // handleSelectedTag(e) {
    //     this.setState({ selectedTag: e.target.value })
    // }

    handleTagChange(e) {
        // this.handleSelectedTag(e)
        // this.setState({ selectedTag: e.target.value });
        // console.log(parseInt(e.target.value))
        // console.log(this.state.selectedTag)
        // let initialItems = this.state.filteredItems

        this.setState({ filteredItems: this.state.items })
        let tagId = e.target.value
        console.log(tagId)

        if (tagId == 0) {
            console.log("0")
            this.setState({ filteredItems: this.state.items })
        } else {
            this.setState({selectedTag: true})
            // console.log(this.state.selectedTag)
            let array = this.state.items.filter((item) => {
                return item.tags.map((item) => item.id).includes(parseInt(e.target.value));
            });
            this.setState({ filteredItems: array })
            console.log(array)
        }
    }

    componentDidMount() {
        let cookie = new Cookies();
        let initialItems1 = [];
        let initialItems2 = [];
        const cat = this.props.match.params.catname;
        console.log(cat)

        Promise.all([fetch(`http://localhost:8080/service-api/contents/category/${cat}`),
        fetch(`http://localhost:8080/service-api/tags/`)])
            .then(([res1, res2]) => { return Promise.all([res1.json(), res2.json()]) })
            .then(([data1, data2]) => {
                initialItems1 = data1.map((Item) => { return Item });
                this.setState({ items: initialItems1 });
                this.setState({ filteredItems: initialItems1 })
                console.log(this.state.filteredItems)
                initialItems2 = data2.map((Item) => { return Item });
                this.setState({ tags: initialItems2 });
                console.log(this.state.tags)
            });
    };

    render() {
        let inc = 0;
        console.log(this.state.filteredItems)
        return (
            <div className="mainDivType">
                <div className="search-wrapper">
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            // value={this.state.q}
                            /*
                            // set the value of our useState q
                            //  anytime the user types in the search box
                            */
                            onChange={this.handleSearch}
                        />
                        <span className="sr-only">Search by title</span>
                        <br />
                        <p></p>
                        {/* <TagsSearch items={this.state.filteredItems}/> */}
                        <div>
                            {
                                this.state.tags.map(item => {
                                    inc = inc + 1;
                                    return <button key={item.id} value={item.id} onClick={this.handleTagChange}>{item.label}  </button>
                                })
                            }
                            <button value={0} onClick={this.handleTagChange}>clear</button>
                        </div>
                        <span className="sr-only">Search by tags</span>
                    </label>
                </div>
                <div className="heade">Список content</div>
                <table>
                    <tbody>
                        {
                            this.state.filteredItems.map(item => {
                                inc = inc + 1;
                                return <ContentsInfo item={item} key={item.id} key2={inc} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}
export default Contents;


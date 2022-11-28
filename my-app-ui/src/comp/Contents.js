import React, { Component, useState, useMemo, useEffect } from 'react';
import Cookies from 'universal-cookie';
import './Contents.css';
import ContentsInfo from './ContentsInfo';

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

    handleTagChange(e) {
        this.setState({ filteredItems: this.state.items })
        let tagId = e.target.value
        console.log(tagId)

        if (tagId == 0) {
            console.log("0")
            this.setState({ filteredItems: this.state.items })
        } else {
            this.setState({ selectedTag: true })
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
            <div className='mainDivContents'>
                <div className='divContents'>
                    <div className="search-wrapper">
                        <input
                            type="text"
                            className="search-title-content"
                            placeholder="Search for..."
                            onChange={this.handleSearch}
                        />
                        <div className='seacrh-tags'>
                            <span className="searchByTagsTitle">Search by tags</span>
                            <div className='tags-input-container'>
                                {
                                    this.state.tags.map(item => {
                                        inc = inc + 1;
                                        return <button className='tag-item' key={item.id} value={item.id} onClick={this.handleTagChange}>#{item.label}  </button>
                                    })
                                }
                                <button className='clearTagsButton' value={0} onClick={this.handleTagChange}>Очистити</button>
                            </div>
                        </div>
                    </div>
                    <div className='cardsInfo'>
                        {this.state.filteredItems.length > 0 ? (
                            this.state.filteredItems.map(item => {
                                inc = inc + 1;
                                return <ContentsInfo item={item} key={item.id} key2={inc} />
                            })) : (<div className="noneContent">Нічого не знайдено</div>)
                        }
                    </div>
                </div>
            </div>
        );
    }

}
export default Contents;


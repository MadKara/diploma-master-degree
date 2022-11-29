import Card from "antd/es/card";
import Search from "antd/es/input/Search";
import Tag from "antd/es/tag";
import CheckableTag from "antd/es/tag/CheckableTag";
import React, { Component, useState, useMemo, useEffect } from "react";
import Cookies from "universal-cookie";
import "./Contents.css";
import ContentsInfo from "./ContentsInfo";

class Contents extends Component {
  constructor() {
    super();
    this.state = {
      q: "",
      items: [],
      filteredItems: [],
      tags: [],
      selectedTag: false,
      selectedTags: [],
      categoryName: "",
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchValue = this.handleSearchValue.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }

  handleSearchValue(e) {
    //this.setState({ q: e.target.value });
    this.handleSearch(e.target.value);
  }

  handleSearch(e) {
    let value = e.toLowerCase();
    let result = [];
    console.log(value);
    result = this.state.items.filter((data) => {
      return data.title.search(value) != -1;
    });
    this.setState({ filteredItems: result });
    console.log(this.state.filteredItems);
  }

  handleTagChange(e) {
    this.setState({ filteredItems: this.state.items });
    let tagId = e;
    console.log(tagId);

    if (tagId == 0) {
      console.log("0");
      this.setState({ filteredItems: this.state.items, selectedTags: [] });
    } else {
      this.setState({ selectedTag: true, selectedTags: [e] });
      let array = this.state.items.filter((item) => {
        return item.tags.map((item) => item.id).includes(parseInt(e));
      });
      this.setState({ filteredItems: array });
      console.log(array);
    }
  }

  componentDidUpdate() {
    if (this.props.match.params.catname !== this.state.categoryName) {
      this.setState({ categoryName: this.props.match.params.catname});

      this.loadContent(this.props.match.params.catname);
    }
  }

  loadContent(cat) {
    let cookie = new Cookies();
    let initialItems1 = [];
    let initialItems2 = [];

    Promise.all([
      fetch(`http://localhost:8080/service-api/contents/category/${cat}`),
      fetch(`http://localhost:8080/service-api/tags/`),
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([data1, data2]) => {
        initialItems1 = data1.map((Item) => {
          return Item;
        });
        this.setState({ items: initialItems1 });
        this.setState({ filteredItems: initialItems1 });
        console.log(this.state.filteredItems);
        initialItems2 = data2.map((Item) => {
          return Item;
        });
        this.setState({ tags: initialItems2 });
        console.log(this.state.tags);
      });
  }

  componentDidMount() {
    const cat = this.props.match.params.catname;
    console.log(cat);

    if (this.props.match.params.catname !== this.state.categoryName) {
      this.setState({ categoryName: this.props.match.params.catname});

      this.loadContent(this.props.match.params.catname);
    }
  }

  render() {
    let inc = 0;
    console.log(this.state.filteredItems);
    return (
      <div className="mainDivContents">
        <div className="divContents">
          <div className="search-wrapper">
            <div className="seacrh-tags">
              <Card title={<Search
              placeholder="Пошук"
              onSearch={this.handleSearch}
              onChange={this.handleSearchValue}
              style={{ width: 200 }}
            />}>
                {this.state.tags.map((item) => {
                  return (
                    <CheckableTag
                      key={item.id}
                      checked={this.state.selectedTags.indexOf(item.id) > -1}
                      onChange={(checked) =>
                        this.handleTagChange(checked ? item.id : 0)
                      }
                    >
                      {item.label}
                    </CheckableTag>
                  );
                })}
              </Card>
            </div>
          </div>
          <div className="cardsInfo">
            {this.state.filteredItems.length > 0 ? (
              this.state.filteredItems.map((item) => {
                inc = inc + 1;
                return <ContentsInfo item={item} key={item.id} key2={inc} />;
              })
            ) : (
              <div className="noneContent">Нічого не знайдено</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Contents;

import React, { Component, useState, useMemo, useEffect } from "react";
import Cookies from "universal-cookie";
import ContentEditor from "./ContentEditor";
import { Link } from "react-router-dom";
import { List } from "antd";

class ContentsByUserId extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    let cookie = new Cookies();
    let initialItems = [];
    const Id = this.props.match.params.Id;
    console.log("content by id");
    console.log(Id);

    fetch(`http://localhost:8080/service-api/contents/user/${Id}`, {
      //
      // headers: {
      //     "Authorization": "Bearer " + cookie.get('token')
      // }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        initialItems = data.map((Item) => {
          return Item;
        });
        this.setState({ items: initialItems });
        console.log(this.state.items);
      });
  }

  render() {
    return (
      <div>
        <div>Список створеного контенту:</div>
        <Link to={"/auth/add-content/" + this.props.match.params.Id}>
          Добавити новий контент
        </Link>
        <List
          itemLayout="horizontal"
          dataSource={this.state.items}
          renderItem={(item, index) => (
            <ContentEditor item={item} key={item.id} key2={index} />
          )}
        />
      </div>
    );
  }
}
export default ContentsByUserId;

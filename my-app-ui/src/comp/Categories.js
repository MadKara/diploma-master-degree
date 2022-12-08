import React, { Component, useState } from "react";
import Cookies from "universal-cookie";
import Category from "./Category";
import { Layout, Menu } from "antd";
import "./Categories.css";
import Sider from "antd/es/layout/Sider";
import MenuItem from "antd/es/menu/MenuItem";
import { NavLink } from "react-router-dom";

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      stor: true,
      items: [],
    };
  }

  componentDidMount() {
    let cookie = new Cookies();
    let initialItems = [];
    fetch(`http://localhost:8080/service-api/categories/`, {
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
      });
  }
  render() {
    return (
      <Menu theme="dark" mode="inline" selectedKeys={this.props.history.location.pathname.split('/')}>
        {this.state.items.map((item, index) => (
          <Menu.Item key={item.name}>
            <NavLink to={"/auth/contents/" + item.name}>
              <span>{item.name}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}
export default Categories;

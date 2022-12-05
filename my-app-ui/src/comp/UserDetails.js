import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Descriptions from "antd/es/descriptions";
import { Button, Card } from "antd";

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
    fetch(`http://localhost:8080/service-api/users/current`, {
      headers: {
        Authorization: "Bearer " + new Cookies().get("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          user: data,
        });
      });

    this.deleteElem = this.deleteElem.bind(this);
  }

  deleteElem(e) {
    e.preventDefault();
    let answer = window.confirm(
      "Ви видаляєте користувача " + this.state.user.userName
    );
    if (answer) {
      fetch(`http://localhost:8080/service-api/users/${this.state.user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + new Cookies().get("token"),
        },
      }).then(function (response) {
        if (response.status === 500) {
          NotificationManager.error("Помилка сервера");
        }
        if (response.status === 200) {
          NotificationManager.success("Успішне видалення");
        }
      });
      this.props.history.push("/auth"); ///--todo
    }
  }

  render() {
    console.log(this.state.user.id);
    return (
      <div>
        <img src={this.state.user.avatarPath} alt="Avatar" width="20%"></img>
        <p>Користувач: {this.state.user.userName}</p>
        <p>email: {this.state.user.email}</p>
        <p>password: {this.state.user.password}</p>
        <Link
          className="update"
          to={"/auth/profile-update/" + this.state.user.id}
        >
          Оновити профіль
        </Link>
        <button className="delete" onClick={this.deleteElem}>
          Видалити профіль
        </button>
        <Link to={"/auth/contents-user/" + this.state.user.id}>
          Переглянути створений контент
        </Link>
        <Descriptions bordered extra={<div><Button type="primary">Оновити</Button><Button type="primary">Оновити</Button></div>}>
            <Descriptions.Item label="Користувач">{this.state.user.userName}</Descriptions.Item>
            <Descriptions.Item label="Електронна пошта">{this.state.user.email}</Descriptions.Item>
          </Descriptions>
      </div>
    );
  }
}
export default UserDetails;

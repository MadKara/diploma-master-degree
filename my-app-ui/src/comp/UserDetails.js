import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Descriptions from "antd/es/descriptions";
import { Avatar, Button, Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { red, grey } from "@ant-design/colors";

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
    return (
      <Card
        title={
          <Avatar
            src={this.state.user.avatarPath}
            style={{ backgroundColor: grey[0] }}
          />
        }
        extra={
          <div>
            <Link to={"/auth/profile-update/" + this.state.user.id}>
              <EditOutlined
                style={{
                  fontSize: "18px",
                }}
              />
            </Link>

            <DeleteOutlined
              onClick={this.deleteElem}
              style={{
                fontSize: "18px",
                marginLeft: "10px",
                color: red[5],
              }}
            />
          </div>
        }
      >
        <p>Користувач: {this.state.user.userName}</p>
        <p>Електронна пошта: {this.state.user.email}</p>

        <Link to={"/auth/contents-user/" + this.state.user.id}>
          Переглянути створений контент
        </Link>
      </Card>
    );
  }
}
export default UserDetails;

import Button from "antd/es/button";
import Card from "antd/es/card";
import Form from "antd/es/form";
import Input from "antd/es/input";
import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Cookies from "universal-cookie";
import "./Comment.css";

class CommentEditor extends Component {
  constructor() {
    super();
    this.state = {
      comment: {},
      user: {},
      message: "",
    };
  }

  onSubmit = (message) => {
    const contentId = this.props.contentId;
    const userId = this.props.userId;
    console.log(contentId);
    console.log(userId);
    let status;

    fetch(
      `http://localhost:8080/service-api/comments/?message=${message}&userId=${userId}&contentId=${contentId}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + new Cookies().get("token"),
        },
      }
    )
      .then(function (response) {
        if (response.status === 500) {
          NotificationManager.error("Помилка сервера");
        }
        if (response.status === 400) {
          NotificationManager.warning(
            "Помилка вхідних даних, повторіть спробу."
          );
        }
        if (response.status === 200) {
          NotificationManager.success("Новий коментар добавленний");
        }
      })
      .catch(function () {
        NotificationManager.error("Помилка сервера");
      });

    window.location.reload(false);
  };

  render() {
    return (
      <Input.Group compact>
        <Input
          style={{ width: "calc(100% - 200px)" }}
          onChange={(e) => (this.state.message = e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => this.onSubmit(this.state.message)}
        >
          Надіслати
        </Button>
      </Input.Group>
    );
  }
}
export default CommentEditor;

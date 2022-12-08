import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Cookies from "universal-cookie";
import { useRouteMatch, Link, Route, Switch, Redirect } from "react-router-dom";
import AddTag from "./AddTag";
import Card from "antd/es/card";
import Form from "antd/es/form";
import Input from "antd/es/input";
import TextArea from "antd/es/input/TextArea";
import Button from "antd/es/button";
import ExtResourcesUpdate from "./ExtResourcesAdd";

class ContentUpdate extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      description: "",
      externalResources: [],
      showModal: false,
    };
  }

  componentDidMount() {
    let cookie = new Cookies();
    const Id = this.props.match.params.Id;
    let initialItems = [];
    fetch(`http://localhost:8080/service-api/contents/id/${Id}`, {
      headers: {
        Authorization: "Bearer " + cookie.get("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        initialItems = data;
        this.setState(data);
      });
  }

  onFinish = (values) => {
    const Id = this.props.match.params.Id;
    let form_data = new FormData();
    let cookie = new Cookies();

    fetch(
      `http://localhost:8080/service-api/contents/?title=${values.title}&description=${values.description}&id=${Id}`,
      {
        method: "PUT",
        body: form_data,
        headers: {
          Authorization: "Bearer " + cookie.get("token"),
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
          window.location.reload();
        }
      })
      .catch(function () {
        NotificationManager.error("Помилка сервера");
      });
  };

  render() {
    return (
      <div>
        {this.state.id && (
          <Card title="Редагування контенту">
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
              layout="horizontal"
              onFinish={this.onFinish}
            >
              <Form.Item
                label="Назва"
                name="title"
                labelAlign="left"
                initialValue={this.state.title}
                rules={[
                  {
                    required: true,
                    message: "Будь ласка введіть назву",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Опис"
                name="description"
                labelAlign="left"
                initialValue={this.state.description}
                rules={[
                  {
                    required: true,
                    message: "Будь ласка введіть опис",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>

              <ExtResourcesUpdate contentId={this.props.match.params.Id} />
              <div style={{ marginTop: "15px" }}>
                <AddTag Id={this.props.match.params.Id} />
              </div>

              <Form.Item>
                <Button
                  style={{ marginTop: "15px" }}
                  type="primary"
                  htmlType="submit"
                >
                  Оновити
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}
      </div>
    );
  }
}
export default ContentUpdate;

import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Dropdown from "react-dropdown";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import Card from "antd/es/card";
import Form from "antd/es/form";
import Upload from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import Input from "antd/es/input";
import TextArea from "antd/es/input/TextArea";
import Select from "antd/es/select";
import Button from "antd/es/button";

class NewContent extends Component {
  constructor() {
    super();
    this.state = {
      content: {},
      user: {},
      categories: [],
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
        this.setState({ categories: initialItems });
        console.log(this.state.categories);
      });
  }

  onFinish = (values) => {
    const Id = this.props.match.params.Id;
    const history = this.props.history;
    let url;
    if (values.category === undefined) {
      url = `http://localhost:8080/service-api/contents/?title=${values.title}&description=${values.description}&userId=${Id}&mainLink=${values.browseLink}`;
    } else {
      url = `http://localhost:8080/service-api/contents/?title=${values.title}&description=${values.description}&userId=${Id}&categoryId=${this.state.content.category.id}&mainLink=${values.browseLink}`;
    }

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + new Cookies().get("token"),
      },
    })
      .then(function (response) {
        if (response.status === 500) {
          NotificationManager.error("Помилка сервера");
        }
        if (response.status === 400) {
          NotificationManager.warning(
            "Помилка вхідних даних, повторіть спробу."
          );
        }
        history.push("/auth/add-gallery-content/" + values.title);
      })
      .catch(function (e) {
        NotificationManager.error("Помилка сервера");
      });
  };

  render() {
    let categoryNames = this.state.categories.map((category) => {
      return category.name;
    });
    let handleCategory = (e) => {
      let handleCategory;
      this.state.categories.forEach((category) => {
        if (e === category.name) handleCategory = category;
      });
      this.state.content.category = handleCategory;
    };

    return (
      <Card title="Створення нового контенту">
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
            rules={[
              {
                required: true,
                message: "Будь ласка введіть опис",
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Категорія"
            name="category"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Будь ласка виберіть категорію",
              },
            ]}
          >
            <Select onChange={handleCategory}>
              {categoryNames.map((category, index) => (
                <Select.Option key={index} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Посилання"
            name="browseLink"
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "Будь ласка добавте посилання",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Створити
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default withRouter(NewContent);

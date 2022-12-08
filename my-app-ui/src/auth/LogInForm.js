import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";
import { Input, Button, Form, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import "./LogInForm.css";

class LogInForm extends Component {
  onFinish = (values) => {
    let status;
    fetch(`http://localhost:8080/api/authentication/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 500) {
          NotificationManager.error("Помилка сервера");
        }
        if (response.status === 400) {
          NotificationManager.warning(
            "Помилка вхідних даних, повторіть спробу."
          );
          console.log(values);
        }
        if (response.status === 200) {
          status = 200;
          NotificationManager.success("Аутентифікація успішна");
          return response.text();
        }
      })
      .then((data) => {
        if (status === 200) {
          const cookies = new Cookies();
          cookies.set("token", data, { path: "/", maxAge: 3600 });
          const { history } = this.props;
          history.push("/auth");
          window.location.reload(false);
        }
      });
  }

  render() {
    return (
      <Card title="Авторизація" className="login">
        <Form className="login-form" onFinish={this.onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Будь ласка введіть вашу електронну пошту",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Електронна пошта"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Будь ласка введіть свій пароль" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Увійти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default withRouter(LogInForm);

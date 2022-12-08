import { Col, List, Row } from "antd";
import React from "react";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import ExtRes from "./ExtRes";
import Gallery from "./Gallery";
import Tags from "./Tags";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { red, grey } from "@ant-design/colors";
import Column from "antd/es/table/Column";

function ContentEditor(props) {
  const item = props.item;

  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <div style={{ minWidth: "150px" }}>
            <Gallery Id={item.id} height={150} />
          </div>
        }
        title={
          <div>
            <Row>
              <Col style={{ marginRight: "15px" }}>{item.title}</Col>
              <Col>
                <ExtRes Id={item.id} />
              </Col>
              <Col flex="auto" style={{ textAlign: "right" }}>
                <Link to={"/auth/content-update/" + item.id}>
                  <EditOutlined
                    style={{
                      fontSize: "18px",
                    }}
                  />
                </Link>
                <DeleteOutlined
                  onClick={() => deleteElem(item.id, item.title)}
                  style={{
                    fontSize: "18px",
                    marginLeft: "10px",
                    color: red[5],
                  }}
                />
              </Col>
            </Row>
          </div>
        }
        description={
          <Col>
            <Row style={{ height: "100px" }}>{item.description}</Row>
            <Row>
              <Col flex="auto">
                <Tags Id={item.id} />
              </Col>
              <Col>{item.dateTime}</Col>
            </Row>
          </Col>
        }
      ></List.Item.Meta>
    </List.Item>
  );
}

let deleteElem = (id, title) => {
  let cookie = new Cookies();

  let answer = window.confirm("Видалити " + title + " ?");

  if (answer) {
    fetch(`http://localhost:8080/service-api/contents/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + cookie.get("token"),
      },
    })
      .then(function (response) {
        if (response.status === 500) {
          NotificationManager.error("Помилка сервера");
        }
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch(function (error) {
        NotificationManager.error("Помилка сервера");
      });
  }
};

export default ContentEditor;

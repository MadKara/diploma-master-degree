import Input from "antd/es/input";
import Tag from "antd/es/tag";
import React, { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Cookies from "universal-cookie";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";

function SocialLink(props) {
  const icon = props.icon;
  const link = props.link;
  console.log(props);

  const [inputVisible, setinputVisible] = useState(false);

  function showInput() {
    setinputVisible(true);
  }

  function inputKeyDown(e) {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      setinputVisible(false);

      const Id = props.contentId;
      let form_data = new FormData();
      let cookie = new Cookies();

      fetch(
        `http://localhost:8080/service-api/contents/ext-resources/?${props.name}=${val}&id=${Id}`,
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
    }
  }

  return (
    <Row justify="start" align="bottom" style={{ paddingTop: "10px" }}>
      {icon && (
        <Col>
          {props.link && (
            <Link
              onClick={() =>
                window.open(props.link, "_blank", "noopener,noreferrer")
              }
            >
              {icon}
            </Link>
          )}
          {!props.link && <>{icon}</>}
        </Col>
      )}
      <Col style={{ marginLeft: "10px" }}>
        {inputVisible && (
          <Input
            type="text"
            size="small"
            style={{ marginRight: "8px", verticalAlign: "top" }}
            defaultValue={props.link}
            autoFocus={true}
            onKeyDown={inputKeyDown}
            onBlur={() => setinputVisible(false)}
            allowClear={true}
          />
        )}
        {!inputVisible && (
          <Tag
            style={{ background: "#fff", borderStyle: "dashed" }}
            onClick={showInput}
          >
            {link && (
              <div>
                <EditOutlined style={{ marginRight: "8px" }} />
                {link}
              </div>
            )}
            {!link && (
              <div>
                <PlusOutlined style={{ marginRight: "8px" }} />
                Добавити посилання
              </div>
            )}
          </Tag>
        )}
      </Col>
    </Row>
  );
}
export default SocialLink;

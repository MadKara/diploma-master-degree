import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Cookies from "universal-cookie";
import AddTag from "./AddTag";
import Upload from "antd/es/upload";
import Button from "antd/es/button";
import {
  UploadOutlined,
} from "@ant-design/icons";
import ExtResourcesUpdate from "./ExtResourcesAdd";

class NewGallery extends Component {
  constructor() {
    super();
    this.state = {
      content: {},
      images: null,
      maxNumber: 10,
    };

    this.handleImages = this.handleImages.bind(this);
  }

  componentDidMount() {
    let cookie = new Cookies();
    let initialItems = [];
    const title = this.props.match.params.title;

    fetch(`http://localhost:8080/service-api/contents/title/${title}`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        initialItems = data;
        this.setState({ content: initialItems });

        fetch(
          `http://localhost:8080/service-api/contents/gallery/${this.state.content.id}`,
          {}
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            initialItems =
              data?.map((Item) => {
                return Item;
              }) ?? [];
            this.setState({
              images: initialItems.map((e) => {
                return {
                  uid: `${e.id}`,
                  status: "done",
                  url: e.imgPath,
                };
              }),
            });
          });
      });
  }

  handleImages = (e) => {
    let form_data = new FormData();
    form_data.append("files", e.file);

    fetch(
      `http://localhost:8080/service-api/contents/gallery/?contentId=${this.state.content.id}`,
      {
        method: "POST",
        body: form_data,
        headers: {
          Authorization: "Bearer " + new Cookies().get("token"),
        },
      }
    )
      .then(function (response) {
        if (response.status === 500) {
          e.onError();
        }
        if (response.status === 400) {
          e.onError();
        }
        if (response.status === 200) {
          e.onSuccess("Ok");
        }
      })
      .catch(function () {
        NotificationManager.error("Помилка сервера");
      });
  };

  render() {
    let Id = this.state.content.id;
    console.log(Id);

    return (
      <div>
        {this.state.images && (
          <Upload
            listType="picture"
            accept="image/png, image/jpeg"
            customRequest={this.handleImages}
            defaultFileList={this.state.images}
            maxCount={this.state.maxNumber}
          >
            <Button icon={<UploadOutlined />}>Добавити</Button>
          </Upload>
        )}
        {Id && <ExtResourcesUpdate contentId={Id} />}
        <div style={{ marginTop: "15px" }}>
          <AddTag Id={this.state.content.id} />
        </div>
        <Button
          type="primary"
          style={{ marginTop: "15px" }}
          onClick={() =>
            (window.location.href =
              "/auth/contents-user/" + this.state.content.user.id)
          }
        >
          Переглянути створений контент
        </Button>
      </div>
    );
  }
}
export default NewGallery;

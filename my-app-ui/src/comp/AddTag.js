import React, { Component, useState } from "react";
import Cookies from "universal-cookie";
import { NotificationManager } from "react-notifications";
import Tag from "antd/es/tag";
import { PlusOutlined } from "@ant-design/icons";
import Input from "antd/es/input";

class AddTag extends Component {
  constructor() {
    super();
    this.state = {
      contentId: 0,
      tagsByContentId: [],
      tags: [],
      suggestions: [],
      inputVisible: false,
    };

    this.removeTag = this.removeTag.bind(this);
    this.inputKeyDown = this.inputKeyDown.bind(this);
  }

  removeTag = (id) => {
    fetch(
      `http://localhost:8080/service-api/tags/remove-from-content/?contentId=${this.props.Id}&tagId=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + new Cookies().get("token"),
        },
      }
    )
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
  };

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (
        this.state.tagsByContentId.find(
          (tag) => tag.label.toLowerCase() === val.toLowerCase()
        )
      ) {
        return;
      }
      if (
        this.state.tags.find(
          (tag) => tag.label.toLowerCase() === val.toLowerCase()
        )
      ) {
        let tag = this.state.tags.find((tag) => {
          return tag.label.toLowerCase() === val.toLowerCase();
        });
        console.log(tag);
        fetch(
          `http://localhost:8080/service-api/tags/to-content/?contentId=${this.props.Id}&tagId=${tag.id}`,
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
              window.location.reload();
            }
          })
          .catch(function () {
            NotificationManager.error("Помилка сервера");
          });
      } else {
        fetch(
          `http://localhost:8080/service-api/tags/new-to-content/?contentId=${this.props.Id}&label=${val}`,
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
              window.location.reload();
            }
          })
          .catch(function () {
            NotificationManager.error("Помилка сервера");
          });
      }
    }
  };

  loadTags() {
    if (this.props.Id && this.props.Id !== this.state.contentId) {
      this.setState({ contentId: this.props.Id });

      let cookie = new Cookies();
      let initialItems1 = [];
      let initialItems2 = [];
      const Id = this.props.Id;
      console.log(Id);
      console.log(this.props);

      Promise.all([
        fetch(`http://localhost:8080/service-api/tags/content/${Id}`),
        fetch(`http://localhost:8080/service-api/tags/`),
      ])
        .then(([res1, res2]) => {
          return Promise.all([res1.json(), res2.json()]);
        })
        .then(([data1, data2]) => {
          initialItems1 = data1.map((Item) => {
            return Item;
          });
          this.setState({ tagsByContentId: initialItems1 });
          console.log(this.state.tagsByContentId);
          initialItems2 = data2.map((Item) => {
            return Item;
          });
          this.setState({ tags: initialItems2 });
          console.log(this.state.tags);
        });
    }
  }

  componentDidMount() {
    this.loadTags();
  }

  componentDidUpdate() {
    this.loadTags();
  }

  showInput = () => {
    this.setState({ inputVisible: true });
  };

  render() {
    return (
      <div className="input-tag">
        {this.state.tagsByContentId.map((tag, index) => (
          <Tag
            key={index}
            closable={true}
            onClose={() => this.removeTag(tag.id)}
          >
            #{tag.label}
          </Tag>
        ))}
        {this.state.inputVisible && (
          <Input
            type="text"
            size="small"
            style={{ width: "78px", marginRight: "8px", verticalAlign: "top" }}
            autoFocus={true}
            onKeyDown={this.inputKeyDown}
            onBlur={() => this.setState({ inputVisible: false })}
          />
        )}
        {!this.state.inputVisible && (
          <Tag
            style={{ background: "#fff", borderStyle: "dashed" }}
            onClick={this.showInput}
          >
            <PlusOutlined /> Новий тег
          </Tag>
        )}
      </div>
    );
  }
}

export default AddTag;

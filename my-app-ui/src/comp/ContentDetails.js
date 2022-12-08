import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Comments from "./Comments";
import Gallery from "./Gallery";
import Tags from "./Tags";
import ContentDelete from "./ContentDelete";
import "./Content.css";
import ExtRes from "./ExtRes";
import { Button, Divider, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import Card from "antd/es/card/Card";
import { CloseOutlined, FolderOpenFilled } from "@ant-design/icons";

class ContentDetails extends Component {
  constructor() {
    super();
    this.state = {
      content: {
        title: "",
        description: "",
        dateTime: "",
        externalResources: {
          twitter: "",
          instagram: "",
        },
        user: {
          userName: "",
        },
        category: {
          name: "",
        },
      },
      user: {
        isAdmin: 0,
      },
    };
  }

  componentDidMount() {
    let cookie = new Cookies();
    let Id = this.props.match.params.Id;
    console.log(Id);

    Promise.all([
      fetch(`http://localhost:8080/service-api/contents/id/${Id}`),
      fetch(`http://localhost:8080/service-api/users/current`, {
        headers: {
          Authorization: "Bearer " + new Cookies().get("token"),
        },
      }),
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([data1, data2]) => {
        this.setState({
          content: data1,
          user: data2,
        });
        console.log(this.state.content);
        console.log(this.state.user);
      });
  }
  render() {
    let Id = this.props.match.params.Id;
    return (
      <Modal
        open={true}
        closeIcon={
          <Link to={"/auth/contents/" + this.state.content.category.name}>
            <CloseOutlined />
          </Link>
        }
        footer={[
          <ContentDelete
            contentId={Id}
            isAdmin={this.state.user.isAdmin}
            catname={this.state.content.category.name}
          />,
        ]}
      >
        <div>
          <Card
            style={{ boxShadow: "none" }}
            bordered={false}
            cover={<Gallery Id={Id} />}
          >
            <Meta
              title={this.state.content.title}
              description={
                <div>
                  <p>{this.state.content.category.name}</p>
                  <p>{this.state.content.description}</p>
                  <p>{this.state.content.dateTime}</p>
                </div>
              }
            />
            <Tags className="tagsInfo" Id={Id} />
            <Divider>Коментарі</Divider>
            <Comments contentId={Id} userId={this.state.content.user.id} />
          </Card>
          <Divider />
          <ExtRes Id={Id} />
        </div>
      </Modal>
    );
  }
}
export default ContentDetails;

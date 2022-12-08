import React, { Component } from "react";
import { NotificationManager } from "react-notifications";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Input from "antd/es/input";
import SocialLink from "./SocialLink";
import { PlusOutlined } from "@ant-design/icons";
import {
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

class ExtResourcesUpdate extends Component {
  constructor() {
    super();
    this.state = {
      content: {},
      id: "",
    };
  }

  componentDidMount() {
    let cookie = new Cookies();
    const Id = this.props.contentId;
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
        this.setState({ content: initialItems });
      });
  }

  render() {
    return (
      <div>
        <SocialLink
          icon={<FaInstagram size="18px" />}
          link={this.state.content?.externalResources?.instagram}
          name="instagram"
          contentId={this.props.contentId}
        />
        <SocialLink
          icon={<FaTwitter size="18px" />}
          link={this.state.content?.externalResources?.twitter}
          name="twitter"
          contentId={this.props.contentId}
        />
        <SocialLink
          icon={<FaTelegram size="18px" />}
          link={this.state.content?.externalResources?.telegram}
          name="telegram"
          contentId={this.props.contentId}
        />
        <SocialLink
          icon={<FaYoutube size="18px" />}
          link={this.state.content?.externalResources?.youtube}
          name="youtube"
          contentId={this.props.contentId}
        />
        <SocialLink
          icon={<FaTiktok size="18px" />}
          link={this.state.content?.externalResources?.tiktok}
          name="tiktok"
          contentId={this.props.contentId}
        />
      </div>
    );
  }
}
export default ExtResourcesUpdate;

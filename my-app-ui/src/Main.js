import { useRouteMatch, Link, Route, Switch, Redirect } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./Main.css";
import React from "react";
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";
import Menu from "antd/es/menu";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CloseOutlined,
  HomeFilled,
} from "@ant-design/icons";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Categories from "comp/Categories";
import { grey } from "@ant-design/colors";
import UserDetails from "comp/UserDetails";
import Contents from "comp/Contents";
import ContentUpdate from "comp/ContentUpdate";
import ExtResourcesUpdate from "comp/ExtResourcesAdd";
import ExtResourcesAdd from "comp/ExtResourcesAdd";
import ContentsByUserId from "comp/ContentsByUserId";
import NewContent from "comp/NewContent";
import NewGallery from "comp/NewGallery";
import ProfileUpdate from "comp/ProfileUpdate";
import ContentDetails from "comp/ContentDetails";

function parseJwt(token) {
  const base64 = token.split(".")[1];
  return JSON.parse(window.atob(base64));
}

function visibleLink(user, name) {
  let userAccess = ["brand", "type", "item", "customer", "order"]; //!
  let adminAccess = ["user", "department"]; //!

  let answer = false;
  if (user.roles === "USER") {
    userAccess.forEach((element) => {
      if (element === name) {
        answer = true;
      }
    });
  } else if (user.roles === "ADMIN") {
    adminAccess.forEach((element) => {
      if (element === name) {
        answer = true;
      }
    });
  }
  return answer;
}

function visiblecolorPick(user, name) {
  let answer = visibleLink(user, name);

  if (answer) {
    return "on";
  }
  return "off";
}

function Main() {
  const [userInfo, setUserInfo] = useState();
  let match = useRouteMatch();

  const history = useHistory();
  const cookies = new Cookies();

  const routeChange = () => {
    const cookies = new Cookies();
    cookies.set("token", " ", { path: "/", maxAge: 0 });
    let path = `/logIn`;
    history.push(path);
    window.location.reload(false);
  };

  if (!cookies.get("token")) {
    return <Redirect to="/logIn" />;
  }
  let user = parseJwt(cookies.get("token"));
  let pr;
  if (user.roles === "USER") {
    pr = "звичайний смертний";
  }
  if (user.roles === "ADMIN") {
    pr = "повелитель системи";
  }

  if (!userInfo) {
    let cookie = new Cookies();
    fetch(`http://localhost:8080/service-api/users/current`, {
      headers: {
        Authorization: "Bearer " + cookie.get("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
      });
  }

  return userInfo ? (
    <Layout>
      <Sider>
        <HomeFilled
          style={{
            fontSize: "24px",
            color: grey[0],
            padding: "24px 24px 16px 24px",
          }}
        />
        <Categories />
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
          }}
        >
          <ul>
            <img
              className="navAvatar"
              src={userInfo.avatarPath}
              alt="Icon of company"
              width="100"
              height="75"
            ></img>
            <Link
              className="toProfile"
              to={`${match.url}/user-details/` + userInfo.id}
            >
              {userInfo.userName}
            </Link>
            <button className="logout" onClick={routeChange}>
              Вийти
            </button>
          </ul>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              minHeight: 360,
            }}
          >
            <Switch>
              <Route
                path={`${match.url}/user-details/:Id`}
                component={UserDetails}
              />
              <Route
                path={`${match.url}/contents/:catname`}
                component={Contents}
              />
              <Route path={`${match.url}/categories/`} component={Categories} />
              <Route
                path={`${match.url}/content-update/:Id`}
                component={ContentUpdate}
              />
              <Route
                path={`${match.url}/ext-resources-update/:Id`}
                component={ExtResourcesUpdate}
              />
              <Route
                path={`${match.url}/add-ext-resources/:Id`}
                component={ExtResourcesAdd}
              />
              <Route
                path={`${match.url}/contents-user/:Id`}
                component={ContentsByUserId}
              />
              <Route
                path={`${match.url}/add-content/:Id`}
                component={NewContent}
              />
              <Route
                path={`${match.url}/add-gallery-content/:title`}
                component={NewGallery}
              />
              <Route
                path={`${match.url}/content/:Id`}
                component={ContentDetails}
              />
              <Route
                path={`${match.url}/profile-update/:Id`}
                component={ProfileUpdate}
              />
            </Switch>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  ) : (
    <div>Loading ...</div>
  );
}
export default Main;

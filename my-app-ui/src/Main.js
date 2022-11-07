import { useRouteMatch, Link, Route, Switch, Redirect } from 'react-router-dom';
import 'react-notifications/lib/notifications.css';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";



function parseJwt(token) {
  const base64 = token.split('.')[1];
  return JSON.parse(window.atob(base64));
}

function visibleLink(user, name) {
  let userAccess = ["brand", "type", "item", "customer", "order"] //!
  let adminAccess = ["user", "department"] //!

  let answer = false;
  if (user.roles === "USER") {
    userAccess.forEach(element => {
      if (element === name) { answer = true; }
    });
  } else if (user.roles === "ADMIN") {
    adminAccess.forEach(element => {
      if (element === name) { answer = true; }
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
  const history = useHistory();
  const cookies = new Cookies();

  const routeChange = () => {
    const cookies = new Cookies();
    cookies.set('token', ' ', { path: '/', maxAge: 0 });
    let path = `/logIn`;
    history.push(path);
    window.location.reload(false);
  }

  if (!cookies.get('token')) {
    return <Redirect to="/logIn" />
  }
  let user = parseJwt(cookies.get('token'));
  let pr;
  if (user.roles === "USER") {
    pr = "звичайний смертний"
  }
  if (user.roles === "ADMIN") {
    pr = "повелитель системи"
  }
  return (
    <div>
      <div className="userInfo">
        Авторизований користувач: {pr} <span className="userInfo">{user.sub}</span>
      </div>
      <button className="logOut" onClick={routeChange}>Вийти з системи</button>
    </div>
  );
} export default Main;

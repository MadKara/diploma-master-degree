import React from 'react';
import {withRouter} from 'react-router';

function UserInfo(props) {
    
    console.log(props);

    return (
        <div>
            <div className="heade">Інформація про користувача {props.userName}</div>
            <img src={props.avatarPath} alt="User's avatar" width="100" height="75"></img>
            <b>Поштова скринька:</b> {props.email} <br />
            <b>Телефон:</b> {props.userName} <br />
            <b>День народження:</b> {props.password} <br />
        </div>
    );
}

export default withRouter(UserInfo);

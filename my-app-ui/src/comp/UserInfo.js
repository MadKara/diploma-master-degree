import React from 'react';
import {withRouter} from 'react-router';

function UserInfo(props) {
    
    console.log(props);

    return (
        <div>
            <div className="heade">Інформація про користувача {props.userName}</div>
            <img src={props.avatarPath} alt="User's avatar" width="100" height="75"></img>
            <b>email:</b> {props.email} <br />
            <b>username:</b> {props.userName} <br />
            <b>pass:</b> {props.password} <br />
        </div>
    );
}

export default withRouter(UserInfo);

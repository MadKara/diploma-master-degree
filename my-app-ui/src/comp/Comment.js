import { Avatar, Divider, List } from "antd";
import Card from "antd/es/card";
import { Content } from "antd/es/layout/layout";
import React from "react";

const Comment = (props) => {
  let item = props.item;

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={item.user.avatarPath} />}
        title={<a href="#">{item.user.userName}</a>}
        description={
          <div>
            <p style={{ margin: 0 }}>{item.message}</p>
            <p style={{ textAlign: "right", fontSize: "9px", margin: 0 }}>
              {item.dateTime}
            </p>
          </div>
        }
      />
    </List.Item>
  );
};

export default Comment;

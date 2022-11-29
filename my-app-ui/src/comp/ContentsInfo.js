import React from "react";
import Gallery from "./Gallery";
import Tags from "./Tags";
import { useRouteMatch, Link, Route, Switch, Redirect, useHistory } from "react-router-dom";
import "./ContentsInfo.css";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";

function ContentsInfo(props) {
  const item = props.item;
  const history = useHistory();

  return (
    <div className="contentInfoCard">
      <Card
        hoverable
        cover={<Gallery Id={item.id} />}
        onClick={() => history.push(`/auth/content/${item.id}`)}
      >
        <Meta title={item.title} description={item.description} />
        <Tags className="tagsInfo" Id={item.id} />
      </Card>
    </div>
  );
}

export default ContentsInfo;

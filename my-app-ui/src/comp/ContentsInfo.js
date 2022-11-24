import React from 'react';
import Content from './Content'
import Gallery from './Gallery';
import Tag from './Tag';
import Tags from './Tags';
import { useRouteMatch, Link, Route, Switch, Redirect } from 'react-router-dom';
import './ContentsInfo.css'

function ContentsInfo(props) {
    const item = props.item;

    return (
        <div className="contentInfoCard">
            {<Gallery Id={item.id} />}
            <h3 className="title">{item.title}</h3>
            <p className="description">{item.description}</p>
            {<Tags className='tagsInfo' Id={item.id} />}
            <Link className='linkInfo' to={"/auth/content/" + item.id} >більше</Link>
        </div>
    );
}

export default ContentsInfo;

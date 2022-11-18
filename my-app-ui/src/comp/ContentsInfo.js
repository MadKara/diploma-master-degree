import React from 'react';
import Content from './Content'
import Gallery from './Gallery';
import Tag from './Tag';
import Tags from './Tags';
import { useRouteMatch, Link, Route, Switch, Redirect } from 'react-router-dom';

function ContentsInfo(props) {
    const item = props.item;

    return (
        <tr className="company">
            <td>{<Gallery Id={item.id} />}</td>
            <td><div className="des">{item.title}</div></td>
            <td><div className="des">{item.description}</div></td>
            <td>{<Tags Id={item.id} />}</td>
            <td><button>show more</button></td>
            <td><Link to={"/auth/content/" + item.id} >see more</Link></td>
        </tr>
    );
}

export default ContentsInfo;

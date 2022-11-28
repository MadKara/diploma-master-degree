import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ExtRes from './ExtRes';
import Gallery from './Gallery';
import Tags from './Tags';

function ContentEditor(props) {
    const item = props.item;

    return (
        <tr>
            <td>{props.key2} </td>
            <td>
                {<Gallery Id={item.id} />}
            </td>
            <td><div>{item.title}</div></td>
            <td><div>{item.description}</div></td>
            <td><div>{item.dateTime}</div></td>
            <td>
                {<ExtRes Id={item.id} />}
            </td>
            <td>
                {<Tags Id={item.id} />}
            </td>
            <td><button><Link to={"/auth/content-update/" + item.id} >Редагувати</Link></button></td>
            <td><button onClick={() => deleteElem(item.id, item.title)}>Видалити</button></td>
        </tr>
    );
}

let deleteElem = (id, title) => {
    let cookie = new Cookies();

    let answer = window.confirm("Видалити " + title + " ?")

    if (answer) {
        fetch(`http://localhost:8080/service-api/contents/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + cookie.get('token')
            }
        }).then(function (response) {
            if (response.status === 500) {
                NotificationManager.error('Помилка сервера');
            }
            if (response.status === 200) {
                window.location.reload();
            }
        }).catch(function (error) {
            NotificationManager.error('Помилка сервера');
        });
    }
}

export default ContentEditor;

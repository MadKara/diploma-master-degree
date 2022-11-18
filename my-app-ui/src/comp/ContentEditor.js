import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Gallery from './Gallery';
import Tags from './Tags';
// import './Company.css'

function ContentEditor(props) {
    const item = props.item;
    
    return (
        <tr className= "company">
            <td>{props.key2} </td>
            <td>
                {<Gallery Id={item.id} />}
            </td>
            {/* <td><img src={item.logoPath} alt="Icon of item" width="100" height="75"></img></td> */}
            <td><div className="des">{item.title}</div></td>
            <td><div className="des">{item.description}</div></td>
            <td><div className="des">{item.dateTime}</div></td>
            <td><ul>
                <li>{item.externalResources.twitter}</li>
                <li>{item.externalResources.instagram}</li>
            </ul></td>
            <td>
                {<Tags Id={item.id} />}
            </td>
            <td><div className="des">{item.user.userName}</div></td>
            <td><button><Link to={"/auth/content-update/"+item.id} >Edit</Link></button></td>
            <td><button className="t" onClick={() => deleteElem(item.id, item.title)}>Delete</button></td>
            {/* <td><Link className="updateLink" to ={"/auth/company-update/" + item.id}>Змінити</Link></td> */}
            
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
 
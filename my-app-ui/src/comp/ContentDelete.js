import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Gallery from './Gallery';
import Tags from './Tags';
// import './Company.css'

function ContentDelete(props) {

    if (props.isAdmin === 1) {
        return (
            <tr className="company">
                <td><button onClick={() => deleteElem(props.contentId, props.catname, props)}>Delete</button></td>
                {/* <td><Link className="updateLink" to ={"/auth/company-update/" + item.id}>Змінити</Link></td> */}
            </tr>
        );
    } else {
        return (
            <div></div>
        )
    }
}

let deleteElem = (id, catname, props) => {
    let cookie = new Cookies();

    let answer = window.confirm("Видалити ?")

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
        // props.history.push('/auth');
        // <Link to={"/auth/contents/" + catname}/>
    }

}

export default ContentDelete;

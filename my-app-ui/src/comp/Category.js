import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Categories.css'

function Category(props) {
    const item = props.item;
    
    return (
        // <tr className= "company">
           <Link id='navItems' to={"/auth/contents/"+item.name} onClick={() => window.location.href="/auth/contents/"+item.name} >{item.name}</Link>
            
        // </tr>
    );
}

// let deleteElem = (id, name) => {
//     let cookie = new Cookies();

//     let answer = window.confirm("Ви видаляєте компанію " + name +
//         "\nВидалення компанії може спричинити також видалення працівнників та адміністраторів відповідної компанії.")

//     if (answer) {
//         fetch(`http://localhost:8080/service-api/companies/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 "Authorization": "Bearer " + cookie.get('token')
//             }
//         }).then(function (response) {
//             if (response.status === 500) {
//                 NotificationManager.error('Помилка сервера');
//             }
//             if (response.status === 200) {
//                 window.location.reload();
//             }
//         }).catch(function (error) {
//             NotificationManager.error('Помилка сервера');
//         });
//     }
// }

export default Category;
 
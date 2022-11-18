import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import './Company.css'

function Category(props) {
    const item = props.item;
    
    return (
        <tr className= "company">
            <td>{props.key2} </td>
            {/* <td><img src={item.logoPath} alt="Icon of item" width="100" height="75"></img></td> */}
            {/* <td><a className="des" href={'http://localhost:8080/service-api/contents/?categoryName=' + this.props.category.name}>{item.name}</a></td> */}
            {/* <td><button className="t" onClick={() => deleteElem(item.id, item.name)}><img src="https://res.cloudinary.com/elatof/image/upload/v1667146600/treatment-weather/delete_xc0dvw.png" alt="Login logo" width="20" height="20"></img></button></td> */}
            <td><Link to={"/auth/contents/"+item.name} onClick={() => window.location.href="/auth/contents/"+item.name} >{item.name}</Link></td>
            
        </tr>
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
 
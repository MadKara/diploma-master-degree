import React from 'react';
import { useState, useEffect  } from 'react';
import Modal from 'react-modal';
import Gallery from './Gallery';
import Tag from './Tag';
import Tags from './Tags';
import axios from 'axios';
import { useRouteMatch, Link, Route, Switch, Redirect } from 'react-router-dom';


function Content(props) {
    const initialData = {
        title: '',
        description: '',
        dateTime: '',
        externalResources: {
            twitter: '',
            instagram: ''
        },
        user: {
            userName: ''
        },
        category: {
            name: ''
        }
    }
    const item = props.item;
    const [showModal, setShowModal] = useState(true);
    const [data, setData] = useState(initialData);
    // setData({initialData})

    useEffect(() => {
        let Id = props.match.params.Id
        console.log(Id)
        const fetchData = async () => {
          const result = await axios(
            `http://localhost:8080/service-api/contents/id/${Id}`,
          );
    
          setData(result.data);
        };
    
        fetchData();
        // console.log(data)
      }, []);

    return (
        <Modal
        isOpen={showModal}>
            <tr className="company">
                <td>More inf</td>
                <td>{<Gallery Id={props.match.params.Id} />}</td>
                <td><div className="des">{data.title}</div></td>
                <td><div className="des">{data.description}</div></td>
                <td><div className="des">{data.dateTime}</div></td>
                <td><ul>
                    <li>{data.externalResources.twitter}</li>
                    <li>{data.externalResources.instagram}</li>
                </ul></td>
                <td><div className="des">{data.user.userName}</div></td>
                <td>{<Tags Id={props.match.params.Id} />}</td>
                <td><Link to={"/auth/contents/" + data.category.name}>close</Link></td>
            </tr>
        </Modal>
    );
}

export default Content;

import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css'

function Category(props) {
    const item = props.item;
    
    return (
           <Link id='navItems' to={"/auth/contents/"+item.name} onClick={() => window.location.href="/auth/contents/"+item.name} >{item.name}</Link>
    );
}

export default Category;
 
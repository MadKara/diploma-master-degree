import React from "react";

const Tag = (props) => {
  let item = props.item;
  console.log("tag-editor")
  console.log(item.label)

  return (
    <li>
      <span className="text">{item.label}</span>
      <span className="text">&times;</span>
      <span className="close" onClick={item.removeTag}>&times;</span>
    </li>
  );
};

export default Tag;
import React from "react";

const Tag = (props) => {
  let item = props.item;
  // console.log("tag")
  // console.log(item)

  return (
      <span className="tagsInfo">#{item.label}</span>
  );
};

export default Tag;
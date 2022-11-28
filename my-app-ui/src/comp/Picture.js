import React from "react";

const Picture = (props) => {
  let item = props.item;

  return (
    <div>
      <img src={item.imgPath} width="100" alt="imgPath" />
    </div>
  );
};

export default Picture;
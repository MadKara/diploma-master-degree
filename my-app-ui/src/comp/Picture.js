import React from "react";

const Picture = (props) => {
  let item = props.item;
  // console.log(item)

  return (
    <section>
      <img src={item.imgPath} width="100" alt="imgPath" />
    </section>
  );
};

export default Picture;
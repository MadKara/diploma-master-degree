import React from "react";

const Picture = (props) => {
  let item = props.item;
  // console.log(item)

  return (
    <div>
      {/* <div class="numberOgImgInfo">{item.key} / 3</div> */}
      <img src={item.imgPath} width="100" alt="imgPath" />
      {/* <div class="imgInfoCaption">Gallery</div> */}
    </div>
  );
};

export default Picture;
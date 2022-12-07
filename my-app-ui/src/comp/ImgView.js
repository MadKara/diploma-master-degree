import { Empty } from "antd";
import React from "react";
import { useState } from "react";
import "./ImgView.css";

const styles = {};

export default function ImgView(props) {
  let images = props.item.map((item) => item.imgPath);

  console.log(images);
  return (
    <ViewCart
      height={props.height ?? 200}
      cart={[
        {
          id: 1,
          gallery: images,
        },
      ]}
    />
  );
}

const ViewCart = ({ cart, height }) => {
  const [indexes, setIndexes] = useState({});

  const nextSlide = (item) => {
    const curIndex = indexes[item.id] || 0;
    const newIndex = curIndex === item.gallery.length - 1 ? 0 : curIndex + 1;
    setIndexes({ ...indexes, [item.id]: newIndex });
  };
  const prevSlide = (item) => {
    const curIndex = indexes[item.id] || 0;
    const newIndex = curIndex === 0 ? item.gallery.length - 1 : curIndex - 1;
    setIndexes({ ...indexes, [item.id]: newIndex });
  };

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id} className="slideshow-container fade">
          <div className="img-wrap" style={{ height: `${height}px` }}>
            <a className="prev" onClick={() => prevSlide(item)}>
              &#10094;
            </a>
            <a className="next" onClick={() => nextSlide(item)}>
              &#10095;
            </a>
            {item.gallery.length > 0 ? (
              <img
                src={item.gallery[indexes[item.id] || 0]}
                width="100%"
                alt="imgCardInfo"
              />
            ) : (
              <Empty style={{ height: `${height}px`, width: `${height}px` }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

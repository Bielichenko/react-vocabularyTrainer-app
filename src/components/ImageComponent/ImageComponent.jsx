import React from 'react';
import { useSelector } from 'react-redux';

export const ImageComponent = () => {
  const { image } = useSelector(state => state.imageReducer);

  return (
    image
      ? (
        <div className="app__imgContainer imgContainer">
          <img
            className="imgContainer__image"
            src={image.message}
            alt="dogImg"
          />
        </div>

      )
      : (
        <div className="app__imgContainer imgContainer">
          <img
            className="imgContainer__image"
            src="default-image.jpg"
            alt="defaultImg"
          />
        </div>
      )
  );
};

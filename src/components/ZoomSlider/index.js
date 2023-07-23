import React from "react";
import PropTypes from "prop-types";
import SliderImage from "react-zoom-slider";
import EmptyImage from "assets/images/empty.jpg";

const data = [
  {
    image: EmptyImage,
  },
];

const ZoomSlider = ({ images }) => {
  return (
    <SliderImage
      data={(images.length !== 0 && images) || data}
      width="500px"
      height="500px"
      direction="right"
    />
  );
};

ZoomSlider.propTypes = {
  images: PropTypes.array,
};

export default ZoomSlider;

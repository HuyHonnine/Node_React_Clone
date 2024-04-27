import React, { memo } from "react";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SliderImg = ({ images }) => {
  return (
    <>
      <Slider {...settings}>
        {images?.length > 0 &&
          images?.map((item, index) => {
            return (
              <div className="w-full h-[18rem] bg-black ">
                <img
                  key={index}
                  className="object-contain m-auto h-full"
                  src={item}
                  alt="slider"
                />
              </div>
            );
          })}
      </Slider>
    </>
  );
};

export default memo(SliderImg);

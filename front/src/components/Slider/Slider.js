import React, { useEffect, useState } from "react";
import "./slider.scss";
import { sliderImg } from "../../data";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let interval;
  let count = 0;
  useEffect(() => {
    interval = setInterval(() => {
      count = (count + 1) % sliderImg.length;
      setCurrentIndex(count);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="slider">
      <img src={sliderImg[currentIndex].img} alt="/" />
      <div className="slider-desc">
        <h4>Tracking Item</h4>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          ex.
        </h2>
        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default Slider;

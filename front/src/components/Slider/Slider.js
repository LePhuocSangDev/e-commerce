import React, { useEffect, useRef, useState } from "react";
import "./slider.scss";
import { sliderImg } from "../../data";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let interval;
  let countRef = useRef(0);
  let count = countRef.current;
  useEffect(() => {
    interval = setInterval(() => {
      count = (count + 1) % sliderImg.length;
      setCurrentIndex(count);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleSlider = (e) => {
    setCurrentIndex(e.target.value);
  };
  return (
    <div className="slider">
      <img src={sliderImg[currentIndex].img} alt="/" />
      <div className="slider-desc">
        <button value="0" onClick={handleSlider}></button>
        <button value="1" onClick={handleSlider}></button>
        <button value="2" onClick={handleSlider}></button>
        <button value="3" onClick={handleSlider}></button>
      </div>
    </div>
  );
};

export default Slider;

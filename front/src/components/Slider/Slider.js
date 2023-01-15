import React, { useEffect, useRef, useState } from 'react';
import './slider.scss';
import { sliderImg } from '../../data';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Slider = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // let interval;
  // let countRef = useRef(0);
  // let count = countRef.current;
  // useEffect(() => {
  //   interval = setInterval(() => {
  //     count = (count + 1) % sliderImg.length;
  //     setCurrentIndex(count);
  //   }, 5000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  // const handleSlider = (e) => {
  //   setCurrentIndex(e.target.value);
  // };
  const [currentIndex, setCurrentIndex] = useState(0);
  const countRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    countRef.current = currentIndex;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % sliderImg.length);
    }, 5000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const handleSlider = (e) => {
    setCurrentIndex(e.target.value);
  };

  return (
    <div className="slider">
      <LazyLoadImage
        alt="banner images"
        effect="blur"
        width="100%"
        height="100%"
        src={sliderImg[currentIndex].img}
      />
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

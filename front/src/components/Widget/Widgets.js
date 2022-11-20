import React from "react";
import { Link } from "react-router-dom";
import "../Widget/widget.scss";
import img from "../../asset/img/HomePage-Img/2.jpg";

const Widgets = ({ size }) => {
  return (
    <div className="widgets">
      <div className={`widget`}>
        <div className="widget-img__container">
          <img alt="/" src={`${size ? img : img}`} />
        </div>
        <div className="widget-desc">
          <h4>Top Rated</h4>
          <h2>Shop For Home Decore's</h2>
          <Link to="/products">Shop Now</Link>
        </div>
      </div>

      <div className={`widget`}>
        <div className="widget-img__container">
          <img alt="/" src={`${size ? img : img}`} />
        </div>
        <div className="widget-desc">
          <h4>Top Rated</h4>
          <h2>Shop For Home Decore's</h2>
          <Link to="/products">Shop Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Widgets;

import React from "react";
import { Link } from "react-router-dom";
import "../Widget/widget.scss";
import img from "../../asset/img/HomePage-Img/shoe1.jpg";
import shoe2 from "../../asset/img/HomePage-Img/shoe2.jpg";
import shoe3 from "../../asset/img/HomePage-Img/shoe3.jpg";
import shoe4 from "../../asset/img/HomePage-Img/shoe4.jpg";

const Widgets = ({ size }) => {
  return (
    <div className="widgets">
      <div className={`widget`}>
        <div className="widget-img__container">
          <img alt="/" src={`${size ? img : shoe2}`} />
        </div>
        <div className="widget-desc">
          <h4>Bán Chạy Nhất</h4>
          <h2>Nike Air Jordan</h2>
          <Link to="/products">Mua ngay</Link>
        </div>
      </div>

      <div className={`widget`}>
        <div className="widget-img__container">
          <img alt="/" src={`${size ? shoe3 : shoe4}`} />
        </div>
        <div className="widget-desc">
          <h4>Giày Mới</h4>
          <h2>Adidas superstar</h2>
          <Link to="/products">Mua ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Widgets;

import React from "react";
import "../Widget/widget.scss";

const Widgets = ({ size }) => {
  return (
    <div className="widgets">
      <div className={`widget ${size && "sm"}`}>
        <div className="widget-desc">
          <h4>Top Rated</h4>
          <h2>Shop For Home Decore's</h2>
          <button>Shop Now</button>
        </div>
      </div>
      <div className={`widget ${size && "sm"}`}>
        <div className="widget-desc">
          <h4>Top Rated</h4>
          <h2>Shop For Home Decore's</h2>
          <button>Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default Widgets;

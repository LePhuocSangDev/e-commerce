import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./productsRow.scss";
import { Link } from "react-router-dom";
import { categories } from "../../data";

const ProductsRow = ({ title, type, products }) => {
  const productsRender = [...products].splice(0, 8);

  return (
    <>
      {type ? (
        <div className="products__container">
          <h2>{title}</h2>
          <div className="categories">
            {categories.map((c) => (
              <div className="category">
                <Link to={`/products/${c.name}`} key={c.name}>
                  <img src={c.img} alt="/" />

                  <p>{c.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="products__container">
          <h2>{title}</h2>
          <div className="cards">
            {productsRender.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
          <div className="cards-btn">
            <Link to="/products/shoe">Xem Them</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsRow;

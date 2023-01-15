import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './productsRow.scss';
import { Link } from 'react-router-dom';
import { categories } from '../../data';

const ProductsRow = ({ title, type, products }) => {
  const productsRender = [...products].splice(0, 10);

  return (
    <>
      {type ? (
        <div className="products__container">
          <h2 className="categories__heading">{title}</h2>
          <div className="categories">
            {categories.map((c) => (
              <div className="category" key={c.name}>
                <Link
                  to={`/products/${c.name.toLowerCase().split(' ').join('')}`} // To make words like "Best seller" become "bestseller"
                >
                  <img src={c.img} alt="/" loading="lazy" width="100%" height="100%" />

                  <p>{c.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="products__container">
          <div className="products__heading">
            <h2>{title}</h2>
            <Link to="/products">Xem tất cả &#62;&#62; </Link>
          </div>
          <div className="cards">
            {productsRender.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsRow;

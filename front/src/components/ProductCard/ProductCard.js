import React from 'react';
import './productCard.scss';
import { useDispatch } from 'react-redux';
import { addProduct, getTotal } from '../../features/cartSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch(addProduct(product));
    dispatch(getTotal());
    toast.success('Thêm vào giỏ hàng thành công!', { toastId: 'toast-add' });
  };
  return (
    <div className="product-card">
      <div className="product__img">
        <span className="sale">-17%</span>
        <Link to={`/product/${product._id}`} aria-label="product image">
          {/* <LazyLoadImage src={product.img.url} alt="shoes image" effect="blur"></LazyLoadImage> */}
          <LazyLoadImage
            alt="shoes image"
            effect="blur"
            width="100%"
            height="100%"
            src={product.img.url}
          />
          {/* <img src={product.img.url} alt="loading error" /> */}
        </Link>

        <div className="product__icons">
          <Link to={`/product/${product._id}`} aria-label="product image">
            XEM NHANH
          </Link>
        </div>
      </div>
      <div className="product__details">
        <Link to={`/product/${product._id}`}>{product.title}</Link>
        <p>
          {product.price.toLocaleString('vi-VN')} <span>đ</span>
        </p>
        <button onClick={handleAddProduct}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};

export default ProductCard;

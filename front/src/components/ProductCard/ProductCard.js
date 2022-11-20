import React from "react";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import "./productCard.scss";
import { useDispatch } from "react-redux";
import { addProduct, getTotal } from "../../features/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    dispatch(addProduct(product));
    dispatch(getTotal());
    toast.success("Thêm vào giỏ hàng thành công!", { toastId: "toast-add" });
  };
  return (
    <div className="product-card">
      <div className="product__img">
        <span className="sale">-17%</span>
        <Link to={`/product/${product._id}`}>
          <img src={product.img.url} alt="loading error" />
        </Link>

        <div className="product__icons">
          <Link to={`/product/${product._id}`}>QUICK VIEW</Link>
        </div>
      </div>
      <div className="product__details">
        <Link to={`/product/${product._id}`}>{product.title}</Link>
        <p>
          {product.price.toLocaleString("vi-VN")} <span>đ</span>
        </p>
        <button onClick={handleAddProduct}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};

export default ProductCard;

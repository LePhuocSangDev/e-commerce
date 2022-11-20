import React, { useEffect, useState } from "react";
import "./product.scss";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../../axios";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, getTotal, selectCart } from "../../features/cartSlice";
import { toast } from "react-toastify";
import { AiOutlineCheck } from "react-icons/ai";
import "../ProductList/productList.scss";

const Product = () => {
  const { products } = useSelector(selectCart);
  console.log(products);
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const id = path.split("/")[2];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await publicRequest.get(`/products/find/${id}`);
      setProduct(res.data);
    };
    fetchData();
  }, [id]);

  const handleIncQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecQuantity = () => {
    quantity > 1 && setQuantity((prev) => prev - 1);
  };
  const handleAddProduct = () => {
    dispatch(addProduct(orderProduct));
    dispatch(getTotal());
    toast.success("Add product successfully!", { toastId: "toast-add" });
  };
  const orderProduct = {
    ...product,
    size: size,
    color: color,
    productQuantity: quantity,
  };

  return (
    <div className="product__container">
      <div className="product__img">
        <img className="product__img-lg" src={product.img?.url} alt="/" />
        <div className="product__img-container">
          <img
            className="product__img-sm"
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/run-on-shoes-1637184473.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
            alt=""
          />
          <img
            className="product__img-sm"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScmSzU9npO974AseWYsWcqeiue185s36lX1amr_LmFpv1fMAEapmv3mHapXm8wyuK6ftQ&usqp=CAU"
            alt=""
          />
        </div>
        <div className="product__img-desc">
          <h4>Mô tả sản phẩm</h4>
          <p>{product.desc}</p>
        </div>
      </div>
      <div className="product__wrapper">
        <div className="product">
          <h2 className="product__title">{product.title}</h2>
          <p className="product__price">
            {(product.price * quantity).toLocaleString("vi-VN")} <span>đ</span>
          </p>
          <div className="product__detail">
            <p className="product__detail-name">Size:</p>
            <select
              onChange={(e) => setSize(e.target.value)}
              value={size}
              style={{ width: "100%", padding: "8px" }}
              defaultvalues={size}
              name="Size"
              id=""
            >
              {product.size?.map((s) => (
                <option key={s}>{s.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div className="product__detail">
            <p className="product__detail-name">
              Color: {color.toUpperCase() || <span>Vui lòng chọn màu!</span>}
            </p>
            <div className="product__detail-color-wrapper">
              {product.color?.map((c) => (
                <label key={c} className="filter-type__colors-wrapper">
                  <input
                    type="radio"
                    name="color"
                    defaultChecked={color}
                    value={c}
                    id={c}
                    onChange={(e) => {
                      e.target.checked && setColor(e.target.value);
                    }}
                  />
                  <span
                    className="checkmark"
                    style={{
                      backgroundColor: c,
                      border: "1px solid black",
                    }}
                  >
                    <span
                      className="checkmark-checked"
                      style={{
                        color: `${c === "white" ? "black" : "white"}`,
                      }}
                    >
                      <AiOutlineCheck />
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="product__detail">
            <p className="product__detail-name">Số lượng:</p>
            <div className="product__detail-input">
              <button onClick={handleDecQuantity}>-</button>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="text"
              />
              <button onClick={handleIncQuantity}>+</button>
            </div>
          </div>
          <button
            className="product__button"
            disabled={color === "" ? true : false}
            onClick={handleAddProduct}
          >
            Thêm vào giỏ hàng
          </button>
          <Link
            to="/cart"
            onClick={handleAddProduct}
            className="product__button bg-black"
          >
            Mua ngay
          </Link>
          <div className="product__desc">
            <div className="product__desc-title">
              <h4>RETURN AND POLICY</h4>
              <span>+</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
              officia architecto nisi quas beatae ullam officiis nostrum.
              Pariatur, laboriosam eius!
            </p>
          </div>
          <div className="product__desc">
            <div className="product__desc-title">
              <h4>RETURN AND POLICY</h4>
              <span>+</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui,
              officia architecto nisi quas beatae ullam officiis nostrum.
              Pariatur, laboriosam eius!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

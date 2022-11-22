import React, { useEffect, useState } from "react";
import "./cartPage.scss";
import { BiNotepad } from "react-icons/bi";
import { RiCouponLine } from "react-icons/ri";
import { TbLock } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCartItem,
  decQuantity,
  getTotal,
  incQuantity,
  selectCart,
} from "../../features/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const { products: cartItems } = useSelector(selectCart);
  const { total } = useSelector(selectCart);
  const [showEnterCoupon, setShowEnterCoupon] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const handleIncQuantity = (id) => {
    dispatch(incQuantity(id));
    dispatch(getTotal());
  };
  const handleDecQuantity = (id) => {
    dispatch(decQuantity(id));
    dispatch(getTotal());
  };
  const handleRenderValue = (value) => {
    if (typeof value === "object") {
      return (
        <select className="cart-page__product-size" onChange={() => {}}>
          {value.map((v) => (
            <option key={v} className="product-size__option" value={v}>
              {v}
            </option>
          ))}
        </select>
      );
    } else return <span>{value}</span>;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cart-page">
      <div className="cart-page__detail">
        <h4 className="cart-page__title">Giỏ hàng của tôi</h4>
        <div className="cart-page__products">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-page__product">
              <div className="cart-page__product-container">
                <img src={item.img.url} alt="" />
                <div className="cart-page__product-desc">
                  <Link className="product-heading" to={`/product/${item._id}`}>
                    {item.title}
                  </Link>
                  <p className="product-price">
                    {item.price.toLocaleString("vi-VN")} <span>đ</span>
                  </p>
                  <p>
                    Size:
                    {handleRenderValue(item.size)}
                  </p>
                  <p>
                    Color:
                    {handleRenderValue(item.color)}
                  </p>
                </div>
              </div>
              <div className="cart-page__product-input">
                <div className="input-quantity">
                  <button
                    onClick={() => handleDecQuantity(item)}
                    className="input-quantity__down"
                  >
                    -
                  </button>
                  <span>{item.productQuantity}</span>
                  <button
                    onClick={() => handleIncQuantity(item)}
                    className="input-quantity__up"
                  >
                    +
                  </button>
                </div>
                <span>
                  {(item.price * item.productQuantity).toLocaleString("vi-VN")}
                  <span className="currency">đ</span>
                </span>
                <button
                  onClick={() => dispatch(clearCartItem(item))}
                  className="input-quantity__close"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowEnterCoupon((prev) => !prev)}
          className="cart-page__more-info"
        >
          <i>
            <RiCouponLine />
          </i>
          Nhập mã khuyến mãi
        </button>
        {showEnterCoupon && (
          <div className="cart-page__summary-coupon">
            <input
              type="text"
              className="coupon-input"
              placeholder="Please Enter your coupon"
            />
            <button className="coupon-button">Nhập</button>
          </div>
        )}
        <button
          onClick={() => setShowNote((prev) => !prev)}
          className="cart-page__more-info"
        >
          <i>
            <BiNotepad />
          </i>
          Thêm ghi chú
        </button>
        {showNote && <textarea rows={4} className="text-note" />}
      </div>
      <div className="cart-page__summary">
        <h4 className="cart-page__title">Tóm tắt đơn hàng</h4>
        <div className="cart-page__summary-detail">
          <p>
            Phí ban đầu:
            <span>
              {total} <span>đ</span>
            </span>
          </p>
          <p>
            Phí vận chuyển:
            <span>Miễn phí</span>
          </p>
          <p className="country">VietNam</p>
        </div>
        <p className="cart-page__summary-total">
          Tổng phí:
          <span>
            {total} <span>đ</span>
          </span>
        </p>
        <div className="cart-page__summary-checkout">
          <Link to="/checkout">Thanh toán</Link>
          <p>
            <i>
              <TbLock />
            </i>
            Thanh toán an toàn
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

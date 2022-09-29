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
  updateCart,
} from "../../features/cartSlice";
import { Link } from "react-router-dom";
import { deleteCart } from "../../features/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { products: cartItems } = useSelector(selectCart);
  const { total } = useSelector(selectCart);

  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  const handleIncQuantity = (id) => {
    dispatch(incQuantity(id));
    dispatch(getTotal());
  };
  const handleDecQuantity = (id) => {
    dispatch(decQuantity(id));
    dispatch(getTotal());
  };
  const handleRenderValue = (value) => {
    // const handleUpdateColor = (e, item) => {
    //   setNewColor(e.target.value);
    //   dispatch(updateCart(item._id, newColor));
    // };
    // const handleUpdateSize = (e, item) => {
    //   setNewSize(e.target.value);
    //   dispatch(updateCart(item._id, newSize));
    // };
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
        <h4 className="cart-page__title">My Cart</h4>
        <div className="cart-page__products">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-page__product">
              <div className="cart-page__product-container">
                <img src={item.img.url} alt="" />
                <div className="cart-page__product-desc">
                  <h4>{item.title}</h4>
                  <p className="product-price">{item.price}d</p>
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
                <span>{item.price * item.productQuantity}$</span>
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
        <p className="cart-page__more-info">
          <i>
            <RiCouponLine />
          </i>
          Enter a promote code
        </p>
        <p className="cart-page__more-info">
          <i>
            <BiNotepad />
          </i>
          Add a note
        </p>
      </div>
      <div className="cart-page__summary">
        <h4 className="cart-page__title">Order summary</h4>
        <div className="cart-page__summary-detail">
          <p>
            Subtotal
            <span>{total}</span>
          </p>
          <p>
            Shipping
            <span>Free</span>
          </p>
          <p className="country">VietNam</p>
        </div>
        <p className="cart-page__summary-total">
          Total
          <span>{total} $</span>
        </p>
        <div className="cart-page__summary-checkout">
          <Link to="/checkout">Checkout</Link>
          <p>
            <i>
              <TbLock />
            </i>
            Secure Checkout
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

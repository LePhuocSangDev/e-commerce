import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import logo from "../../asset/img/logo.PNG";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiFillInstagram,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdDarkMode } from "react-icons/md";
import { FaGreaterThan } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { dark, selectTheme, light } from "../../features/themeSlice";
import { clearCartItem, getTotal, selectCart } from "../../features/cartSlice";
import { logout } from "../../features/apiCall";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const { userInfo } = useSelector(selectUser);
  const total = useSelector((state) => state.cart.total);
  const { products: cartItems } = useSelector(selectCart);
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const [closeCart, setCloseCart] = useState(true);
  const handleClick = () => {
    theme === "light" ? dispatch(dark()) : dispatch(light());
  };
  const handleLogout = () => {
    logout(dispatch);
    setShowUserOptions(false);
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [total]);

  return (
    <div className="nav">
      <div className="subnav">
        <div className="icons">
          <i>
            <AiFillFacebook />
          </i>
          <i>
            <AiFillLinkedin />
          </i>
          <i>
            <AiOutlineTwitter />
          </i>
          <i>
            <AiFillInstagram />
          </i>
        </div>
        <ul>
          <li>
            <button onClick={handleClick}>
              {theme === "light" ? <MdDarkMode /> : <BsSun />}
            </button>
          </li>
          <li>
            <a href="">Coupon</a>
          </li>
          <li>
            <a href="">Sản phẩm hôm nay</a>
          </li>
          <li>
            <Link to="/profile" href="">
              Trang của tôi
            </Link>
          </li>
        </ul>
      </div>
      <div className="main-nav">
        <button
          onClick={() => {
            setShowMenu(true);
          }}
          className="mobile-menu__icon"
        >
          <i>
            <AiOutlineMenu />
          </i>
        </button>

        <div className="logo">
          <Link to="/"></Link>
        </div>
        <ul className="menu">
          <li>
            <Link to="/" href="">
              Hàng mới
            </Link>
          </li>
          <li>
            <Link to="/" href="">
              Giày nam
            </Link>
          </li>
          <li>
            <Link to="/" href="">
              Giày nữ
            </Link>
          </li>
          <li>
            <Link to="/" href="">
              Khuyến mãi
            </Link>
          </li>
        </ul>
        {/* mobile */}
        {/* {showMenu && (
          <ul className="menu">
            <button
              onClick={() => setShowMenu(false)}
              className="mobile-menu__close"
            >
              X
            </button>
            <li>
              <Link to="/" href="">
                Trang Chủ
              </Link>
            </li>
            <li>
              <Link to="/" href="">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/" href="">
                Về Chúng Tôi
              </Link>
            </li>
            <li>
              <Link to="/" href="">
                Liên Hệ
              </Link>
            </li>
            <li>
              <Link to="/" href="">
                Mạng Xã Hội
              </Link>
            </li>
          </ul>
        )} */}
        <div className="cart-search">
          <div className="user-options">
            {userInfo ? (
              <button
                onClick={() => setShowUserOptions((prev) => !prev)}
                className="user-options__avatar"
              >
                <i>
                  <CgProfile />
                </i>
                {userInfo.username}
              </button>
            ) : (
              <Link to="/login" className="user-options__avatar">
                <i>
                  <CgProfile />
                </i>
                Log in
              </Link>
            )}

            {showUserOptions && (
              <ul className="user-options__list">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Log out</a>
                </li>
              </ul>
            )}
          </div>

          <Link onClick={() => setCloseCart(false)} to="#">
            <i>
              <AiOutlineShoppingCart />
            </i>
            {cartItems.length > 0 && <span>{cartItems.length}</span>}
          </Link>
          <Link to="/search" className="cart-search__avatar">
            <i>
              <AiOutlineSearch />
            </i>
          </Link>
        </div>
      </div>
      <div className="bottom-nav">
        <Link to="/">Trang Chủ </Link>
        <i>
          <FaGreaterThan />
        </i>
        <Link to="/">Shop</Link>
        <i>
          <FaGreaterThan />
        </i>
        <Link to="/">Address</Link>
      </div>
      {closeCart || (
        <div className="cart">
          <p className="cart__header">
            <i onClick={() => setCloseCart(true)}>
              <FaGreaterThan />
            </i>
            Cart
          </p>
          <div className="cart__items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart__item">
                <img src={item.img.url} alt="" />
                <div className="cart__item-info">
                  <h4 className="cart__item-title">{item.title}</h4>
                  <p className="cart__item-price">
                    {item.price * item.productQuantity}d
                  </p>
                  <p className="cart__item-quantity">
                    Quantity: {item.productQuantity}
                  </p>
                </div>

                <button onClick={() => dispatch(clearCartItem(item))}>X</button>
              </div>
            ))}
          </div>
          <div className="cart__item-total">
            <h4>Subtotal:</h4>
            <p>{total}</p>
          </div>
          <div className="cart__item-button">
            <Link onClick={() => setCloseCart(true)} to="/cart">
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import "./Navbar.scss";
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
import { Link, NavLink } from "react-router-dom";
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
  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
    setShowUserOptions(false);
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [total, dispatch]);

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
            <a href="/">Coupon</a>
          </li>
          <li>
            <a href="/products">S???n ph???m h??m nay</a>
          </li>
          <li>
            <Link to="/profile" href="">
              Trang c???a t??i
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
            <NavLink
              className={({ isActive }) => (isActive ? "nav-active" : "")}
              to="/"
              href=""
            >
              Trang ch???
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "nav-active" : "")}
              to="/products/new"
              href=""
            >
              H??ng m???i
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "nav-active" : "")}
              to="/products/men"
              href=""
            >
              Gi??y nam
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "nav-active" : "")}
              to="/products/women"
              href=""
            >
              Gi??y n???
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "nav-active" : "")}
              to="/products/kid"
              href=""
            >
              Tr??? em
            </NavLink>
          </li>
        </ul>
        {/* mobile */}
        {showMenu && (
          <ul className="mobile-menu">
            <button
              onClick={() => setShowMenu(false)}
              className="mobile-menu__close"
            >
              X
            </button>
            <li>
              <Link to="/products/new" onClick={() => setShowMenu(false)}>
                H??ng m???i
              </Link>
            </li>
            <li>
              <Link to="/products/men" onClick={() => setShowMenu(false)}>
                Gi??y nam
              </Link>
            </li>
            <li>
              <Link to="/products/women" onClick={() => setShowMenu(false)}>
                Gi??y n???
              </Link>
            </li>
            <li>
              <Link
                to="/products/bestseller"
                onClick={() => setShowMenu(false)}
              >
                Khuy???n m??i
              </Link>
            </li>
          </ul>
        )}
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
                <span>{userInfo.username}</span>
              </button>
            ) : (
              <Link to="/login" className="user-options__avatar">
                <i>
                  <CgProfile />
                </i>
                <span>????ng nh???p</span>
              </Link>
            )}

            {showUserOptions && (
              <ul className="user-options__list">
                <li>
                  <Link to="/profile">Trang c?? nh??n</Link>
                </li>
                {userInfo.isAdmin && (
                  <li>
                    <Link to="/admin">Trang qu???n l??</Link>
                  </li>
                )}
                <li>
                  <a href="/" onClick={handleLogout}>
                    ????ng xu???t
                  </a>
                </li>
              </ul>
            )}
          </div>

          <Link onClick={() => setCloseCart(false)} to="#">
            <i>
              <AiOutlineShoppingCart />
            </i>
            {cartItems.length > 0 && (
              <span className="cart-search__quantity">{cartItems.length}</span>
            )}
          </Link>
          <Link to="/search" className="cart-search__avatar">
            <i>
              <AiOutlineSearch />
            </i>
          </Link>
        </div>
      </div>
      {/* Add this feature later */}
      {/* <div className="bottom-nav">
        <Link to="/">Trang Ch??? </Link>
        <i>
          <FaGreaterThan />
        </i>
        <Link to="/">Shop</Link>
        <i>
          <FaGreaterThan />
        </i>
        <Link to="/">Address</Link>
      </div> */}
      {closeCart || (
        <div className="cart">
          <p className="cart__header">
            <i onClick={() => setCloseCart(true)}>
              <FaGreaterThan />
            </i>
            Gi??? h??ng
          </p>
          <div className="cart__items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart__item">
                <img src={item.img.url} alt="" />
                <div className="cart__item-info">
                  <h4 className="cart__item-title">{item.title}</h4>
                  <p className="cart__item-price">
                    {(item.price * item.productQuantity).toLocaleString(
                      "vi-VN"
                    )}
                    <span className="currency">??</span>
                  </p>
                  <p className="cart__item-quantity">
                    S??? l?????ng: {item.productQuantity}
                  </p>
                </div>

                <button onClick={() => dispatch(clearCartItem(item))}>X</button>
              </div>
            ))}
          </div>
          <div className="cart__item-total">
            <h4>T???ng gi?? tr???:</h4>
            <p>
              {total} <span className="currency">??</span>
            </p>
          </div>
          <div className="cart__item-button">
            <Link onClick={() => setCloseCart(true)} to="/cart">
              Xem gi??? h??ng
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

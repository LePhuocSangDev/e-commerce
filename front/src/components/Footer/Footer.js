import React from "react";
import "./footer.scss";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer__text">
          <p className="footer__text1">
            <i>
              <AiOutlineMail />
            </i>
            Get Latest Update & News
          </p>
          <p className="footer__text2">
            Get all the latest information on Events & Offers
          </p>
        </div>
        <div className="footer__input">
          <input type="text" placeholder="Your email address" />
          <button>Đăng kí</button>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer__col">
          <h2 className="heading">Information</h2>
          <ul>
            <li>About Us</li>
            <li>About Us</li>
            <li>About Us</li>
            <li>About Us</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="footer__col">
          <h2 className="heading">Information</h2>
          <ul>
            <li>About Us</li>
            <li>About Us</li>
            <li>About Us</li>
            <li>About Us</li>
            <li>About Us</li>
          </ul>
        </div>
        <div className="footer__col">
          <h2 className="heading">Information</h2>
          <ul>
            <li>About Us</li>
            <li>About Us</li>
            <li>About Us</li>
            <li>About Us</li>
            <li>About Us</li>
          </ul>
        </div>

        <div className="contact">
          <h2 className="heading">Contact Us​</h2>
          <p className="address">
            502 New Design Str, Melbourne, CA 94110, United States of America​
          </p>
          <p className="email">contact@martfury.com</p>
          <p className="phone">1800 97 97 69</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

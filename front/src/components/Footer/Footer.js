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
          <h2 className="heading">Hỗ trợ khách hàng</h2>
          <ul>
            <li>Thẻ ưu đãi</li>
            <li>Trung tâm bảo hành</li>
            <li>Thanh toán và giao hàng</li>
            <li>Dịch vụ sửa chữa và bảo trì</li>
            <li>Doanh nghiệp thân thiết</li>
          </ul>
        </div>
        <div className="footer__col">
          <h2 className="heading">Chính sách mua hàng và bảo hành</h2>
          <ul>
            <li>Quy định chung</li>
            <li>Chính sách bảo mật thông tin</li>
            <li>Chính sách vận chuyển và lắp đặt</li>
            <li>Chính sách bảo hành</li>
            <li>Chính sách trả góp</li>
          </ul>
        </div>
        <div className="footer__col">
          <h2 className="heading">Thông tin LPS Tech</h2>
          <ul>
            <li>Giới thiệu</li>
            <li>Thông tin liên hệ</li>
            <li>Hỏi đáp</li>
            <li>Tuyển dụng</li>
            <li>Hệ thống cửa hàng</li>
          </ul>
        </div>

        <div className="contact">
          <h2 className="heading">Liên hệ với chúng tôi​</h2>
          <p className="address">
            123 Đường Võ Văn Tần, Phường 14, quận 3, thành phố Hồ Chí Minh
          </p>
          <p className="email">lpstech@gmail.com</p>
          <p className="phone">1800 97 97 69</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addressRequest } from "../../axios";
import Loader from "../../components/Loader/Loader";
import { createOrder } from "../../features/apiCall";
import { deleteCart, selectCart } from "../../features/cartSlice";
import { selectOrder } from "../../features/orderSlice";
import { selectUser } from "../../features/userSlice";
import "./CheckoutPage.scss";

const CheckoutPage = ({ type }) => {
  const dispatch = useDispatch();
  const provinceRef = useRef();
  const districtRef = useRef();
  const province = provinceRef.current;
  const district = districtRef && districtRef.current;
  const { isFetching } = useSelector(selectOrder);
  const { orderInfo } = useSelector(selectOrder);
  const { userInfo: user } = useSelector(selectUser);
  const { products } = useSelector(selectCart);
  const total = useSelector((state) => state.cart.total);

  const [phone, setPhone] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    street: "",
    ward: "",
    district: "",
    province: "",
  });
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState();
  const [wards, setWards] = useState([]);
  const [methodInfo, setMethodInfo] = useState({});

  const [couponError, setCouponError] = useState(false);
  const [disabledSelect, setDisabledSelect] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await addressRequest.get("/province");
      setProvinces(res.data.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      const res = await addressRequest.post("/district", {
        province_id: Number(provinceId),
      });
      setDistricts(res.data.data);
    };

    fetchDistricts();
  }, [provinceId]);
  useEffect(() => {
    const fetchWards = async () => {
      const res = await addressRequest.post(`/ward?${districtId}`, {
        district_id: Number(districtId),
      });
      setWards(res.data.data);
    };

    districtId && fetchWards();
  }, [districtId]);

  const handleAddress = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleProvince = (e) => {
    handleAddress(e);
    province && setProvinceId(province.options[province.selectedIndex].id);
    e.target.value === "default"
      ? setDisabledSelect(true)
      : setDisabledSelect(false);
  };
  const handleDistrict = (e) => {
    handleAddress(e);
    district && setDistrictId(district.options[district.selectedIndex].id);
  };

  const handleMethodInfo = (e) => {
    setMethodInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const userInfo = {
    name,
    phone,
    email,
    address,
  };
  const totalNum = total.toLocaleString().replace(/\D/g, ""); // convert 100.000 back to 100000
  const allOrderInfo = {
    userId: user?._id,
    products,
    amount: totalNum,
    userInfo,
    methodInfo,
  };
  return (
    <div className="checkout">
      {type === "step1" && (
        <div className="checkout-left">
          <h4 className="checkout__heading">Thông tin giao hàng:</h4>
          <span>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </span>
          <form className="checkout__form" action="">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="checkout__form-name"
              placeholder="Họ và tên"
            />

            <div className="checkout__form-container">
              <input
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="checkout__form-email"
                placeholder="Email"
              />

              <input
                type="number"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                className="checkout__form-phone"
                placeholder="Số Điện Thoại"
              />
            </div>

            <input
              className="checkout__form-address"
              name="street"
              onChange={handleAddress}
              type="text"
              placeholder="Vui lòng nhập số nhà và tên đường nơi bạn ở"
            />
            <div className="checkout__select">
              <select
                ref={provinceRef}
                onChange={handleProvince}
                name="province"
                placeholder="Tinh thanh"
              >
                {address.province === "" && (
                  <option value="default">Vui lòng chọn tỉnh</option>
                )}
                {provinces.map((province) => (
                  <option
                    value={province?.ProvinceName}
                    id={province?.ProvinceID}
                    key={province?.ProvinceID}
                  >
                    {province?.ProvinceName}
                  </option>
                ))}
              </select>
              <select
                ref={districtRef}
                onChange={handleDistrict}
                name="district"
                defaultValue="default"
                disabled={disabledSelect}
              >
                {address.district === "" && (
                  <option value="default">Vui lòng chọn huyện</option>
                )}{" "}
                {districts.map((district) => (
                  <option
                    value={district?.DistrictName}
                    key={district?.DistrictID}
                    id={district?.DistrictID}
                  >
                    {district.DistrictName}
                  </option>
                ))}
              </select>
              <select
                onChange={handleAddress}
                name="ward"
                placeholder="Quan/Huyen"
                defaultValue="default"
                disabled={disabledSelect}
              >
                {address.ward === "" && (
                  <option value="default">Vui lòng chọn xã</option>
                )}
                {wards.map((ward) => (
                  <option key={ward?.WardCode} value={ward?.WardName}>
                    {ward.WardName}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <Link href="" to="/checkout/step2" className="checkout__pay-btn">
            Tiếp tục
          </Link>
        </div>
      )}
      {type === "step2" && (
        <div className="checkout-step2">
          <h4 className="checkout-step2__heading">Phương thức vận chuyển:</h4>
          <select
            onChange={handleMethodInfo}
            defaultValue="Giao hàng tận nơi"
            className="checkout-step2__delivery"
            name="delivery"
          >
            <option value="Giao hàng tận nơi">Giao hàng tận nơi</option>
            <option value="Bưu điện">Bưu điện</option>
          </select>
          <h4 className="checkout-step2__heading">Phương thức thanh toán:</h4>
          <select
            onChange={handleMethodInfo}
            className="checkout-step2__payment"
            defaultValue="Thanh toán khi giao hàng"
            name="payment"
          >
            <option value="Thanh toán khi giao hàng">
              Thanh toán khi giao hàng (COD)
            </option>
            <option value="Thẻ ngân hàng">
              Thanh toán bằng thẻ visa/mastercard
            </option>
            <option value="Ví điện tử">Thanh toán bằng ZaloPay, Momo</option>
          </select>
          <div className="checkout-step2__btn">
            <Link href="" to="/checkout">
              Quay lại thông tin giao hàng
            </Link>
            <Link
              href=""
              to="/checkout/step3"
              className="checkout-step2__btn-finish"
              onClick={() => {
                createOrder(dispatch, allOrderInfo);
                dispatch(deleteCart());
              }}
            >
              Hoàn Tất Đơn Hàng
            </Link>
          </div>
        </div>
      )}
      {type === "step3" &&
        (isFetching ? (
          <Loader />
        ) : (
          <div className="checkout-step3">
            <div className="checkout-step3__heading">
              <AiOutlineCheckCircle
                style={{
                  fontSize: "60px",
                  color: "#1da3a3",
                  float: "left",
                }}
              />
              <div>
                <h4>Đặt hàng thành công!</h4>
                <p>Mã đơn hàng: {orderInfo.orderCode}</p>
                <p>Cảm ơn bạn đã mua hàng!</p>
              </div>
            </div>
            <div className="checkout-step3__info">
              <div className="checkout-step3__order-info">
                <h4>Thông tin đơn hàng</h4>
                <p>
                  Tên: <span>{name}</span>
                </p>
                <p>
                  Số điện thoại: <span>{phone && phone}</span>
                </p>
                <p>
                  Địa chỉ:{" "}
                  <span>
                    {address &&
                      `${address.street} ${address.ward} ${address.district}  ${address.province}`}
                  </span>
                </p>
              </div>
              <div className="checkout-step3__methods-info">
                <h4>Phương thức thanh toán:</h4>
                <p>{methodInfo.payment && methodInfo.payment}</p>
                <h4>Phương thức vận chuyển:</h4>
                <p>{methodInfo.delivery && methodInfo.delivery}</p>
              </div>
            </div>
            <div className="checkout-step3__btn">
              <Link href="" to="/checkout">
                Liên hệ chúng tôi
              </Link>
              <Link href="" to="/" className="checkout-step2__btn-finish">
                Tiếp tục mua hàng
              </Link>
            </div>
          </div>
        ))}
      <div className="cart-page__summary">
        <h4 className="cart-page__title">Order summary</h4>
        <div className="cart-page__summary-detail">
          <div className="cart-page__summary-coupon">
            <input
              type="text"
              className="coupon-input"
              placeholder="Vui lòng nhập mã khuyến mãi"
              onChange={() => setCouponError(false)}
            />
            <button
              onClick={() => setCouponError(true)}
              className="coupon-button"
            >
              Nhập
            </button>
          </div>
          {couponError && <p style={{ color: "red" }}>Mã không đúng!</p>}
          <p>
            Phí ban đâu:
            <span>
              {total} <span>đ</span>
            </span>
          </p>
          <p>
            Phí vận chuyển
            <span>Miễn phí</span>
          </p>
          <p className="country">Vietnam</p>
        </div>
        <p className="cart-page__summary-total">
          Tổng phí:
          <span>
            {total} <span>đ</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;

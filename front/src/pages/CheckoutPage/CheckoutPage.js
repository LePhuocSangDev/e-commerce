import axios from "axios";
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
  console.log(orderInfo);

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
  const allOrderInfo = {
    userId: user?._id,
    products,
    amount: total,
    userInfo,
    methodInfo,
  };
  console.log(allOrderInfo);
  return (
    <div className="checkout">
      {type === "step1" && (
        <div className="checkout-left">
          <h4 className="checkout__heading">Thong tin giao hang</h4>
          <span>
            Ban da co tai khoan? <Link to="/login">Dang nhap</Link>
          </span>
          <form className="checkout__form" action="">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="checkout__form-name"
              placeholder="Ho va ten"
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
                placeholder="So Dien Thoai"
              />
            </div>

            <input
              className="checkout__form-address"
              name="street"
              onChange={handleAddress}
              type="text"
              placeholder="Vui long nhap so nha va ten duong noi ban o!"
            />
            <div className="checkout__select">
              <select
                ref={provinceRef}
                onChange={handleProvince}
                name="province"
                placeholder="Tinh thanh"
              >
                <option value="default">Vui Long Chon Tinh!</option>
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
              >
                <option value="default">Vui Long Chon Huyen!</option>
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
              >
                <option value="default">Vui Long Chon Xa!</option>
                {wards.map((ward) => (
                  <option key={ward?.WardCode} value={ward?.WardName}>
                    {ward.WardName}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <Link href="" to="/checkout/step2" className="checkout__pay-btn">
            Tiep tuc den phuong thuc thanh toan
          </Link>
        </div>
      )}
      {type === "step2" && (
        <div className="checkout-step2">
          <h4 className="checkout-step2__heading">Phuong thuc van chuyen</h4>
          <select
            onChange={handleMethodInfo}
            defaultValue="Destination"
            className="checkout-step2__delivery"
            name="delivery"
          >
            <option value="Destination">Giao Hang Tan noi</option>
            <option value="POST">Buu dien</option>
          </select>
          <select
            onChange={handleMethodInfo}
            className="checkout-step2__payment"
            defaultValue="COD"
            name="payment"
          >
            <option value="COD">Thanh toan khi giao hang(COD)</option>
            <option value="VISA">Thanh toan bang the visa/mastercard</option>
            <option value="E-WALLET">Thanh toan bang ZaloPay, Momo</option>
          </select>
          <div className="checkout-step2__btn">
            <Link href="" to="/checkout">
              Quay Lai Thong Tin Giao Hang
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
              Hoan Tat Don Hang
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
                <h4>Dat hang thanh cong</h4>
                <p>Ma don hang: {orderInfo.orderCode}</p>
                <p>Cam on ban da mua hang</p>
              </div>
            </div>
            <div className="checkout-step3__info">
              <div className="checkout-step3__order-info">
                <h4>Thong Tin Don Hang</h4>
                <p>
                  Name: <span>{name}</span>
                </p>
                <p>
                  Phone: <span>{phone && phone}</span>
                </p>
                <p>
                  Address:{" "}
                  <span>
                    {address &&
                      `${address.street} ${address.ward} ${address.district}  ${address.province}`}
                  </span>
                </p>
              </div>
              <div className="checkout-step3__methods-info">
                <h4>Phuong thuc thanh toan</h4>
                <p>{methodInfo.payment && methodInfo.payment}</p>
                <h4>Phuong thuc van chuyen</h4>
                <p>{methodInfo.delivery && methodInfo.delivery}</p>
              </div>
            </div>
            <div className="checkout-step3__btn">
              <Link href="" to="/checkout">
                Lien he Chung Toi
              </Link>
              <Link href="" to="/" className="checkout-step2__btn-finish">
                Tiep tuc mua hang
              </Link>
            </div>
          </div>
        ))}
      <div className="cart-page__summary">
        <h4 className="cart-page__title">Order summary</h4>
        <div className="cart-page__summary-detail">
          <input
            type="text"
            className="coupon-input"
            placeholder="Please Enter your coupon"
          />
          <p>
            Subtotal
            <span>{total}</span>
          </p>
          <p>
            Shipping
            <span>Free</span>
          </p>
          <p className="country">Country</p>
        </div>
        <p className="cart-page__summary-total">
          Total
          <span>{total}</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;

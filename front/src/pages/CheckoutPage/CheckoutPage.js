import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addressRequest } from "../../axios";
import Loader from "../../components/Loader/Loader";
import { createOrder } from "../../features/apiCall";
import { deleteCart, selectCart } from "../../features/cartSlice";
import { selectOrder } from "../../features/orderSlice";
import { selectUser } from "../../features/userSlice";
import "./CheckoutPage.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup
      .string()
      .min(5, "Vui lòng nhập tối thiểu 5 kí tự")
      .max(25, "Vui lòng nhập tối đa 25 kí tự")
      .required("Vui lòng không để trống"),
    email: yup
      .string()
      .email("Email không đúng chuẩn, ví dụ: youremail@example.com")
      .required("Vui lòng không để trống"),
    street: yup
      .string()
      .min(5, "Vui lòng nhập tối thiểu 5 kí tự")
      .max(25, "Vui lòng nhập tối đa 25 kí tự")
      .required("Vui lòng không để trống"),
    phone: yup
      .string()
      .min(8, "Vui lòng nhập tối thiểu 8 số")
      .max(13, "Vui lòng nhập tối đa 13 số")
      .required("Vui lòng không để trống"),
  })
  .required();

const CheckoutPage = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provinceRef = useRef();
  const districtRef = useRef();
  const province = provinceRef.current;
  const district = districtRef && districtRef.current;
  const { isFetching } = useSelector(selectOrder);
  const { orderInfo } = useSelector(selectOrder);
  const { userInfo: user } = useSelector(selectUser);
  const { products } = useSelector(selectCart);
  const total = useSelector((state) => state.cart.total);

  const [userData, setUserData] = useState({});
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
  const [methodInfo, setMethodInfo] = useState({
    delivery: "Giao hàng tận nơi",
    payment: "Thanh toán khi giao hàng",
  });

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
    ...userData,
    address,
  };
  const totalNum = total.toLocaleString().replace(/\D/g, ""); // convert 100.000 back to 100000
  const allOrderInfo = {
    userId: user?._id,
    products: products.map((product) => ({
      productID: product._id,
      productColor: product.color,
      productSize: product.size,
      productTitle: product.title,
      productQuantity: product.productQuantity,
    })),
    amount: totalNum,
    userInfo,
    methodInfo,
  };
  console.log(allOrderInfo);
  const summitForm = (data) => {
    setUserData({
      name: data.name,
      phone: data.phone,
      email: data.email,
    });
    setAddress({ ...address, street: data.street });
    address.ward === "" || address.district === "" || address.province === ""
      ? toast.error("Vui lòng chọn tỉnh thành, huyện, xã")
      : navigate("/checkout/step2");
  };
  const handleCreateOrder = (order) => {
    if (products.length === 0) {
      toast.error("Không có sản phẩm trong giỏ hàng, không thể tiếp tục!");
    } else {
      createOrder(dispatch, allOrderInfo);
      dispatch(deleteCart());
      navigate("/checkout/step3");
    }
  };
  return (
    <div className="checkout">
      {type === "step1" && (
        <div className="checkout-left">
          <h4 className="checkout__heading">Thông tin giao hàng:</h4>
          <span>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </span>
          <form
            onSubmit={handleSubmit(summitForm)}
            id="form"
            className="checkout__form"
            action=""
          >
            <input
              type="text"
              {...register("name", { required: true })}
              name="name"
              className="checkout__form-name"
              placeholder="Họ và tên"
            />
            <p className="error-msg">{errors.name?.message}</p>

            <div className="checkout__form-container">
              <div className="checkout__form-email">
                <input
                  type="text"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                />
                <p className="error-msg">{errors.email?.message}</p>
              </div>
              <div className="checkout__form-phone">
                <input
                  type="number"
                  name="phone"
                  {...register("phone", { required: true })}
                  placeholder="Số Điện Thoại"
                />
                <p className="error-msg">{errors.phone?.message}</p>
              </div>
            </div>

            <input
              className="checkout__form-address"
              name="street"
              {...register("street", { required: true })}
              type="text"
              placeholder="Vui lòng nhập số nhà và tên đường nơi bạn ở"
            />
            <p className="error-msg">{errors.street?.message}</p>
            <div className="checkout__select">
              <select
                ref={provinceRef}
                onChange={handleProvince}
                name="province"
                placeholder="Tỉnh thành"
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
          <input
            type="submit"
            form="form"
            className="checkout__pay-btn"
            value="Tiếp tục"
          />
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
            <button
              className="checkout-step2__btn-finish"
              onClick={handleCreateOrder}
            >
              Hoàn Tất Đơn Hàng
            </button>
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
                  Tên: <span>{userInfo.name}</span>
                </p>
                <p>
                  Số điện thoại: <span>{userInfo.phone}</span>
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
        <h4 className="cart-page__title">Tóm Tắt Đơn Hàng</h4>
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

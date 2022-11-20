import React, { useState, useEffect } from "react";
import "./loginPage.scss";
import { AiOutlineLogin } from "react-icons/ai";
import { TbLock } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { register as registerUser } from "../../features/apiCall";
import * as yup from "yup";
const schema = yup
  .object({
    username: yup
      .string()
      .min(5, "Vui lòng nhập tối thiểu 5 kí tự")
      .max(25, "Vui lòng nhập tối đa 25 kí tự")
      .required("Vui lòng không để trống"),
    email: yup
      .string()
      .email("Email không đúng chuẩn, ví dụ: youremail@example.com")
      .required("Vui lòng không để trống"),
    password: yup
      .string()
      .min(5, "Vui lòng nhập tối thiểu 5 kí tự")
      .max(25, "Vui lòng nhập tối đa 25 kí tự")
      .required("Vui lòng không để trống"),
  })
  .required();

const RegisterPage = () => {
  const {
    resetField,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { isFetching } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });

  useEffect(() => {
    errors &&
      setErrorMsg({
        userNameError: errors.username?.message,
        emailError: errors.email?.message,
        passwordError: errors.password?.message,
      });
  }, [errors]);

  return (
    <div className="login">
      <h2>Register</h2>
      <div className="login__container">
        <i className="login__icon">
          <AiOutlineLogin />
        </i>
        <form
          onSubmit={handleSubmit((data) => {
            registerUser(dispatch, data);
            resetField("username");
            resetField("email");
            resetField("password");
          })}
        >
          <div className="login__input">
            <i>
              <CgProfile />
            </i>
            <input
              {...register("username", { required: true })}
              name="username"
              type="text"
              placeholder="Tên tài khoản"
            />
          </div>
          {errorMsg.userNameError && (
            <p className="error-msg">{errors.username?.message}</p>
          )}
          <div className="login__input">
            <i>
              <CgProfile />
            </i>
            <input
              {...register("email", { required: true })}
              type="text"
              name="email"
              placeholder="Địa chỉ Email"
            />
          </div>
          {errorMsg.emailError && (
            <p className="error-msg">{errors.email?.message}</p>
          )}
          <div className="login__input">
            <i>
              <TbLock />
            </i>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              placeholder="Mật khẩu"
            />
          </div>
          {errorMsg.passwordError && (
            <p className="error-msg">{errors.password?.message}</p>
          )}
          <input
            type="submit"
            className={`login__button ${isFetching && "disabled"}`}
            name="Register"
            value="Đăng kí"
            disabled={isFetching}
          />
        </form>

        <p className="login__register">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

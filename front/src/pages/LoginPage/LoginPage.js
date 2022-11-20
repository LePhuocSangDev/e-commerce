import React, { useState } from "react";
import "./loginPage.scss";
import { AiOutlineLogin } from "react-icons/ai";
import { TbLock } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { login } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { selectUser } from "../../features/userSlice";
import Loader from "../../components/Loader/Loader";

const schema = yup
  .object({
    username: yup
      .string()
      .min(5, "Vui lòng nhập tối thiểu 5 kí tự")
      .max(25, "Vui lòng nhập tối đa 25 kí tự")
      .required("Vui lòng không để trống"),
    password: yup
      .string()
      .min(5, "Vui lòng nhập tối thiểu 5 kí tự")
      .max(25, "Vui lòng nhập tối đa 25 kí tự")
      .required("Vui lòng không để trống"),
  })
  .required();

const LoginPage = () => {
  const {
    resetField,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const dispatch = useDispatch();
  const { isFetching } = useSelector(selectUser);

  const handleLogin = (data) => {
    login(dispatch, data);
    resetField("password");
  };
  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className="login">
          <h2>Login</h2>
          <div className="login__container">
            <i className="login__icon">
              <AiOutlineLogin />
            </i>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="login__input">
                <i>
                  <CgProfile />
                </i>
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Tài khoản"
                />
              </div>
              <p className="error-msg">{errors.username?.message}</p>
              <div className="login__input">
                <i>
                  <TbLock />
                </i>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Mật khẩu"
                />
              </div>
              <p className="error-msg">{errors.password?.message}</p>
              <label htmlFor="" className="keep-login">
                <input type="checkbox" /> Keep me login
              </label>
              <input type="submit" className="login__button" value="Login" />
            </form>

            <p className="login__register">
              Forgot Password? New User? <Link to="/register">Register</Link>
            </p>
            <div className="login__others">
              Or Login Using:
              <a href="/"></a>
              <a href="/"></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;

import React, { useEffect, useState } from "react";
import "./loginPage.scss";
import { AiOutlineLogin } from "react-icons/ai";
import { TbLock } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { login, register } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { selectUser } from "../../features/userSlice";
import Loader from "../../components/Loader/Loader";

const schema = yup
  .object({
    username: yup.string().min(5).max(20).required(),
    password: yup.string().min(4).max(20).required(),
  })
  .required();

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching } = useSelector(selectUser);

  const handleLogin = (data) => {
    login(dispatch, data);
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
                  value={username}
                  {...register("username")}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="User name"
                />
              </div>
              <p className="error-msg">{errors.username?.message}</p>
              <div className="login__input">
                <i>
                  <TbLock />
                </i>
                <input
                  type="password"
                  value={password}
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <p className="error-msg">{errors.password?.message}</p>
              <label htmlFor="">
                <input type="checkbox" /> Keep me login
              </label>
              <input type="submit" className="login__button" value="Login" />
            </form>

            <p className="login__register">
              Forgot Password? New User? <Link to="/register">Register</Link>
            </p>
            <div className="login__others">
              Or Login Using:
              <a href="#"></a>
              <a href="#"></a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;

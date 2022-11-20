import React, { useState, useEffect } from "react";
import "./loginPage.scss";
import { AiOutlineLogin } from "react-icons/ai";
import { TbLock } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { deleteUser, login, logout, register } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup
  .object({
    username: yup.string().min(6).max(20).required(),
    email: yup.string().email("Email invalid").required(),
    password: yup.string().min(4).max(20).required(),
  })
  .required();

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { userInfo, newUser, isFetching, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
            register(dispatch, data);
            console.log(data);
          })}
        >
          <div className="login__input">
            <i>
              <CgProfile />
            </i>
            <input
              {...register("username")}
              type="text"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your User Name"
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
              {...register("email")}
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Address"
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
              {...register("password")}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
          </div>
          {errorMsg.passwordError && (
            <p className="error-msg">{errors.password?.message}</p>
          )}
          <input type="submit" value="Register" className="login__button" />
        </form>

        <p className="login__register">
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

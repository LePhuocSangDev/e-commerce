import {
  logInStart,
  logInSuccess,
  logInError,
  registerStart,
  registerSuccess,
  registerError,
  getUsersStart,
  getUsersSuccess,
  getUsersError,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserError,
  logOUtStart,
  logOUtSuccess,
  logOUtError,
  logOutStart,
  logOutSuccess,
  logOutError,
} from "./userSlice";
import { publicRequest, userRequest } from "../axios";
import {
  createProductError,
  createProductStart,
  createProductSuccess,
  deleteError,
  deleteStart,
  deleteSuccess,
  updateProductError,
  updateProductStart,
  updateProductSuccess,
} from "./productSlice";
import {
  getProductStart,
  getProductSuccess,
  getProductError,
} from "./productSlice";
import { clearCartError, clearCartStart, clearCartSuccess } from "./cartSlice";
import {
  createOrderError,
  createOrderStart,
  createOrderSuccess,
} from "./orderSlice";

export const login = async (dispatch, user) => {
  dispatch(logInStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(logInSuccess(res.data));
  } catch (err) {
    dispatch(logInError());
  }
};
export const logout = async (dispatch) => {
  dispatch(logOutStart());
  try {
    const res = await publicRequest.get("/auth/logout");
    dispatch(logOutSuccess());
  } catch (err) {
    dispatch(logOutError());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerError());
  }
};
//CRUD USER
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersError());
  }
};
export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserError());
  }
};

//CRUD PRODUCT
export const getProduct = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductError());
  }
};
export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteSuccess(id));
  } catch (error) {
    dispatch(deleteError());
  }
};
export const createProduct = async (dispatch, productInfo) => {
  dispatch(createProductStart());
  try {
    const res = await userRequest.post(`/products`, { ...productInfo });
    dispatch(createProductSuccess(res.data));
  } catch (error) {
    dispatch(createProductError());
  }
};
export const updateProduct = async (dispatch, id, productInfo) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, { ...productInfo });
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    dispatch(updateProductError());
  }
};

// CART
export const clearCart = async (dispatch) => {
  dispatch(clearCartStart());
  try {
    await userRequest.delete(`/cart`);
    dispatch(clearCartSuccess());
  } catch (error) {
    dispatch(clearCartError());
  }
};

// ORDER
export const createOrder = async (dispatch, orderInfo) => {
  dispatch(createOrderStart());
  try {
    const res = await userRequest.post(`/orders`, orderInfo);
    dispatch(createOrderSuccess(res.data));
  } catch (error) {
    dispatch(createOrderError());
  }
};

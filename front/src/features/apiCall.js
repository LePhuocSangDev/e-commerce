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
  deleteOrderError,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrdersError,
  getOrdersStart,
  getOrdersSuccess,
} from "./orderSlice";
import { toast } from "react-toastify";

export const login = async (dispatch, user) => {
  dispatch(logInStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(logInSuccess(res.data));
  } catch (err) {
    dispatch(logInError());
    toast.error("Sai tài khoản hoặc mật khẩu, vui lòng nhập lại!", {
      toastId: "toast-login-err",
    });
  }
};
export const logout = async (dispatch) => {
  dispatch(logOutStart());
  try {
    await publicRequest.get("/auth/logout");
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
    toast.success("Tạo tại khoản thành công!", {
      toastId: "toast-register-success",
    });
  } catch (error) {
    dispatch(registerError());
    toast.error("Có lỗi xảy ra, vui lòng thử lại sau!", {
      toastId: "toast-register-error",
    });
  }
};
//CRUD USER
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await publicRequest.get("/users");
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
    toast.error(res.data, { toastId: "toast-delete" });
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
    toast.error(res.data, { toastId: "toast-delete" });
  } catch (error) {
    dispatch(deleteError());
  }
};
export const createProduct = async (dispatch, productInfo) => {
  dispatch(createProductStart());
  try {
    const res = await userRequest.post(`/products`, { ...productInfo });
    dispatch(createProductSuccess(res.data));
    toast.success("Tạo sản phẩm thành công!", {
      toastId: "toast-create-product",
    });
  } catch (error) {
    dispatch(createProductError());
    toast.error("Tạo sản phẩm thất bại, vui lòng kiểm tra lại!", {
      toastId: "toast-create-error",
    });
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
export const deleteOrder = async (dispatch, id) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
    toast.success(res.data, { toastId: "toast-delete" });
  } catch (error) {
    dispatch(deleteOrderError());
  }
};
export const getOrders = async (dispatch) => {
  dispatch(getOrdersStart());
  try {
    const res = await publicRequest.get("/orders");
    dispatch(getOrdersSuccess(res.data));
  } catch (error) {
    dispatch(getOrdersError());
  }
};

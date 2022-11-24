import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  orderInfo: {},
  orders: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    createOrderStart: (state) => {
      state.isFetching = true;
    },
    createOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orderInfo = action.payload;
      toast.success("Order Successfully!", {
        autoClose: 1000,
        toastId: "toast-clear",
      });
    },
    createOrderError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    deleteOrderStart: (state) => {
      state.isFetching = true;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.splice(
        state.orders.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteOrderError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    getOrdersStart: (state) => {
      state.isFetching = true;
    },
    getOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrdersError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const selectOrder = (state) => state.order;

export const {
  createOrderStart,
  createOrderSuccess,
  createOrderError,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderError,
  getOrdersStart,
  getOrdersSuccess,
  getOrdersError,
} = orderSlice.actions;

export default orderSlice.reducer;

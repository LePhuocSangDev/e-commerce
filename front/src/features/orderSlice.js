import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  orderInfo: [],
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
  },
});

export const selectOrder = (state) => state.order;

export const { createOrderStart, createOrderSuccess, createOrderError } =
  orderSlice.actions;

export default orderSlice.reducer;

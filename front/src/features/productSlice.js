import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isFetching: false,
  error: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductStart: (state) => {
      state.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    createProductStart: (state) => {
      state.isFetching = true;
    },
    createProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    createProductError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    updateProductStart: (state) => {
      state.isFetching = true;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => (item._id = action.payload.id))
      ] = action.payload.product;
    },
    updateProductError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    deleteStart: (state) => {
      state.isFetching = true;
    },
    deleteSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const selectProduct = (state) => state.product;
export const {
  deleteStart,
  deleteSuccess,
  deleteError,
  getProductStart,
  getProductSuccess,
  getProductError,
  createProductStart,
  createProductSuccess,
  createProductError,
  updateProductStart,
  updateProductSuccess,
  updateProductError,
} = productSlice.actions;

export default productSlice.reducer;

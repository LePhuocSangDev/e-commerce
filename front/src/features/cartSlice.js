import { createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  products: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addProduct: (state, action) => {
      const payloadQuantity = action.payload.productQuantity;
      const existingIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingIndex >= 0) {
        state.products[existingIndex] = {
          ...state.products[existingIndex],
          productQuantity: payloadQuantity
            ? state.products[existingIndex].productQuantity + payloadQuantity
            : state.products[existingIndex].productQuantity + 1,
        };
      } else {
        let tempProductItem = {
          ...action.payload,
          productQuantity: payloadQuantity || 1, // payload might be not 1
        };
        state.products.push(tempProductItem);
      }
    },
    incQuantity: (state, action) => {
      const existingIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      state.products[existingIndex].productQuantity += 1;
    },

    decQuantity: (state, action) => {
      const existingIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      state.products[existingIndex].productQuantity <= 1
        ? (state.products[existingIndex].productQuantity = 1)
        : (state.products[existingIndex].productQuantity -= 1);
    },

    getTotal: (state) => {
      let { total } = state.products.reduce(
        (cartTotal, product) => {
          let { price, productQuantity } = product;
          const productTotal = price * productQuantity;
          cartTotal.total += productTotal;
          return cartTotal;
        },
        {
          total: 0,
        }
      );
      state.total = total;
    },
    clearCartItem: (state, action) => {
      const existingIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      const foundProduct = state.products[existingIndex];
      state.products.splice(existingIndex, 1);
      state.total = state.total - foundProduct.price * foundProduct.quantity;
      toast.error("Clear product successfully!", {
        autoClose: 1000,
        toastId: "toast-clear",
      });
    },
    updateCart: (state, action) => {
      const existingIndex = state.products.findIndex(
        (item) => item._id === action.payload.id
      );
      action.payload.newColor &&
        (state.products[existingIndex].color = action.payload.newColor);
      action.payload.newSize &&
        (state.products[existingIndex].size = action.payload.newSize);
    },
    deleteCart: (state) => {
      state.products = [];
      state.total = 0;
    },
  },
});

export const selectCart = (state) => state.cart;

export const {
  addProduct,
  clearCartStart,
  clearCartSuccess,
  clearCartError,
  deleteCart,
  clearCartItem,
  getTotal,
  incQuantity,
  decQuantity,
  updateCart,
} = cartSlice.actions;

export default cartSlice.reducer;

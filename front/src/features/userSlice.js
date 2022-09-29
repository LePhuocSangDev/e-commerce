import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isFetching: false,
  error: false,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.newUser = action.payload;
    },
    registerError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    logInStart: (state) => {
      state.isFetching = true;
    },
    logInSuccess: (state, action) => {
      state.isFetching = false;
      state.userInfo = action.payload;
    },
    logInError: (state) => {
      state.error = true;
      state.isFetching = false;
    },

    logOutStart: (state) => {
      state.isFetching = true;
    },
    logOutSuccess: (state) => {
      state.isFetching = false;
      state.userInfo = null;
    },
    logOutError: (state) => {
      state.error = true;
    },
    getUsersStart: (state) => {
      state.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    deleteUserStart: (state) => {
      state.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUserError: (state) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});

export const selectUser = (state) => state.user;

export const {
  registerStart,
  registerSuccess,
  registerError,
  logInStart,
  logInSuccess,
  logInError,
  getUsersStart,
  getUsersSuccess,
  getUsersError,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserError,
  logOutStart,
  logOutSuccess,
  logOutError,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,

  reducers: {
    dark: (state) => {
      state.mode = "dark";
    },
    light: (state) => {
      state.mode = "light";
    },
  },
});

export const selectTheme = (state) => state.theme.mode;

export const { dark, light } = themeSlice.actions;

export default themeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const switchTheme = createSlice({
  name: "switch",
  initialState: {
    theme: "light",
  },
  reducers: {
    lightAction: (state) => {
      state.theme = "light";
    },
    darkAction: (state) => {
      state.theme = "dark";
    },
  },
});

export const { lightAction, darkAction } = switchTheme.actions;
export default switchTheme.reducer;

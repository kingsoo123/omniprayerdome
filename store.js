import { configureStore } from "@reduxjs/toolkit";
import switchTheme from "./Slice/SwitchTheme";
import authSlice from "./Slice/AuthSlice";
export const store = configureStore({
  reducer: {
    switch: switchTheme,
    auth: authSlice,
  },
});

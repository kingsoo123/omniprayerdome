import { configureStore } from "@reduxjs/toolkit";
import switchTheme from "./Slice/SwitchTheme";
export const store = configureStore({
  reducer: {
    switch: switchTheme,
  },
});

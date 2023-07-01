import { configureStore } from "@reduxjs/toolkit";
import switchTheme from "./Slice/SwitchTheme";
import authSlice from "./Slice/AuthSlice";
import likeSlice from "./Slice/LikesSlice";
export const store = configureStore({
  reducer: {
    switch: switchTheme,
    auth: authSlice,
    likes: likeSlice,
  },
});

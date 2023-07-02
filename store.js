import { configureStore } from "@reduxjs/toolkit";
import switchTheme from "./Slice/SwitchTheme";
import authSlice from "./Slice/AuthSlice";
import likeSlice from "./Slice/LikesSlice";
import notificationSlice from "./Slice/NotificationSlice";
export const store = configureStore({
  reducer: {
    switch: switchTheme,
    auth: authSlice,
    likes: likeSlice,
    notification: notificationSlice,
  },
});

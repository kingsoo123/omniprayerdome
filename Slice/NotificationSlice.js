import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    postTag: "",
    newPostArray: [],
  },
  reducers: {
    postTagAction: (state, action) => {
      state.postTag = action.payload;
    },
    notificationAction: (state, action) => {
      console.log(action, "FROM NOTIFICATION ACTION");
      let newArr = [];
      newArr.push(action.payload);
      state.newPostArray = [...new Set([...state.likesIdArray, ...newArr])];
    },
  },
});

export const { notificationAction, postTagAction } = notificationSlice.actions;
export default notificationSlice.reducer;

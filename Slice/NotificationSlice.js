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
      if (!action.payload) {
        state.newPostArray = newArr;
      } else {
        newArr.push(action.payload);
        state.newPostArray = [...new Set([...state.newPostArray, ...newArr])];
      }
    },
  },
});

export const { notificationAction, postTagAction } = notificationSlice.actions;
export default notificationSlice.reducer;

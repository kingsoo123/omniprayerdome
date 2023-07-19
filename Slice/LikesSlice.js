import { createSlice } from "@reduxjs/toolkit";

export const likeSlice = createSlice({
  name: "likes",
  initialState: {
    likesIdArray: [],
    isLiked: false,
  },
  reducers: {
    addNewLikesId: (state, action) => {
      let newArr = [];
      newArr.push(action.payload);
      state.likesIdArray = [...new Set([...state.likesIdArray, ...newArr])];
      state.isLiked = false;
    },
    isLikedAction: (state) => {
      state.isLiked = true;
    },
  },
});

export const { addNewLikesId, isLikedAction } = likeSlice.actions;
export default likeSlice.reducer;

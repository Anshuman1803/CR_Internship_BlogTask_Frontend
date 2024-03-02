import { createSlice } from "@reduxjs/toolkit";
const ReduxSlice = createSlice({
  name: "ReduxSlice",
  initialState: {
    currentUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : [],
    IsActive: localStorage.getItem("user") ? true : false,
  },
  reducers: {
    UserLoggedIn(state, action) {
      state.IsActive = action.payload.isActive;
      state.currentUser = action.payload.currentUser;
      localStorage.setItem("user", JSON.stringify({
        user : state.currentUser.userName,
        _id : state.currentUser._id
      }));
    },
    UserLoggedOut(state, action) {
      state.IsActive = action.payload;
      localStorage.removeItem("user");
    },
  },
});
export const { UserLoggedIn, UserLoggedOut } = ReduxSlice.actions;
export default ReduxSlice.reducer;

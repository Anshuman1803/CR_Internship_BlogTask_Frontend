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
      state.currentUser = {
        user: action.payload.currentUser.userName,
        userEmail : action.payload.currentUser.userEmail,
        _id: action.payload.currentUser._id,
      };
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    },
    UserLoggedOut(state, action) {
      state.IsActive = action.payload;
      localStorage.removeItem("user");
    },
  },
});
export const { UserLoggedIn, UserLoggedOut } = ReduxSlice.actions;
export default ReduxSlice.reducer;

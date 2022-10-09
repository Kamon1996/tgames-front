import { createSlice } from "@reduxjs/toolkit";

const initProfileState: ProfileState = {
  isLogged: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initProfileState,
  reducers: {
    signIn(state) {
      state.isLogged = true;
    },
    loginOut(state) {
      state.isLogged = false;
    },
  },
});

export const { signIn, loginOut } = profileSlice.actions;

export default profileSlice.reducer;

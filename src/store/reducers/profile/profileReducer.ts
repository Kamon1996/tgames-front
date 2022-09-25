import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const profileInit: Profile = {
  id: null,
  username: "",
  name: "",
  email: "",
  created_at: "",
  updated_at: "",
};

const initProfileState: ProfileState = {
  profile: profileInit,
  isLogged: false,
  status: null,
  errors: null,
  token: "",
  exp: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initProfileState,
  reducers: {
    logOut() {
      localStorage.removeItem("token");
    },
    signIn(
      state,
      action: PayloadAction<{ token: string; exp: string; profile: Profile }>
    ) {
      state.token = action.payload.token;
      state.exp = action.payload.exp;
      state.profile = action.payload.profile;
    },
  },
});

export const { logOut, signIn } = profileSlice.actions;

export default profileSlice.reducer;

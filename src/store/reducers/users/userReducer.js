import { createSlice } from "@reduxjs/toolkit";

const profileInitState = {
  email: "",
  full_name: "",
  status: null,
  errors: null,
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    profile: profileInitState,
    usersList: [],
    current_user: {},
    status: null,
    errors: null,
  },
  reducers: {
    getProfile(state, action) {},
    getOneUser(state, action) {},
    getAllUsers() {},
    updateUser() {},
    deleteUser() {},
  },
  extraReducers: {},
});

export const { getProfile, getOneUser, getAllUsers, updateUser, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APILogin } from "../../../API/auth";
import { APIGetProfile } from "../../../API/users";

export const fetchProfile = createAsyncThunk(
  "users/fetchProfile",
  async function() {
    const response = await APIGetProfile();
    return response.data;
  }
);

export const fetchLogin = createAsyncThunk("users/fetchLogin", async function(
  payload
) {
  const response = await APILogin(payload);
  return response.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    profile: {},
    users: [],
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
  extraReducers: {
    [fetchProfile.pending]: (state, action) => {
      state.status = "loading";
      state.errors = null;
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.profile = action.payload;
    },
    [fetchProfile.rejected]: (state, action) => {
      state.status = "loading";
      state.errors = null;
    },
  },
});

export const {
  getProfile,
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;

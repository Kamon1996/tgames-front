import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APILogin } from "../../../API/auth";
import { APIGetProfile } from "../../../API/users";

export const fetchProfile = createAsyncThunk(
  "users/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await APIGetProfile();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "users/fetchLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await APILogin(payload);
      localStorage.setItem("token", response.token);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const profileInitState = {
  email: "",
  full_name: "",
};

const userSlice = createSlice({
  name: "profile",
  initialState: {
    profile: profileInitState,
    isLogged: false,
    status: null,
    errors: null,
  },
  reducers: {},
  extraReducers: {
    [fetchProfile.pending]: (state) => {
      state.status = "loading";
      state.errors = null;
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.isLogged = true;
      state.profile = action.payload;
    },
    [fetchProfile.rejected]: (state, action) => {
      state.status = "rejected";
      state.errors = action.payload;
    },
    [fetchLogin.pending]: (state) => {
      state.status = "loading";
      state.errors = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.isLogged = true;
      state.profile = action.payload;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = "rejected";
      state.errors = action.payload;
    },
  },
});

export const { getProfile, getOneUser, getAllUsers, updateUser, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;

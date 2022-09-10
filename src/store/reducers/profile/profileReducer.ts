import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tGamesApi } from "config/apiconfig";
import { getErrorMessage } from "helpers/catchErrorHelper";

declare global {
  type LoginData = {
    email: string;
    password: string;
  };

  type Profile = {
    id: number | null;
    created_at: string;
    updated_at: string;
    username: string;
    name: string;
    email: string;
  };
}
type ProfileState = {
  profile: Profile;
  isLogged: boolean;
  status: null | "loading" | "resolved" | "rejected";
  errors: string | null | undefined;
};

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
};

export const fetchProfile = createAsyncThunk<
  Profile,
  undefined,
  { rejectValue: string }
>("users/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await tGamesApi.get("/profile");
    return response.data as Profile;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

export const fetchLogin = createAsyncThunk<
  Profile,
  LoginData,
  { rejectValue: string }
>("users/fetchLogin", async (payload, { rejectWithValue }) => {
  try {
    const response = await tGamesApi.post(`/auth/login`, payload);
    localStorage.setItem("token", response.data.token);
    return response.data as Profile;
  } catch (err) {
    return rejectWithValue(getErrorMessage(err));
  }
});

const userSlice = createSlice({
  name: "profile",
  initialState: initProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.errors = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "resolved";
        state.errors = null;
        state.isLogged = true;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "rejected";
        state.isLogged = false;
        state.errors = action.payload;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
        state.errors = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "resolved";
        state.errors = null;
        state.isLogged = true;
        state.profile = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "rejected";
        state.errors = action.payload;
      });
  },
});

export default userSlice.reducer;

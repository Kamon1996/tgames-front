import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { flashSuccess } from "app/components/Common/Notification/flashs";
import { loginOut, signIn } from "store/reducers/profile/profileReducer";
import { tgamesApi } from ".";

declare global {
  type ProfileState = {
    isLogged: boolean;
  };

  type LoginData = {
    email: string;
    password: string;
  };

  type RegisterData = {
    username: string;
    name: string;
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

const profileApi = tgamesApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: `/account`,
      }),
      providesTags: ["Profile"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(signIn());
          flashSuccess({ title: "Sign In", message: "Success Sign In" });
        } catch {}
      },
    }),
    signIn: builder.mutation<ProfileState, LoginData>({
      query: (body) => ({
        url: "/session",
        method: "POST",
        body,
      }),
      invalidatesTags: (data, error) => (error ? [] : ["Profile"]),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          flashSuccess({ title: "Sign In", message: "Success Sign In" });
        } catch {}
      },
    }),
    createAccount: builder.mutation<void, RegisterData>({
      query: (body) => ({
        url: "/account",
        method: "POST",
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled, getCacheEntry }) {
        try {
          await queryFulfilled;
          flashSuccess({
            title: "Create Account",
            message: "Account Successfully Created",
          });
        } catch {}
      },
    }),
    logOut: builder.mutation<void, void>({
      query: () => ({
        url: "/session",
        method: "DELETE",
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(loginOut());
        } catch {}
      },
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateAccountMutation,
  useSignInMutation,
  useLogOutMutation,
} = profileApi;

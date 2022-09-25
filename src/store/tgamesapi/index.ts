import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  flashError,
  flashSuccess,
} from "app/components/Common/Notification/flashs";
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "helpers/rtkQueryErrorTypePredicate";
import { RootState } from "store";

declare global {
  type ProfileState = {
    profile: Profile;
    isLogged: boolean;
    status: null | "loading" | "resolved" | "rejected";
    errors: string | null | undefined;
    token: string;
    exp: string;
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

export const tgamesApi = createApi({
  reducerPath: "tgamesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).profile.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: `/profile`,
      }),
      providesTags: ["Profile"],
    }),
    signIn: builder.mutation<ProfileState, LoginData>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled, getCacheEntry }) {
        try {
          await queryFulfilled;
          const token = getCacheEntry().data?.token;
          flashSuccess({ title: "Sign In", message: "Success Sign In" });
        } catch {
          const { error } = getCacheEntry();
          if (isFetchBaseQueryError(error)) {
            flashError({ title: "Login", message: error.data });
          } else if (isErrorWithMessage(error)) {
            flashError({ title: "Login", message: error.message });
          }
        }
      },
    }),
    createAccount: builder.mutation<void, RegisterData>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useCreateAccountMutation,
  useSignInMutation,
} = tgamesApi;

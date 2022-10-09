import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tgamesApi = createApi({
  reducerPath: "tgamesApi",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "constants/evn";

export const tgamesApi = createApi({
  reducerPath: "tgamesApi",
  tagTypes: ["Profile", "People"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl[process.env.NODE_ENV],
    credentials: "include",
  }),
  endpoints: () => ({}),
});

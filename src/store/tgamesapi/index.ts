import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tgamesApi = createApi({
  reducerPath: "tgamesApi",
  tagTypes: ["Profile", "People"],
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://stagingwtgapi.onrender.com/",
    credentials: "include",
  }),
  endpoints: () => ({}),
});

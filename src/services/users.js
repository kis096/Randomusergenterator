import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://randomuser.me/api",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "?results=5",
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

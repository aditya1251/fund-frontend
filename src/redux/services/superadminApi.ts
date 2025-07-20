import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const superadminApi = createApi({
  reducerPath: "superadminApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getAdmins: builder.query<any, void>({
      query: () => "superadmin",
    }),
    createAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: "superadmin/register",
        method: "POST",
        body,
      }),
    }),
    deleteAdmin: builder.mutation<any, string>({
      query: (id) => ({
        url: `superadmin/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} = superadminApi;

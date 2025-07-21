import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const superadminApi = createApi({
  reducerPath: "superadminApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getAdmins: builder.query<any, void>({
      query: () => "superadmin",
    }),
    getAdminById: builder.query<any, string>({
      query: (id) => ({
        url: `superadmin/${id}`,
      }),
    }),
    createAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: "superadmin",
        method: "POST",
        body,
      }),
    }),
    updateAdmin: builder.mutation<any, { id: string, body: any }>({
      query: ({ id, body }) => ({
        url: `superadmin/${id}`,
        method: "PUT",
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
  useUpdateAdminMutation,
  useGetAdminByIdQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} = superadminApi;

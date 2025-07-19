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
    getApplications: builder.query<any, void>({
      query: () => "superadmin/application",
    }),
    updateApplicationStatus: builder.mutation<
      any,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `superadmin/application/${id}/status`,
        method: "PUT",
        body: { status },
      }),
    }),
    addApplication: builder.mutation<any, any>({
      query: (body) => ({
        url: "superadmin/application",
        method: "POST",
        body,
      }),
    }),
    // Add more superadmin endpoints as needed
  }),
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useAddApplicationMutation,
} = superadminApi;

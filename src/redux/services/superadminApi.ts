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
    getUsersByRole: builder.query<any[], string>({
      query: (role) => `superadmin/role/${role}`,
    }),
    getDsasByRmId: builder.query<any[], string>({
      query: (rmId) => `superadmin/dsa/${rmId}`,
    }),
    createAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: "superadmin",
        method: "POST",
        body,
      }),
    }),
    updateAdmin: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `superadmin/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteAdmin: builder.mutation<any, string>({
      query: (id) => ({
        url: `superadmin/${id}`,
        method: "DELETE",
      }),
    }),
    resetPass: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: `superadmin/reset-pass`,
        method: "POST",
        body: { email },
      }),
    }),
    verifyResetPass: builder.mutation<
      any,
      { resetCode: number; newPassword: string,email: string }
    >({
      query: ({ resetCode, newPassword ,email }) => ({
        url: `superadmin/verify-reset`,
        method: "POST",
        body: { resetCode, newPassword,email },
      }),
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useGetUsersByRoleQuery,
  useGetDsasByRmIdQuery,
  useUpdateAdminMutation,
  useGetAdminByIdQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useResetPassMutation,
  useVerifyResetPassMutation,
} = superadminApi;

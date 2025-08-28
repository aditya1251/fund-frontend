// src/redux/services/commissionApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const commissionApi = createApi({
  reducerPath: "commissionApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Commissions"],
  endpoints: (builder) => ({
    // create commission
    createCommission: builder.mutation<any, { data: Partial<any> }>({
      query: ({ data }) => ({
        url: `commissions/`,
        method: "POST",
        body: data,
      }),
    }),

    // commissions visible to the current user (DSA/RM/CRM)
   getMyCommissions: builder.query<any[], void>({
  query: () => `commissions/my`,
  providesTags: [{ type: "Commissions", id: "LIST" }],
}),

    // commission for a loan
    getCommissionByLoan: builder.query<any, string>({
      query: (loanId) => `commissions/loan/${loanId}`,
      providesTags: (result, error, loanId) => [{ type: "Commissions", id: `loan-${loanId}` }],
    }),
    // update commission (RM or Superadmin)
    updateCommission: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `commissions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Commissions", id }, { type: "Commissions", id: "LIST" }],
    }),
    // optional endpoint to mark credited (superadmin)
    creditCommission: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `commissions/${id}/credit`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Commissions", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateCommissionMutation,
  useGetMyCommissionsQuery,
  useGetCommissionByLoanQuery,
  useUpdateCommissionMutation,
  useCreditCommissionMutation,
} = commissionApi;

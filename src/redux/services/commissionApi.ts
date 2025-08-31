// src/redux/services/commissionApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export interface Commission {
  _id: string;
  amount: number;
  loanId?: string;
  loanRef?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommissionResponse {
  commissions: Commission[];
  summary: {
    balance: number;
    totalCommissionEarned: number;
  };
}

export const commissionApi = createApi({
  reducerPath: "commissionApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Commissions"],
  endpoints: (builder) => ({
    // create commission
    createCommission: builder.mutation<Commission, { data: Partial<Commission> }>({
      query: ({ data }) => ({
        url: `commissions/`,
        method: "POST",
        body: data,
      }),
    }),

    // commissions visible to the current user (DSA/RM/CRM)
   getMyCommissions: builder.query<CommissionResponse, void>({
     query: () => `commissions/my`,
     providesTags: [{ type: "Commissions", id: "LIST" }],
   }),

    // commission for a loan
    getCommissionByLoan: builder.query<Commission[], string>({
      query: (loanId) => `commissions/loan/${loanId}`,
      providesTags: (result, error, loanId) => [{ type: "Commissions", id: `loan-${loanId}` }],
    }),
    // update commission (RM or Superadmin)
    updateCommission: builder.mutation<Commission, { id: string; data: Partial<Commission> }>({
      query: ({ id, data }) => ({
        url: `commissions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Commissions", id }, { type: "Commissions", id: "LIST" }],
    }),
    // optional endpoint to mark credited (superadmin)
    creditCommission: builder.mutation<Commission, { id: string }>({
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

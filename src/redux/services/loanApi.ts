import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const loanApi = createApi({
  reducerPath: "loanApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getLoans: builder.query<
      {
        loans: any[];
        total: number;
        page: number;
        limit: number;
      },
      {
        loanType?: string;
        status?: string;
        search?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: ({ loanType, status, search, page = 1, limit = 10 }) => {
        const params = new URLSearchParams();

        if (loanType) params.append("loanType", loanType);
        if (status && status !== "all") params.append("status", status);
        if (search) params.append("search", search);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return `loan-forms?${params.toString()}`;
      },
    }),
    getLoanPendingCounts: builder.query<{
      applications: number;
      quickApplications: number;
      taxApplications: number;
    }, void>({
      query: () => "loan-forms/pending-counts",
    }),
    getLoanStats: builder.query<Record<string, { total: number; pending: number; approved: number; rejected: number }>, void>({
      query: () => "loan-forms/stats",
    }),


    getLoansByRmId: builder.query<any, string>({
      query: (rmId) => `loan-forms/rm/${rmId}`,
    }),
    getLoansByDsaId: builder.query<any, string>({
      query: (dsaId) => `loan-forms/dsa/${dsaId}`,
    }),
    createLoan: builder.mutation<any, any>({
      query: (body) => ({
        url: "loan-forms",
        method: "POST",
        body,
      }),
    }),
    updateLoan: builder.mutation<
      any,
      { _id: string; status: string; rejectionMessage?: string }
    >({
      query: (body) => ({
        url: "loan-forms",
        method: "PUT",
        body,
      }),
    }),
  }),

});

export const {
  useGetLoansQuery,
  useCreateLoanMutation,
  useGetLoanStatsQuery,

  useGetLoansByDsaIdQuery,
  useGetLoansByRmIdQuery,
  useUpdateLoanMutation,
  useGetLoanPendingCountsQuery, // 👈 new

} = loanApi;

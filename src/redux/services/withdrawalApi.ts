// src/redux/services/withdrawalApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const withdrawalApi = createApi({
  reducerPath: "withdrawalApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Withdrawals"],
  endpoints: (builder) => ({
    // create a withdraw request (current user)
    createWithdraw: builder.mutation<any, { amount: number; remarks?: string }>({
      query: (body) => ({
        url: "withdrawals",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Withdrawals", id: "LIST" }],
    }),
    // get current user's withdraw requests
    getMyWithdrawals: builder.query<any[], void>({
      query: () => "withdrawals/my",
      providesTags: (result = []) =>
        result ? [...result.map((w: any) => ({ type: "Withdrawals" as const, id: w._id })), { type: "Withdrawals", id: "LIST" }] : [{ type: "Withdrawals", id: "LIST" }],
    }),
    // list all withdrawals (admin)
    getWithdrawals: builder.query<any[], void>({
      query: () => "withdrawals",
      providesTags: [{ type: "Withdrawals", id: "LIST" }],
    }),
    // update withdraw status (approve/reject/process)
    updateWithdraw: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `withdrawals/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Withdrawals", id: "LIST" }],
    }),
    // mark completed
    completeWithdraw: builder.mutation<any, { id: string }>(
      {
        query: ({ id }) => ({
          url: `withdrawals/${id}/complete`,
          method: "POST",
        }),
        invalidatesTags: [{ type: "Withdrawals", id: "LIST" }],
      }
    ),
  }),
});

export const {
  useCreateWithdrawMutation,
  useGetMyWithdrawalsQuery,
  useGetWithdrawalsQuery,
  useUpdateWithdrawMutation,
  useCompleteWithdrawMutation,
} = withdrawalApi;

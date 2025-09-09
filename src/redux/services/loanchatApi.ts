import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const LoanChatApi = createApi({
  reducerPath: "LoanChatApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["LoanChat"], // ✅ tell RTK Query what tag types exist
  endpoints: (builder) => ({
    // Get chat messages for a loan
    getLoanMessages: builder.query<
      any,
      { loanId: string; page?: number; limit?: number }
    >({
      query: ({ loanId, page = 1, limit = 50 }) => ({
        url: `loan-chats/${loanId}?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: (result, error, { loanId }) => [
        { type: "LoanChat", id: loanId },
      ],
    }),

    // Send a new chat message
    sendLoanMessage: builder.mutation<
      any,
      {
        loanId: string;
        message: string;
        type?: "text" | "photo" | "document";
        attachments?: string[];
      }
    >({
      query: (body) => ({
        url: "loan-chats",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { loanId }) => [
        { type: "LoanChat", id: loanId },
      ],
    }),

    // Mark messages as read
    markLoanMessagesRead: builder.mutation<any, { loanId: string }>({
      query: ({ loanId }) => ({
        url: `loan-chats/${loanId}/mark-read`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { loanId }) => [
        { type: "LoanChat", id: loanId },
      ],
    }),
  }),
});

export const {
  useGetLoanMessagesQuery,
  useSendLoanMessageMutation,
  useMarkLoanMessagesReadMutation,
} = LoanChatApi;

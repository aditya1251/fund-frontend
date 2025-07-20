import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const loanApi = createApi({
  reducerPath: 'loanApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getLoans: builder.query<any, { loanType?: string }>({
      query: (params) => {
        const queryStr = params?.loanType ? `?loanType=${params.loanType}` : '';
        return `loan-forms${queryStr}`;
      },
    }),
    createLoan: builder.mutation<any, any>({
      query: (body) => ({
        url: 'loan-forms',
        method: 'POST',
        body,
      }),
    }),
    updateLoan: builder.mutation<any, { _id: string; status: string; rejectionMessage?: string }>({
      query: (body) => ({
        url: 'loan-forms',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetLoansQuery,
  useCreateLoanMutation,
  useUpdateLoanMutation,
} = loanApi; 
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    // Loan Form Templates
    getLoanTemplates: builder.query<any, void>({
      query: () => 'loan-templates',
    }),
    getLoanTemplateByName: builder.query<any, string>({
      query: (name) => `loan-templates/${name}`,
    }),
    getLoanTemplateById: builder.query<any, string>({
      query: (id) => `loan-templates/temp/${id}`,
    }),
    createLoanTemplate: builder.mutation<any, any>({
      query: (body) => ({
        url: 'loan-templates',
        method: 'POST',
        body,
      }),
    }),
    updateLoanTemplate: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `loan-templates/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteLoanTemplate: builder.mutation<any, string>({
      query: (id) => ({
        url: `loan-templates/${id}`,
        method: 'DELETE',
      }),
    }),
    // Loan Form Submissions
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
  useGetLoanTemplatesQuery,
  useGetLoanTemplateByNameQuery,
  useGetLoanTemplateByIdQuery,
  useCreateLoanTemplateMutation,
  useUpdateLoanTemplateMutation,
  useDeleteLoanTemplateMutation,
  useGetLoansQuery,
  useCreateLoanMutation,
  useUpdateLoanMutation,
} = adminApi; 
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
    getLoanTemplateById: builder.query<any, string>({
      query: (id) => `loan-templates/${id}`,
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
    getLoans: builder.query<any, { templateId?: string }>({
      query: (params) => {
        const queryStr = params?.templateId ? `?templateId=${params.templateId}` : '';
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
  }),
});

export const {
  useGetLoanTemplatesQuery,
  useGetLoanTemplateByIdQuery,
  useCreateLoanTemplateMutation,
  useUpdateLoanTemplateMutation,
  useDeleteLoanTemplateMutation,
  useGetLoansQuery,
  useCreateLoanMutation,
} = adminApi; 
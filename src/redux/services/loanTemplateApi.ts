import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const loanTemplateApi = createApi({
  reducerPath: 'loanTemplateApi',
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
  }),
});

export const {
  useGetLoanTemplatesQuery,
  useGetLoanTemplateByNameQuery,
  useGetLoanTemplateByIdQuery,
  useCreateLoanTemplateMutation,
  useUpdateLoanTemplateMutation,
  useDeleteLoanTemplateMutation,
} = loanTemplateApi; 
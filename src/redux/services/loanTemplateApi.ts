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
    getLoanTemplateById: builder.query<any, string>({
      query: (id) => `loan-templates/temp/${id}`,
    }),
    getLoanTemplatesByType: builder.query<any, string>({
      query: (loanType) => `loan-templates/by-type/${loanType}`,
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
  useGetLoanTemplateByIdQuery,
  useGetLoanTemplatesByTypeQuery,
  useCreateLoanTemplateMutation,
  useUpdateLoanTemplateMutation,
  useDeleteLoanTemplateMutation,
} = loanTemplateApi;

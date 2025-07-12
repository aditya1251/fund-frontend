import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api/',
    prepareHeaders: (headers, api) => {
      const state = api.getState() as RootState;
      const token = state.auth?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getLeads: builder.query<any, void>({
      query: () => 'leads', // Adjust endpoint as needed
    }),
    getOwnApplications: builder.query<any, void>({
      query: () => 'users/application', // Adjust for admin-specific filtering if needed
    }),
    createLead: builder.mutation<any, any>({
      query: (body) => ({
        url: 'leads', // Adjust endpoint as needed
        method: 'POST',
        body,
      }),
    }),
    updateLead: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `leads/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteLead: builder.mutation<any, string>({
      query: (id) => ({
        url: `leads/${id}`,
        method: 'DELETE',
      }),
    }),
    // Add more admin endpoints as needed
  }),
});

export const {
  useGetLeadsQuery,
  useGetOwnApplicationsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = adminApi; 
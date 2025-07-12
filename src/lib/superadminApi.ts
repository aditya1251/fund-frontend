import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export const superadminApi = createApi({
  reducerPath: 'superadminApi',
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
    getAdmins: builder.query<any, void>({
      query: () => 'superadmin',
    }),
    createAdmin: builder.mutation<any, any>({
      query: (body) => ({
        url: 'superadmin/register',
        method: 'POST',
        body,
      }),
    }),
    deleteAdmin: builder.mutation<any, string>({
      query: (id) => ({
        url: `superadmin/${id}`,
        method: 'DELETE',
      }),
    }),
    getApplications: builder.query<any, void>({
      query: () => 'superadmin/application',
    }),
    updateApplicationStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `superadmin/application/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
    }),
    addApplication: builder.mutation<any, any>({
      query: (body) => ({
        url: 'superadmin/application',
        method: 'POST',
        body,
      }),
    }),
    // Add more superadmin endpoints as needed
  }),
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useAddApplicationMutation,
} = superadminApi; 
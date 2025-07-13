import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { baseQueryWithAuth } from './baseQuery';



export const PlansApi = createApi({
  reducerPath: 'PlansApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getPlans: builder.query<any, void>({
      query: () => ({
        url: 'plans',
      }),
    }),
    getPlanById: builder.query<any, string>({
      query: (id) => ({
        url: `plans/${id}`,
      }),
    }),
    createPlan: builder.mutation<any, any>({
      query: (body) => ({
        url: 'plans',
        method: 'POST',
        body,
      }),
    }),
    updateActiveStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `plans/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
    }),
    updatePlans : builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `plans/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePlan: builder.mutation<any, string>({
      query: (id) => ({
        url: `plans/${id}`,
        method: 'DELETE',
      }),
    }),
    
    // Add more admin endpoints as needed
  }),
});

export const {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdateActiveStatusMutation,
  useGetPlanByIdQuery,
  useUpdatePlansMutation,
  useDeletePlanMutation,
} = PlansApi;
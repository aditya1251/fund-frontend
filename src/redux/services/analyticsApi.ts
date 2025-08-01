import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const AnalyticsApi = createApi({
    reducerPath: 'AnalyticsApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getDsaAnalitics: builder.query<any, "daily" | "weekly">({
            query: (mode) => ({
                url: `analytics/dsa-activity-stats?mode=${mode}`,
            }),
        }),
        getPlanAnalytics: builder.query<any, void>({
            query: () => ({
                url: `analytics/plan-popularity`,
            }),
        }),
        getTopUsers: builder.query<any, "dsa" | "rm">({
            query: (mode) => ({
                url: `analytics/top-users?mode=${mode}`,
            }),
        }),


        // Add more admin endpoints as needed
    }),
});

export const {
    useGetDsaAnaliticsQuery,
    useGetPlanAnalyticsQuery,
    useGetTopUsersQuery,
} = AnalyticsApi;
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const applicationApi = createApi({
    reducerPath: "applicationApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        addApplication: builder.mutation<any, any>({
            query: (body) => ({
                url: "application",
                method: "POST",
                body,
            }),
        }),
        getApplications: builder.query<any, void>({
            query: () => "application",
        }),
        updateApplicationStatus: builder.mutation<
            any,
            { id: string; status: string }
        >({
            query: ({ id, status }) => ({
                url: `application/${id}`,
                method: "PUT",
                body: { status },
            }),
        }),
    }),
});

export const {
    useAddApplicationMutation,
    useGetApplicationsQuery,
    useUpdateApplicationStatusMutation,
} = applicationApi;

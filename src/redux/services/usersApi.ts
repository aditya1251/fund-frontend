import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({    
    // Assign DSA to RM
    assignDsaToRm: builder.mutation<any, { dsaId: string; rmId: string }>({
      query: ({ dsaId, rmId }) => ({
        url: `users/dsa/${dsaId}/assign-rm`,
        method: "PATCH",
        body: { rmId },
      }),
    }),

    // Unassign DSA from RM
    unassignDsaFromRm: builder.mutation<any, string>({
      query: (dsaId) => ({
        url: `users/dsa/${dsaId}/unassign-rm`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useAssignDsaToRmMutation,
  useUnassignDsaFromRmMutation,
} = usersApi;

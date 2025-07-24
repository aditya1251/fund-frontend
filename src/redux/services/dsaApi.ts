import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const DsaApi = createApi({
	reducerPath: "dsaApi",
	baseQuery: baseQueryWithAuth,
	endpoints: (builder) => ({
		// ✅ GET: Fetch DSA details
		getDsaDetails: builder.query<any, string>({
			query: (id) => ({
				url: `dsa/${id}`,
			}),
		}),
		// ✅ PUT: Update DSA details
		updateDsaDetails: builder.mutation<any, { id: string; data: any }>({
			query: ({ id, data }) => ({
				url: `dsa/${id}`,
				method: "PUT",
				body: data,
			}),
		}),
	}),
});

export const { useGetDsaDetailsQuery, useUpdateDsaDetailsMutation } = DsaApi;

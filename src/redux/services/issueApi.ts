import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const IssueApi = createApi({
	reducerPath: "issueApi",
	baseQuery: baseQueryWithAuth,
	endpoints: (builder) => ({
		// ✅ GET: Fetch issues
		getIssues: builder.query<any, void>({
			query: () => "issue",
		}),
		// ✅ POST: Create a new issue
		createIssue: builder.mutation<any, any>({
			query: (body) => ({
				url: `issue`,
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useGetIssuesQuery, useCreateIssueMutation } = IssueApi;

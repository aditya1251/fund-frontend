import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";

export const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const session = await getSession(); // fetch session (contains the token)
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api/',
    prepareHeaders: (headers) => {
      if (session?.user?.token) {
        headers.set('Authorization', `Bearer ${session.user.token}`);
      }
      return headers;
    },
  });
  return rawBaseQuery(args, api, extraOptions);
};
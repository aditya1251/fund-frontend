import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const NotificationApi = createApi({
	reducerPath: "notificationApi",
	baseQuery: baseQueryWithAuth,
	tagTypes: ["Notifications"],
	endpoints: (builder) => ({
		// ✅ GET: Fetch notifications
		getNotifications: builder.query<any, string>({
			query: (userId) => ({
				url: `notifications?userId=${userId}`,
			}),
			// Poll every 60 seconds
			providesTags: ["Notifications"],
		}),

		// ✅ POST: Create a new notification
		createNotification: builder.mutation<
			any,
			{ title: string; userId: string; message: string }
		>({
			query: ({ userId, message, title }) => ({
				url: `notifications`,
				method: "POST",
				body: { userId, message, title },
			}),
			invalidatesTags: ["Notifications"],
		}),

		// ✅ PATCH: Mark a notification as read
		markAsRead: builder.mutation<any, string>({
			query: (id) => ({
				url: `notifications/${id}/read`,
				method: "PATCH",
			}),
			invalidatesTags: ["Notifications"],
		}),

		// ✅ DELETE: Delete a notification
		deleteNotification: builder.mutation<any, string>({
			query: (id) => ({
				url: `notifications/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Notifications"],
		}),
	}),
});

export const {
	useGetNotificationsQuery,
	useCreateNotificationMutation,
	useMarkAsReadMutation,
	useDeleteNotificationMutation,
} = NotificationApi;

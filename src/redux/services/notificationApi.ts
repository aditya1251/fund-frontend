import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";

export const NotificationApi = createApi({
	reducerPath: "notificationApi",
	baseQuery: baseQueryWithAuth,
	tagTypes: ["Notifications"],
	endpoints: (builder) => ({
		// ✅ GET: Fetch notifications
		getNotifications: builder.query<
			{
				notifications: Notification[];
				total: number;
				page: number;
				limit: number;
			},
			{ userId: string; page: number; limit: number }
		>({
			query: ({ userId, page, limit }) => ({
				url: `notifications?userId=${userId}&page=${page}&limit=${limit}`,
			}),
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

		notifySuperAdmin: builder.mutation<any, { title: string; message: string }>(
			{
				query: ({ message, title }) => ({
					url: `notifications/superadmin`,
					method: "POST",
					body: { message, title },
				}),
				invalidatesTags: ["Notifications"],
			}
		),

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
				method: "PATCH",
			}),
			invalidatesTags: ["Notifications"],
		}),
	}),
});

export const {
	useGetNotificationsQuery,
	useCreateNotificationMutation,
	useNotifySuperAdminMutation,
	useMarkAsReadMutation,
	useDeleteNotificationMutation,
} = NotificationApi;

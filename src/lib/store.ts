import { configureStore } from "@reduxjs/toolkit";
import { superadminApi } from "./superadminApi";
import { adminApi } from "./adminApi";
import superadminReducer from "./superadminSlice";
import adminReducer from "./adminSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlansApi } from "./plansApi";
import { NotificationApi } from "./notificationApi";

interface AuthState {
	token: string | null;
}

const initialAuthState: AuthState = {
	token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialAuthState,
	reducers: {
		setToken(state, action: PayloadAction<string | null>) {
			state.token = action.payload;
		},
	},
});

export const { setToken } = authSlice.actions;

export const store = configureStore({
	reducer: {
		[superadminApi.reducerPath]: superadminApi.reducer,
		[adminApi.reducerPath]: adminApi.reducer,
		[PlansApi.reducerPath]: PlansApi.reducer,
		[NotificationApi.reducerPath]: NotificationApi.reducer,
		superadmin: superadminReducer,
		admin: adminReducer,
		plans: PlansApi.reducer,
		auth: authSlice.reducer,
		notification: NotificationApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			superadminApi.middleware,
			adminApi.middleware,
			PlansApi.middleware,
			NotificationApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// RTK Query hooks for superadmin
export const {
	useGetAdminsQuery: useSuperadminGetAdminsQuery,
	useCreateAdminMutation: useSuperadminCreateAdminMutation,
	useDeleteAdminMutation: useSuperadminDeleteAdminMutation,
	useGetApplicationsQuery: useSuperadminGetApplicationsQuery,
	useUpdateApplicationStatusMutation:
		useSuperadminUpdateApplicationStatusMutation,
	useAddApplicationMutation: useSuperadminAddApplicationMutation,
} = superadminApi;

// RTK Query hooks for admin
export const {
	useGetLeadsQuery: useAdminGetLeadsQuery,
	useGetOwnApplicationsQuery: useAdminGetOwnApplicationsQuery,
	useCreateLeadMutation: useAdminCreateLeadMutation,
	useUpdateLeadMutation: useAdminUpdateLeadMutation,
	useDeleteLeadMutation: useAdminDeleteLeadMutation,
} = adminApi;

// RTK Query hooks for Plans
export const {
	useGetPlansQuery: usePlansGetPlansQuery,
	useCreatePlanMutation: usePlansCreatePlanMutation,
	useUpdateActiveStatusMutation: usePlansUpdateActiveStatusMutation,
	useUpdatePlansMutation: usePlansUpdatePlansMutation,
	useDeletePlanMutation: usePlansDeletePlanMutation,
} = PlansApi;

// RTK Query hooks for Notifications
export const {
	useGetNotificationsQuery: useNotificationGetNotificationsQuery,
	useMarkAsReadMutation: useNotificationMarkAsReadMutation,
	useDeleteNotificationMutation: useNotificationDeleteNotificationMutation,
} = NotificationApi;

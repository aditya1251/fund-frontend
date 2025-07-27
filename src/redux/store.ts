import { configureStore } from "@reduxjs/toolkit";
import { superadminApi } from "./services/superadminApi";
import { PlansApi } from "./services/plansApi";
import { NotificationApi } from "./services/notificationApi";
import { applicationApi } from "./services/applicationApi";
import { loanApi } from "./services/loanApi";
import { loanTemplateApi } from "./services/loanTemplateApi";
import { DsaApi } from "./services/dsaApi";
import { usersApi } from "./services/usersApi";

export const store = configureStore({
	reducer: {
		[superadminApi.reducerPath]: superadminApi.reducer,
		[PlansApi.reducerPath]: PlansApi.reducer,
		[NotificationApi.reducerPath]: NotificationApi.reducer,
		[applicationApi.reducerPath]: applicationApi.reducer,
		[loanApi.reducerPath]: loanApi.reducer,
		[loanTemplateApi.reducerPath]: loanTemplateApi.reducer,
		[DsaApi.reducerPath]: DsaApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			superadminApi.middleware,
			PlansApi.middleware,
			NotificationApi.middleware,
			applicationApi.middleware,
			loanApi.middleware,
			loanTemplateApi.middleware,
			DsaApi.middleware,
			usersApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

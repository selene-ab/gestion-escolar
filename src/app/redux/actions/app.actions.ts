import { createAction, props } from "@ngrx/store";

export const setLoginStatus = createAction(
  "[APP] Set login status",
  props<{ login: boolean }>()
);

export const setUserInfo = createAction(
  "[APP] Set user info",
  props<{ first_name: string; last_name: string; role: string }>()
);

export const resetUserSession = createAction("[APP] Reset user session");

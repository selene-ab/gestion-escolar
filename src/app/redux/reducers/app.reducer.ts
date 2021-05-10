import { Action, createReducer, on } from "@ngrx/store";
import * as AppActions from "./../actions/app.actions";
import { AppStore, defaultAppState } from "../store/app.store";

const appReducer = createReducer(
  defaultAppState,
  on(AppActions.setLoginStatus, (store, data) => {
    return {
      ...store,
      login: data.login,
    };
  }),
  on(AppActions.setUserInfo, (store, data) => {
    return {
      ...store,
      first_name: data.first_name,
      last_name: data.last_name,
      role: data.role,
    };
  }),
  on(AppActions.resetUserSession, () => {
    return defaultAppState;
  })
);

export function reducer(store: AppStore, action: Action) {
  return appReducer(store, action);
}

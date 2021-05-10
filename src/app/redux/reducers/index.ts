import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { reducer as appReducer } from "./app.reducer";
import { AppStore } from "../store/app.store";

export interface Store {
  app: AppStore;
}

export const reducers: ActionReducerMap<Store> = {
  app: appReducer,
};

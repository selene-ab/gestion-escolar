export interface AppStore {
  first_name: string;
  last_name: string;
  role: string;
  login: boolean;
}

export const defaultAppState: AppStore = {
  first_name: "",
  last_name: "",
  role: "",
  login: false,
};

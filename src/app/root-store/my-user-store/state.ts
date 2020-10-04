import { UserModel } from 'src/app/core/models/baseUser/user.model'

export interface State {
  user?: UserModel;
  token?: string;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  user: null,
  token: null,
  isLoading: false,
  error: null
};

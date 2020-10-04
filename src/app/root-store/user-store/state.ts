import { UserModel } from 'src/app/core/models/baseUser/user.model';

export interface State {
  user?: UserModel;
  isLoading?: boolean;
  error?: any;
  message?: string;
}

export const initialState: State = {
  user: null,
  isLoading: false,
  error: null,
  message: null
};

import { AdminPage } from './../../core/models/page/admin.model';

export interface State {
  admins?: AdminPage;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  admins: null,
  isLoading: false,
  error: null
};

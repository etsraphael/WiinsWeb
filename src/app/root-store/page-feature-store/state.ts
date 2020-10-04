import { PageModel } from 'src/app/core/models/page/page.model';

export interface State {
  page?: PageModel;
  isLoading?: boolean;
  error?: any;
  message: string;
}

export const initialState: State = {
  page: null,
  isLoading: false,
  error: null,
  message: null,
};

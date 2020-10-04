import { TubePageModel } from 'src/app/core/models/tube/tubePage.model';

export interface State {
  page?: TubePageModel;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  page: null,
  isLoading: false,
  error: null
};


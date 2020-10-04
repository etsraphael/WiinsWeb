import { TubeMenuModel } from 'src/app/core/models/tube/tubeMenu.model';

export interface State {
  menu?: TubeMenuModel | any;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  menu: null,
  isLoading: false,
  error: null
};


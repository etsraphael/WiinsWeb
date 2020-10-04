import { GroupModel } from 'src/app/core/models/group/group.model';

export interface State {
  group?: GroupModel;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  group: null,
  isLoading: false,
  error: null,
}

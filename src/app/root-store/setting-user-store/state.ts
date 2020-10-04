import { PrivacySetting } from 'src/app/core/models/baseUser/privacySetting.model';

export interface State {
  setting?: PrivacySetting;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  setting: null,
  isLoading: false,
  error: null
};

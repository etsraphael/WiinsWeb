import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';

export interface StateProfile {
  profile?: ProfileModel;
  isLoading?: boolean;
  error?: any;
}

export const initialStateProfile: StateProfile = {
  profile: null,
  isLoading: false,
  error: null
};

export interface StateProfilePage {
  profile?: ProfileModel;
  isLoading?: boolean;
  error?: any;
}

export const initialStateProfilePage: StateProfilePage = {
  profile: null,
  isLoading: false,
  error: null
};

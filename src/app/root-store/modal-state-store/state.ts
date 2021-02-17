export interface State {
  message?: string;
  isLoading?: boolean;
  success?: boolean;
  error?: any;
}

export const initialState: State = {
  message: null,
  isLoading: false,
  success: false,
  error: null
};

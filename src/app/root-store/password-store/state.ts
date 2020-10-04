export interface State {
  message?: string;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  message: null,
  isLoading: false,
  error: null
};

export interface State {
  isLoading?: boolean;
  success?: boolean;
  error?: boolean;
}

export const initialState: State = {
  isLoading: false,
  success: false,
  error: false
};

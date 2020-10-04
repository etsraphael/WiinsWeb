export interface State {
  isLoading?: boolean;
  error?: any;
  message: string;
}

export const initialState: State = {
  isLoading: false,
  error: null,
  message: null,
};

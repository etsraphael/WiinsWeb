
export interface State {
  response?: boolean;
  isLoading?: boolean;
  error?: any;
}

export const initialState: State = {
  response: null,
  isLoading: false,
  error: null
};

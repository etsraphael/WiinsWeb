export interface StateNumberRequest {
  number?: number;
  isLoading?: boolean;
  error?: any;
}

export const initialStateRequest: StateNumberRequest = {
  number: null,
  isLoading: false,
  error: null
};

export interface StateNumberActivity {
  number?: number;
  isLoading?: boolean;
  error?: any;
}

export const initialStateActivity: StateNumberActivity = {
  number: null,
  isLoading: false,
  error: null
};

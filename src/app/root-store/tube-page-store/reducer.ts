import { TubePageModel } from 'src/app/core/models/tube/tubePage.model';
import { PageTubeActions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: PageTubeActions): State {
  switch (action.type) {
    case ActionTypes.LOAD_TUBE_PAGE: {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    }
    case ActionTypes.LOAD_TUBE_PAGE_SUCCESS: {
      return {
        ...state,
        page: action.payload,
        isLoading: false,
        error: null
      }
    }
    case ActionTypes.LOAD_TUBE_PAGE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.DELETE_FRIEND_SUCCESS: {
      const tubePage: TubePageModel = {
        ...state.page,
        tube: {
          ...state.page.tube,
          profile: {
            ...state.page.tube.profile,
            relation: 'not-friend',
            follow: {
              following: false,
              friend: false,
            }
          }
        }
      }
      return {
        ...state,
        page: tubePage,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.UNFOLLOW_PROFILE: {
      const tubePage: TubePageModel = {
        ...state.page,
        tube: {
          ...state.page.tube,
          profile: {
            ...state.page.tube.profile,
            relation: 'nothing'
          }
        }
      }
      return {
        ...state,
        page: tubePage,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.UNFOLLOW_PROFILE_FAIL: {
      const tubePage: TubePageModel = {
        ...state.page,
        tube: {
          ...state.page.tube,
          profile: {
            ...state.page.tube.profile,
            relation: 'following'
          }
        }
      }
      return {
        ...state,
        page: tubePage,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.FOLLOW_PROFILE_FAIL: {
      const tubePage: TubePageModel = {
        ...state.page,
        tube: {
          ...state.page.tube,
          profile: {
            ...state.page.tube.profile,
            relation: 'nothing'
          }
        }
      }
      return {
        ...state,
        page: tubePage,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.FOLLOW_PROFILE: {
      const tubePage: TubePageModel = {
        ...state.page,
        tube: {
          ...state.page.tube,
          profile: {
            ...state.page.tube.profile,
            relation: 'following'
          }
        }
      }
      return {
        ...state,
        page: tubePage,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.RESET_TUBE_PAGE:
    case '@user/log_out' as any: return initialState
    default: return state
  }
}

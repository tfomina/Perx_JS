import { APP_ACTIONS } from "./../constants";

const initialState = {
  isLoading: false,
  isError: true,
  data: null
};

export function reducers(state = initialState, action) {
  switch (action.type) {
    case APP_ACTIONS.FETCH_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: null
      };

    case APP_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };

    case APP_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: null
      };

    default:
      return state;
  }
}

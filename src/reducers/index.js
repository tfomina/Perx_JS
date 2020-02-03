import { APP_ACTIONS } from "./../constants";

const INITIAL_DATA = { cars: [], total: 0 };

const initialState = {
  isLoading: false,
  isError: true,
  data: INITIAL_DATA
};

export function reducers(state = initialState, action) {
  switch (action.type) {
    case APP_ACTIONS.FETCH_PENDING:
      return {
        ...state,
        isLoading: true,
        isError: false
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
        data: INITIAL_DATA
      };

    default:
      return state;
  }
}

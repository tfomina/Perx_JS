import { APP_ACTIONS } from "./../constants";

const fetchPending = () => ({
  type: APP_ACTIONS.FETCH_PENDING
});

const fetchSuccess = payload => ({
  type: APP_ACTIONS.FETCH_SUCCESS,
  payload
});

const fetchError = () => ({
  type: APP_ACTIONS.FETCH_ERROR
});

export { fetchPending, fetchSuccess, fetchError };

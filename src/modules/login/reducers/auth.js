import {createReducer} from "../../common/utils";
import _ from "lodash";

const initialState = {
  username: null,
  userObject: null,
  token: null,
  statusText: null,
  isAuthenticated: false,
  redirectUrlPath: null
};

export default createReducer(initialState, {
  LOGIN_REQUEST: (state, payload) => {

    return Object.assign({}, state, {
      statusText: null
    });

  },
  LOGIN_SUCCESS: (state, payload) => {

    return Object.assign({}, state, {
      username: payload.username,
      userObject: payload.userObject,
      role: payload.role,
      token: payload.token,
      isAuthenticated: true
    });

  },
  LOGIN_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      statusText: payload.statusText,
      isAuthenticated: false,
      token: null
    });

  },
  CLEAR_LOGIN_ERROR_MESSAGE: (state, payload) => {

    return Object.assign({}, state, {
      statusText: payload.statusText
    });

  },
  CLEAN_REDUCER_DATA: (state, payload)=> {

    return _.cloneDeep(initialState);

  },
  LOG_OUT: (state, payload) => {

    return Object.assign({}, state, {
      isAuthenticated: false,
      token: null
    });

  },
  SET_REDIRECT_URL_PATH: (state, payload) => {

    return Object.assign({}, state, {
      redirectUrlPath: payload
    });

  }
});

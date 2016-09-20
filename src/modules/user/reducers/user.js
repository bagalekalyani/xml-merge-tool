import {createReducer} from "../../common/utils";
import _ from "lodash";

const initialState = {

  users: [],
  statusText: null,
  selectedUser: null,
  userTotalCount: 0,
  userPageOffset: 1,
  paginationLimit: 10

};

export default createReducer(initialState, {


  USER_LIST_RECEIVED: (state, payload)=> {

    return Object.assign({}, state, {
      users: payload.users,
      userTotalCount: payload.userTotalCount
    });

  },
  USER_CREATION_FAILED: (state, payload)=> {

    return Object.assign({}, state, {
      statusText: payload
    });

  },
  USER_SELECTED: (state, payload)=> {

    return Object.assign({}, state, {
      selectedUser: payload
    });

  },
  CURRENT_PAGE_OF_USER_LIST: (state, payload) => {

    return Object.assign({}, state, {
      userPageOffset : payload.userPageOffset
    });

  },

});

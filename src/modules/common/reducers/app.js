import {createReducer} from "../../common/utils";
import _ from "lodash";

const initialState = {
  loading: false,
  rolesAccessrights: {

    "super_admin": {

      "Header": {
        "Customers": true,
        "Users": true,
        "Configuration": true,
        "Merge Scenarios": true,
        "Admin": true,
        "Profile": true,
        "Logout": true
      }

    },
    "centric_user": {

      "Header": {
        "Customers": true,
        "Users": true,
        "Configuration": true,
        "Merge Scenarios": true,
        "Profile": true,
        "Logout": true
      }

    },
    "customer_admin": {

      "Header": {
        "Customers": true,
        "Configuration": true,
        "Merge Scenarios": true,
        "Profile": true,
        "Logout": true
      }

    },
    "customer_staff": {

      "Header": {
        "Configuration": true,
        "Merge Scenarios": true,
        "Profile": true,
        "Logout": true
      }

    }
  }
};

export default createReducer(initialState, {

  LOGIN_REQUEST: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  LOGIN_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  LOGIN_SUCCESS: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CREATE_CUSTOMER: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_CREATED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_CREATION_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_LIST_REQUEST: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_LIST_RECEIVED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_LIST_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  UPDATE_CUSTOMER: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_UPDATED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_UPDATE_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  DELETE_CUSTOMER: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_DELETED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_DELETION_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  GET_SINGLE_CUSTOMER: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  SINGLE_CUSTOMER_RECEIVED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  SINGLE_CUSTOMER_GET_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_CONFIGURATION_UPLOAD: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_CONFIGURATION_UPLOADED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_CONFIGURATION_UPLOAD_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  DELETE_CUSTOMER_CONFIGURATION: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_CONFIGURATION_DELETED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_CONFIGURATION_DELETION_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_CONFIGURATIONS_REQUEST: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_CONFIGURATIONS_LIST_RECEIVED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_CONFIGURATIONS_LIST_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CLEAN_REDUCER_DATA: (state, payload)=> {

    return _.cloneDeep(initialState);

  },
  CREATE_CUSTOMER_USER: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_USER_CREATED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_USER_CREATION_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  UPDATE_CUSTOMER_USER: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_USER_UPDATED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_USER_UPDATION_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  UPDATE_CUSTOMER_CONFIGURATION: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_CONFIGURATION_UPDATED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_CONFIGURATION_UPDATE_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_USER_LIST_REQUEST: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_USER_LIST_RECEIVED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_USER_LIST_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  DELETE_CUSTOMER_USER: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  CUSTOMER_USER_DELETED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  CUSTOMER_USER_DELETION_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  GET_SINGLE_CUSTOMER_USER: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  SINGLE_CUSTOMER_USER_RECEIVED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  SINGLE_CUSTOMER_USER_GET_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  USER_LIST_REQUEST: (state, payload) => {

    return Object.assign({}, state, {
      loading: true
    });

  },
  USER_LIST_RECEIVED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },
  USER_LIST_FAILED: (state, payload) => {

    return Object.assign({}, state, {
      loading: false
    });

  },

});

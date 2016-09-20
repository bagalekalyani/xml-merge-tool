import {createReducer} from "../../common/utils";
import _ from "lodash";

const initialState = {

  selectedCustomerId: null,
  customerActiveTab: 'configuration',
  activeKey: 1,
  statusText: null,
  statusType: null,
  selectedCustomer: null,
  customers: [],
  configurationList: [],
  users: [],
  selectedUser: null,
  selectedConfiguration: null,
  customerTotalCount: 0,
  customerPageOffset: 1,
  customerConfigurationTotalCount: 0,
  customerConfigurationPageOffset: 1,
  paginationLimit: 1

};

export default createReducer(initialState, {

  SET_CUSTOMER_ACTIVE_TAB: (state, payload) => {

    return Object.assign({}, state, {
      customerActiveTab: payload.customerActiveTab,
      selectedCustomerId: payload.selectedCustomerId,
      activeKey: payload.activeKey
    });

  },
  CUSTOMER_CREATION_FAILED: (state, payload)=> {

    return Object.assign({}, state, {
      statusText: payload
    });

  },
  CLEAR_ERROR_MESSAGE: (state, payload)=> {

    return Object.assign({}, state, {
      statusText: payload
    });

  },
  CUSTOMER_LIST_RECEIVED: (state, payload)=> {

    return Object.assign({}, state, {
      customers: payload.customers,
      customerTotalCount: payload.customerTotalCount
    });

  },
  CUSTOMER_SELECTED: (state, payload)=> {

    return Object.assign({}, state, {
      selectedCustomer: payload
    });

  },
  CUSTOMER_UPDATE_FAILED: (state, payload)=> {

    return Object.assign({}, state, {
      statusText: payload
    });

  },
  CUSTOMER_CONFIGURATION_UPLOADED: (state, payload)=> {

    return Object.assign({}, state, {
      statusText: payload.statusText,
      statusType: payload.statusType
    });

  },
  CUSTOMER_CONFIGURATION_UPLOAD_FAILED: (state, payload)=> {

    return Object.assign({}, state, {
      statusText: payload.statusText,
      statusType: payload.statusType
    });

  },
  CLEAN_REDUCER_DATA: (state, payload)=> {

    return _.cloneDeep(initialState);

  },
  CLEAR_STATUS_TEXT: (state, payload)=> {

    return Object.assign({}, state, {
      statusText: null,
      statusType: null
    });

  },
  CUSTOMER_CONFIGURATIONS_LIST_RECEIVED: (state, payload)=> {

    return Object.assign({}, state, {
      configurationList: payload.configurationList,
      customerConfigurationTotalCount: payload.customerConfigurationTotalCount
    });

  },
  CUSTOMER_USER_LIST_RECEIVED: (state, payload)=> {

    return Object.assign({}, state, {
      users: payload
    });

  },
  CUSTOMER_USER_SELECTED: (state, payload)=> {

    return Object.assign({}, state, {
      selectedUser: payload
    });

  },
  CURRENT_PAGE_OF_CUSTOMER_LIST: (state, payload) => {

    return Object.assign({}, state, {
      customerPageOffset : payload.customerPageOffset
    });

  },
  CUSTOMER_USER_CREATION_FAILED: (state, payload)=> {

    return Object.assign({}, state, {
      statusText: payload
    });

  },
  CUSTOMER_CONFIGURATION_SELECTED: (state, payload)=> {

    return Object.assign({}, state, {
      selectedConfiguration: payload
    });

  },
  CURRENT_PAGE_OF_CUSTOMER_CONFIGURATION_LIST: (state, payload) => {

    return Object.assign({}, state, {
      customerConfigurationPageOffset : payload.customerConfigurationPageOffset
    });

  },
  SELECTED_CUSTOMER_ID: (state, payload)=> {

    return Object.assign({}, state, {
      selectedCustomerId: payload
    });

  },

});

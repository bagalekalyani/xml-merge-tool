import constants from "../constants";
import {parseJSON} from "../../common/utils";
import {get, post, patch, deleteRequest, fileUpload} from "../../common/actions/HTTPmethods";
import {push} from "redux-router";

let {
  SET_CUSTOMER_ACTIVE_TAB, CREATE_CUSTOMER, CUSTOMER_CREATED, CUSTOMER_CREATION_FAILED,
  CLEAR_ERROR_MESSAGE, CUSTOMER_LIST_FAILED, CUSTOMER_LIST_REQUEST, CUSTOMER_LIST_RECEIVED,
   CUSTOMER_SELECTED, UPDATE_CUSTOMER, CUSTOMER_UPDATED, CUSTOMER_UPDATE_FAILED,
   CUSTOMER_DELETED, DELETE_CUSTOMER, CUSTOMER_DELETION_FAILED, GET_SINGLE_CUSTOMER, SINGLE_CUSTOMER_RECEIVED,
   SINGLE_CUSTOMER_GET_FAILED, CUSTOMER_CONFIGURATION_UPLOAD, CUSTOMER_CONFIGURATION_UPLOADED,
   CUSTOMER_CONFIGURATION_UPLOAD_FAILED, CLEAR_STATUS_TEXT, CUSTOMER_CONFIGURATIONS_REQUEST,
   CUSTOMER_CONFIGURATIONS_LIST_RECEIVED, CUSTOMER_CONFIGURATIONS_LIST_FAILED, DELETE_CUSTOMER_CONFIGURATION,
   CUSTOMER_CONFIGURATION_DELETED, CUSTOMER_CONFIGURATION_DELETION_FAILED, CURRENT_PAGE_OF_CUSTOMER_LIST,
   UPDATE_CUSTOMER_CONFIGURATION, CUSTOMER_CONFIGURATION_UPDATED, CUSTOMER_CONFIGURATION_UPDATE_FAILED, CUSTOMER_CONFIGURATION_SELECTED, GET_SINGLE_CUSTOMER_CONFIGURATION,
   SINGLE_CUSTOMER_CONFIGURATION_RECEIVED, SINGLE_CUSTOMER_CONFIGURATION_FAILED, CURRENT_PAGE_OF_CUSTOMER_CONFIGURATION_LIST, CUSTOMER_USER_LIST_FAILED, CUSTOMER_USER_LIST_REQUEST,
   CUSTOMER_USER_LIST_RECEIVED, CREATE_CUSTOMER_USER, CUSTOMER_USER_CREATED, CUSTOMER_USER_CREATION_FAILED,  CUSTOMER_USER_SELECTED, UPDATE_CUSTOMER_USER, CUSTOMER_USER_UPDATED, CUSTOMER_USER_UPDATION_FAILED, GET_SINGLE_CUSTOMER_USER, SINGLE_CUSTOMER_USER_RECEIVED,
   SINGLE_CUSTOMER_USER_GET_FAILED, SELECTED_CUSTOMER_ID, DELETE_CUSTOMER_USER, CUSTOMER_USER_DELETED, CUSTOMER_USER_DELETION_FAILED

} = constants;


///////////////////////////////////// CUSTOMERS ACTIONS ///////////////////////

export function setCustomerActiveTab(customerActiveTab, selectedCustomerId, activeKey) {

  return (dispatch) => {

    dispatch({
      type: SET_CUSTOMER_ACTIVE_TAB,
      payload: {
        customerActiveTab: customerActiveTab,
        activeKey: activeKey
      }
    });

    dispatch(setSelectedCustomerId(selectedCustomerId))
  }

}

export function clearErrorMessage() {

  return {
    type: CLEAR_ERROR_MESSAGE,
    payload: null
  }

}

export function emptyStatusText() {

  return (dispatch) => {
    dispatch({
      type: CLEAR_STATUS_TEXT
    });
  }

}

export function createCustomer(customer, customerPageOffset) {

  return (dispatch)=> {
    dispatch({type: CREATE_CUSTOMER});

    let endPointURL = 'customers';

    post(endPointURL, customer)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_CREATED
        })

        dispatch(push("/home/customers?page=" + customerPageOffset));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_CREATION_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function getCustomers(customerPageOffset, paginationLimit){

  return (dispatch)=> {
    dispatch({type: CUSTOMER_LIST_REQUEST});

    let endPointURL = 'customers?page=' + customerPageOffset + '&limit=' + paginationLimit;

    get(endPointURL)
      .then((response)=> {

        dispatch({
          type: CUSTOMER_LIST_RECEIVED,
          payload: {
            customers: response.docs,
            customerTotalCount: response.total
          }
        })

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_LIST_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function setSelectedCustomer(selectedCustomer){

  return (dispatch)=> {
    dispatch({
      type: CUSTOMER_SELECTED,
      payload: selectedCustomer
    });
  }

}

export function updateCustomer(customer, customerId, customerPageOffset) {

  return (dispatch)=> {
    dispatch({type: UPDATE_CUSTOMER});

    let endPointURL = 'customers/' + customerId;

    patch(endPointURL, customer)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_UPDATED
        })

        dispatch(push("/home/customers?page=" + customerPageOffset));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_UPDATE_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function deleteCustomer(customerId, customerPageOffset, paginationLimit) {

  return (dispatch)=> {
    dispatch({type: DELETE_CUSTOMER});

    let endPointURL = 'customers/' + customerId;

    deleteRequest(endPointURL)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_DELETED
        })

        dispatch(getCustomers(customerPageOffset, paginationLimit));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_DELETION_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function getSingleCustomer(customerId) {

  return (dispatch)=> {
    dispatch({type: GET_SINGLE_CUSTOMER});

    let endPointURL = 'customers/' + customerId;

    get(endPointURL)
      .then((response)=> {
        dispatch({
          type: SINGLE_CUSTOMER_RECEIVED
        })

        dispatch(setSelectedCustomer(response));

        dispatch(setSelectedCustomerId(customerId));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: SINGLE_CUSTOMER_GET_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function saveCustomerPageOffset(customerPageOffset) {

  return (dispatch) => {
    dispatch({

      type: CURRENT_PAGE_OF_CUSTOMER_LIST,
      payload: {
        customerPageOffset: customerPageOffset
      }

    });
  }

}

export function paginateCustomerToNextOffset(customerPageOffset, paginationLimit) {

  return (dispatch) => {
    dispatch(saveCustomerPageOffset(customerPageOffset));
    dispatch(getCustomers(customerPageOffset, paginationLimit));
  }

}

export function setSelectedCustomerId(customerId) {

  return (dispatch) => {
    dispatch({
      type: SELECTED_CUSTOMER_ID,
      payload: customerId
    });
  }

}

////////////////////////////////// CUSTOMER_CONFIGURATION_ACTIONS //////////////

export function uploadConfigZipFile(file, customerId){

  return (dispatch)=> {

    dispatch({type: CUSTOMER_CONFIGURATION_UPLOAD});

    var data = new FormData();
    data.append('file', file ,file.name);
    data['file'] = file;

    let endPointURL = 'customers/' + customerId + '/configurations';

    fileUpload(endPointURL, data)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_CONFIGURATION_UPLOADED,
          payload: {
            statusText: "Configuration File Uploaded!!!",
            statusType: "success"
          }
        })

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_CONFIGURATION_UPLOAD_FAILED,
            payload: {
              statusText: errorObj.message,
              statusType: "danger"
            }
          });
        })

    })
  }

}

export function getCustomerConfigurations(customerId, customerConfigurationPageOffset, paginationLimit){

  return (dispatch)=> {
    dispatch({type: CUSTOMER_CONFIGURATIONS_REQUEST});

    let endPointURL = 'customers/' + customerId + '/configurations?page=' + customerConfigurationPageOffset + '&limit=' + paginationLimit;

    get(endPointURL)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_CONFIGURATIONS_LIST_RECEIVED,
          payload: {
            configurationList: response.docs,
            customerConfigurationTotalCount: response.total
          }
        })

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_CONFIGURATIONS_LIST_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function deleteCustomerConfiguration(customerId, configurationId, customerConfigurationPageOffset, paginationLimit) {

  return (dispatch)=> {
    dispatch({type: DELETE_CUSTOMER_CONFIGURATION});

    let endPointURL = 'customers/'+customerId+'/configurations/'+configurationId;

    deleteRequest(endPointURL)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_CONFIGURATION_DELETED
        })

        dispatch(getCustomerConfigurations(customerId));

        }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_CONFIGURATION_DELETION_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function updateCustomerConfiguration(configuration, customerId, configurationId, customerConfigurationPageOffset) {

  return (dispatch)=> {
    dispatch({type: UPDATE_CUSTOMER_CONFIGURATION});

    let endPointURL = 'customers/' + customerId + '/configurations/' + configurationId;

    patch(endPointURL, configuration)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_CONFIGURATION_UPDATED
        })

        dispatch(push("/home/customer/" + customerId + "/details/configuration?page=" + customerConfigurationPageOffset));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_CONFIGURATION_UPDATE_FAILED,
            payload: errorObj.message
          });
        })

    })

  }

}

export function setSelectedConfiguration(selectedConfiguration){

  return (dispatch)=> {
    dispatch({
      type:CUSTOMER_CONFIGURATION_SELECTED,
      payload: selectedConfiguration
    });
  }

}

export function getSingleCustomerConfiguration(customerId, configurationId) {

  return (dispatch)=> {
    dispatch({type: GET_SINGLE_CUSTOMER_CONFIGURATION});

    let endPointURL = 'customers/' + customerId + "/configurations/" + configurationId;

    get(endPointURL)
      .then((response)=> {
        dispatch({
          type: SINGLE_CUSTOMER_CONFIGURATION_RECEIVED
        })

        dispatch(setSelectedConfiguration(response));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: SINGLE_CUSTOMER_CONFIGURATION_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function saveCustomerConfigurationPageOffset(customerConfigurationPageOffset) {

  return (dispatch) => {
    dispatch({

      type: CURRENT_PAGE_OF_CUSTOMER_CONFIGURATION_LIST,
      payload: {
        customerConfigurationPageOffset: customerConfigurationPageOffset
      }

    });
  }

}

export function paginateCustomerConfigurationToNextOffset(customerId, customerConfigurationPageOffset, paginationLimit) {

  return (dispatch) => {
    dispatch(saveCustomerConfigurationPageOffset(customerConfigurationPageOffset));
    dispatch(getCustomerConfigurations(customerId, customerConfigurationPageOffset, paginationLimit));
  }

}

/////////////////////////////////// CUSTOMER_USER_ACTIONS ///////////////////////

export function setSelectedCustomerUser(selectedUser){

  return (dispatch)=> {
    dispatch({
      type: CUSTOMER_USER_SELECTED,
      payload:selectedUser
    });
  }

}

export function createCustomerUser(user, userId) {
  return (dispatch)=> {
    dispatch({type: CREATE_CUSTOMER_USER});
    let endPointURL = 'users';

    post(endPointURL, user)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_USER_CREATED
        })

        dispatch(push("/home/customer/" + userId + "/details/users"));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_USER_CREATION_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function getCustomerUsers(customerUserId){

  return (dispatch)=> {
    dispatch({type: CUSTOMER_USER_LIST_REQUEST});
    let endPointURL = 'customers/' + customerUserId + '/users?page=1&limit=20';

    get(endPointURL)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_USER_LIST_RECEIVED,
          payload: response
        })

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_USER_LIST_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function getSingleCustomerUser(customerUserId) {

  return (dispatch)=> {
    dispatch({type: GET_SINGLE_CUSTOMER_USER});

    let endPointURL = 'users/' + customerUserId;

    get(endPointURL)
      .then((response)=> {
        dispatch({
          type: SINGLE_CUSTOMER_USER_RECEIVED
        })

        dispatch(setSelectedCustomerUser(response));


      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: SINGLE_CUSTOMER_USER_GET_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function updateCustomerUser(user, userId) {

  return (dispatch)=> {
    dispatch({type: UPDATE_CUSTOMER_USER});

    let endPointURL = 'users/' + userId;

    patch(endPointURL, user)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_USER_UPDATED
        })

        dispatch(push("/home/customer/" + userId + "/details/users"));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_USER_UPDATION_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function deleteCustomerUser(customerUserId, customerId) {

  return (dispatch)=> {
    dispatch({type: DELETE_CUSTOMER_USER});

    let endPointURL = 'users/'+customerUserId;

    deleteRequest(endPointURL)
      .then((response)=> {
        dispatch({
          type: CUSTOMER_USER_DELETED
        })

        dispatch(getCustomerUsers(customerId));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: CUSTOMER_USER_DELETION_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

import constants from "../constants";
import {parseJSON} from "../../common/utils";
import {get, post, patch, deleteRequest} from "../../common/actions/HTTPmethods";
import {push} from "redux-router";

let {
    CREATE_USER, USER_CREATED, USER_CREATION_FAILED, USER_LIST_REQUEST, USER_LIST_RECEIVED,
    USER_LIST_FAILED, CLEAR_ERROR_MESSAGE, USER_SELECTED, CURRENT_PAGE_OF_USER_LIST, DELETE_USER,
    USER_DELETED, USER_DELETION_FAILED
} = constants;

export function createUser(user, userPageOffset) {

  return (dispatch)=> {
    dispatch({type: CREATE_USER});
    let endPointURL = 'users';

    post(endPointURL, user)
      .then((response)=> {
        dispatch({
          type: USER_CREATED
        })

        dispatch(push("/home/users?page=" + userPageOffset));

        dispatch(getUsers());

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: USER_CREATION_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}


export function clearErrorMessage() {

  return {
    type: CLEAR_ERROR_MESSAGE,
    payload: null
  }

}

export function setSelectedUser(selectedUser){

  return (dispatch)=> {
    dispatch({
      type: USER_SELECTED,
      payload: selectedUser
    });
  }

}

export function getUsers(userPageOffset, paginationLimit){

  return (dispatch)=> {
    dispatch({type: USER_LIST_REQUEST});
    let endPointURL = 'users?page=' + userPageOffset + '&limit=' + paginationLimit;

    get(endPointURL)
      .then((response)=> {
        dispatch({
          type: USER_LIST_RECEIVED,
          payload: {
            users: response.docs,
            userTotalCount: response.total
          }
        })

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: USER_LIST_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function getSingleUser(userId) {

  return (dispatch)=> {
    dispatch({type: GET_SINGLE_USER});

    let endPointURL = 'users/'+customerUserId;

    get(endPointURL)
      .then((response)=> {
        dispatch({
          type: SINGLE_USER_RECEIVED
        })

        dispatch(setSelectedUser(response));


      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: SINGLE_USER_GET_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function deleteUser(userId, userPageOffset, paginationLimit) {

  return (dispatch)=> {
    dispatch({type: DELETE_USER});

    let endPointURL = 'users/' + userId;

    deleteRequest(endPointURL)
      .then((response)=> {
        dispatch({
          type: USER_DELETED
        })

        dispatch(getUsers(userPageOffset, paginationLimit));

      }).catch(error=> {

        parseJSON(error).then((errorObj)=> {
          dispatch({
            type: USER_DELETION_FAILED,
            payload: errorObj.message
          });
        })

    })
  }

}

export function saveUserPageOffset(userPageOffset) {

  return (dispatch) => {
    dispatch({

      type: CURRENT_PAGE_OF_USER_LIST,
      payload: {
        userPageOffset: userPageOffset
      }

    });
  }

}

export function paginateUserToNextOffset(userPageOffset, paginationLimit) {

  return (dispatch) => {
    dispatch(saveUserPageOffset(userPageOffset));
    dispatch(getUsers(userPageOffset, paginationLimit));
  }

}

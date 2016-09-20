import constants from "../constants";
import {push} from "redux-router";
import config from "../../config";
import {parseJSON, checkHttpStatus} from "../../common/utils";
import {get, post} from "../../common/actions/HTTPmethods";

let {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOG_OUT, CLEAN_REDUCER_DATA, SET_REDIRECT_URL_PATH, CLEAR_LOGIN_ERROR_MESSAGE} = constants;

export function userLoggedIn(username, userObject, role, token){

  return {
    type: LOGIN_SUCCESS,
    payload: {
      username: username,
      userObject: userObject,
      role: role,
      token: token
    }
  }

}

export function authenticateUser(credentials, redirectPath) {

  return (dispatch) => {
    dispatch({type: LOGIN_REQUEST});

    let url = 'login';

    return fetch(config.BASE_URL + url, {
            method: 'post',
            headers: {
                //'Authorization': 'Basic bW9iaWxlOmNlbnRyaWM4'
            },
            body: JSON.stringify(credentials)

        }).then(checkHttpStatus)
            .then((response) => {
                return parseJSON(response);
            })
            .then(response => {

              let username = response.user.firstName + " " + response.user.lastName;
              let role = response.user.role;

              saveToLocalStorage(username, JSON.stringify(response.user), role, response.token);

              dispatch(userLoggedIn(username, response.user, role, response.token));

              if(!redirectPath){
                redirectPath = "/home";
              }

              dispatch(push(redirectPath));


            }).catch(error=> {

              parseJSON(error).then((errorObj)=> {
                dispatch({
                  type: LOGIN_FAILED,
                  payload: {
                    statusText: errorObj.message
                  }
                });
              })
          })

  }

}

function saveToLocalStorage(username, userObject, role, token){

  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  localStorage.setItem('userObject', userObject);
  localStorage.setItem('role', role);

}

export function emptyStatuxText() {

  return (dispatch) => {
    dispatch({
      type: CLEAR_LOGIN_ERROR_MESSAGE,
      payload: {
        statusText: null
      }
    });
  }

}

export function logout() {

  return (dispatch) => {

    localStorage.clear();

    dispatch({ type: LOG_OUT });

    dispatch({ type: CLEAN_REDUCER_DATA });

    dispatch(push('/'));
  }

}

function getDispatchUrl(role) {

  switch (role) {
    case 'super_admin':
      return "/home";
    case 'Customer':
      return "/home";
    default:
      return "/";
  }

}


export function checkedIfUserLoggedIn() {

  return (dispatch) => {
    let role = localStorage.getItem('role');
    let url = getDispatchUrl(role);
    dispatch(push(url));
  }

}

export function setUrlPath(redirectURL) {

  return {
    type: SET_REDIRECT_URL_PATH,
    payload: redirectURL
  }

}

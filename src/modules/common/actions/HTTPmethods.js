import {checkHttpStatus, parseJSON} from "../utils";
import config from "../../config";

export function get(nodeURL) {

  let accessToken = localStorage.getItem('token');

  if (accessToken !== null) {
    return fetch(config.BASE_URL + nodeURL, {
      method: 'GET',
      headers: {
      'Authorization': 'Bearer ' + accessToken
      }

    }).then(checkHttpStatus)
    .then((response) => {
      return parseJSON(response);
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      throw error;
    })
  }

}

export function post(nodeURL, data) {

  let accessToken = localStorage.getItem('token');
  let tokenType = 'Bearer ';

  if (tokenType !== null || accessToken !== null) {
    return fetch(config.BASE_URL + nodeURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenType + accessToken
      },
      body: JSON.stringify(data)

    }).then(checkHttpStatus)
    .then((response) => {
      return parseJSON(response);
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      throw error;
    })
  }

}

export function patch(nodeURL, data) {

  let accessToken = localStorage.getItem('token');
  let tokenType = 'Bearer ';

  if (tokenType !== null || accessToken !== null) {
    return fetch(config.BASE_URL + nodeURL, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': tokenType + accessToken
      },
      body: JSON.stringify(data)

    }).then(checkHttpStatus)
    .then((response) => {
      return parseJSON(response);
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      throw error;
    })
  }

}

export function deleteRequest(nodeURL) {

  let accessToken = localStorage.getItem('token');
  let tokenType = 'Bearer ';

  if (tokenType !== null || accessToken !== null) {
    return fetch(config.BASE_URL + nodeURL, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': tokenType + accessToken
      }

    }).then(checkHttpStatus)
    .then((response) => {
      return parseJSON(response);
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      throw error;
    })
  }

}

export function fileUpload(nodeURL, data) {

  let accessToken = localStorage.getItem('token');
  let tokenType = 'Bearer ';
  let authorization = tokenType + accessToken;

  var headers = {
    'Accept': 'application/json',
    'Authorization': authorization
  }

  if (tokenType !== null || accessToken !== null) {
    return fetch(config.BASE_URL + nodeURL, {
      method: 'post',
      headers: headers,
      body: data

    }).then(checkHttpStatus)
    .then((response) => {
      return parseJSON(response);
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      throw error;
    })
  }

}

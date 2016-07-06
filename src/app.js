import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./modules/common/containers/Root";
import configureStore from "./modules/common/stores/configureStore";
//import {userLoggedIn} from './modules/login/actions/auth';

const target = document.getElementById('root');
const store = configureStore(window.__INITIAL_STATE__);

const node = (
  <Root store={store}/>
);

// let token = localStorage.getItem('token');
// let username = localStorage.getItem('username');
// let userObject = localStorage.getItem('userObject');
// let role = localStorage.getItem('role');

// if (token !== null) {
//     store.dispatch(userLoggedIn(username, JSON.parse(userObject), role, token));
// }

ReactDOM.render(node, target);

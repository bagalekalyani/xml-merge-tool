import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./modules/common/containers/Root";
import configureStore from "./modules/common/stores/configureStore";

const target = document.getElementById('root');
const store = configureStore(window.__INITIAL_STATE__);

const node = (
  <Root store={store}/>
);

ReactDOM.render(node, target);

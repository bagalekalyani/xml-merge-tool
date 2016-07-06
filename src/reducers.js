import {combineReducers} from "redux";
import {routerStateReducer} from "redux-router";
import auth from "./modules/login/reducers/auth";
import app from "./modules/common/reducers/app";
import header from "./modules/header/reducers/header";

export default combineReducers({
  app,
  auth,
  header,
  router: routerStateReducer
});

import {combineReducers} from "redux";
import {routerStateReducer} from "redux-router";
import auth from "./modules/login/reducers/auth";
import app from "./modules/common/reducers/app";
import header from "./modules/header/reducers/header";
import customer from "./modules/customer/reducers/customer";
import user from "./modules/user/reducers/user";

export default combineReducers({
  app,
  auth,
  header,
  customer,
  user,
  router: routerStateReducer
});

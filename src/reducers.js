import {combineReducers} from "redux";
import {routerStateReducer} from "redux-router";
import auth from "./modules/login/reducers/auth";

export default combineReducers({
  auth,
  router: routerStateReducer
});

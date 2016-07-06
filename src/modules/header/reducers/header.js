import {createReducer} from "../../common/utils";
import _ from "lodash";

const initialState = {
  headerActiveTab:null
};

export default createReducer(initialState, {
  SET_HEADER_ACTIVE_TAB: (state, payload) => {

    return Object.assign({}, state, {
      headerActiveTab: payload.activeTab
    });

  }

});

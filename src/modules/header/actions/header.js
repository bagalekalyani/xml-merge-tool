import constants from "../constants";

let {
    SET_HEADER_ACTIVE_TAB
} = constants;


export function setHeaderActiveTab(activeTab) {

    return {
        type: SET_HEADER_ACTIVE_TAB,
        payload: {
          activeTab: activeTab
        }
    }

}

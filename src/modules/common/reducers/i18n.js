import {createReducer} from "../../common/utils";
import _ from "lodash";

const initialState = {
  stringTranslations: {

    "lStrLogin": {
      "en": "Login",
      "fr": "S'identifier",
      "de": "Log in",
      "it": "Accesso",
      "zh": "登录",
      "pt_BR": "Entrar"
    },
    "lStrLogout": {
      "en": "Login",
      "fr": "Se déconnecter",
      "de": "Uitloggen",
      "it": "Disconnettersi",
      "zh": "登出",
      "pt_BR": "Sair"
    },

  }
};

export default createReducer(initialState, {


});

import { createStore } from "vuex";

import settings from "./modules/settings";

export default createStore({
  state: {},
  actions: {
    init(context) {
      context.dispatch("initSettings");
    }
  },
  mutations: {},
  modules: {
    settings
  }
});

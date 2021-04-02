export default {
  state() {
    return {
      settings: {
        url: "",
        token: ""
      }
    };
  },
  actions: {
    initSettings(context) {
      let jsonSettings = localStorage.getItem("settings");
      if (jsonSettings !== null) {
        context.commit("updateSettings", JSON.parse(jsonSettings));
      }
    }
  },
  mutations: {
    updateSettings(state, newSettings) {
      state.settings = newSettings;
      localStorage.setItem("settings", JSON.stringify(newSettings));
    }
  },
  getters: {
    settings(state) {
      return state.settings;
    }
  }
};

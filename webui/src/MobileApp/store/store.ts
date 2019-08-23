import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentVisitId: null as any,
    currentVisitIndicator: false,
    refreshSelfItemIndicator: false,
    refreshSubItemIndicator: false,
    refreshDailyIndicator: false
  },
  mutations: {
    setCurrentVisitId(state, visitId) {
      state.currentVisitId = visitId;
      state.currentVisitIndicator = !state.currentVisitIndicator;
    },
    removeCurrentVisitId(state) {
      state.currentVisitId = null;
      state.currentVisitIndicator = !state.currentVisitIndicator;
    },
    changeRefreshSelfItemIndicator(state) {
      state.refreshSelfItemIndicator = !state.refreshSelfItemIndicator;
    },
    changeRefreshSubItemIndicator(state) {
      state.refreshSubItemIndicator = !state.refreshSubItemIndicator;
    },
    changeRefreshDailyIndicator(state) {
      state.refreshDailyIndicator = !state.refreshDailyIndicator;
    }
  },
  getters: {
    isVisitingCustomer: state => {
      if (state.currentVisitId) {
        return true;
      }
      return false;
    }
  },
  actions: {},
  modules: {}
});

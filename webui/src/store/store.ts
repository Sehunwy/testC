import Vue from "vue";
import Vuex from "vuex";
import storeOrder from "./aps/storeOrder";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    aps: {
      namespaced: true,
      modules: {
        order: storeOrder
      }
    }
  }
});

import { StoreOptions } from "vuex";

let order: StoreOptions<any> = {
  state: {
    queryArguments: {
      rangeCol: "CreateTime",
      range: [new Date(), new Date()],
      keywards: "",
      quaOperator: "gt",
      qua: 0,
      skip: 0,
      limit: 50
    }
  },
  getters: {},
  mutations: {
    setKeywards(state, value) {
      state.keywards = value;
    }
  },
  actions: {}
};
export default order;

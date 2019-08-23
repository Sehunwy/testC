import { Commit, Store, Module, StoreOptions, ModuleOptions } from "vuex";
const dox='do_thing';

interface IMaterial {
  Id?: string;
  Cd?: string;
  Ctrl?: string;
}

const opt: StoreOptions<IMaterial[]> = {
  state: [],
  getters: {
    x:state=>state.filter(c=>c.Cd==='dd')
  },
  mutations:{
    m1:state=>{}
  },
  actions: {
    // [dox]:state=>state
  },
};
// opt.state = {};
// opt.getters={
//     Id:(state)=>state.Id,
//     Cd:(state)=>state.Cd,
// };

// let opt:StoreOptions<IMaterial>={};
// opt.actions

import Vue from "vue";
import store from "./store/store";
import MobileApp from "./MobileApp";
import router from "./mobileRouter";
import "@/plugins/mobile";
import "@/utils";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(MobileApp)
}).$mount("#app");

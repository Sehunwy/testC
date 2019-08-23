/**
 * @module MobileApp\main
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import BaiduMap from "@/plugins/map";
import common from "@/MobileApp/utils/common";

@Component
export default class Main extends Vue {
  [x: string]: any;
  private active = 0;

  created() {
    switch (this.$route.path) {
      case "/main/visit":
        this.active = 0;
        break;
      case "/main/item":
        this.active = 1;
        break;
      case "/main/customer":
        this.active = 2;
        break;
      case "/main/message":
        this.active = 3;
        break;
      case "/main/workbench":
        this.active = 4;
        break;
      default:
        this.active = 0;
    }
    console.log(this.active);
  }

  mounted() {
    this.monitorGeoLocation();
  }

  // private startVisiting() {
  //   this.$store.commit("setCurrentCustomerVisit", '成都圣恩');
  // }

  // private finishVisiting() {
  //   this.$store.commit("removeCurrentCustomerVisit");
  // }

  // get currentCustomerVisit() {
  //   return this.$store.state.currentCustomerVisit;
  // }

  // get isVisitingCustomer() {
  //   return this.$store.getters.isVisitingCustomer;
  // }

  private monitorGeoLocation() {
    // BaiduMap.getGeolocation()
    //   .then(res => {
    //     console.log(res.point);
    //   })
    //   .catch(errorMsg => {
    //     console.log(errorMsg);
    //   });
    // setTimeout(this.monitorGeoLocation, 1000);
  }
}

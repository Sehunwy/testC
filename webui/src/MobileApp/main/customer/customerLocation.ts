/**
 * @module MobileApp\main\customer
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import location from "@/MobileApp/components/location";

@Component({
  components: { location }
})
export default class CustomerLocation extends Vue {
  [x: string]: any;

  private goBack(){
    this.$router.back();
  }

  private locationCompleted(locationInfo) {
    this.$router.replace({
      name: "createCustomer",
      params: { location: locationInfo }
    });
  }
}

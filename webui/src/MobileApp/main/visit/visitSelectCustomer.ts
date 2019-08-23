/**
 * @module MobileApp\main\visit
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import selectCustomer from "@/MobileApp/components/selectCustomer";

@Component({
  components: { selectCustomer }
})
export default class VisitSelectCustomer extends Vue {
  [x: string]: any;
  private goBack() {
    this.$router.back();
  }

  private selectCustomerComplete(customer) {
    if (!customer || !customer.Id) {
      return;
    }
    this.$router.replace({
      path: "/visitLocation",
      query: {
        customerId: customer.Id,
        customerName: customer.Name
      }
    });
  }
}

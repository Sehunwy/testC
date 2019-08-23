/**
 * @module MobileApp\main\visit
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import common from "@/MobileApp/utils/common";

@Component
export default class VisitCompleted extends Vue {
  [x: string]: any;
  private visitId = "";
  private customerId = "";
  private customerName = "";

  created() {
    this.visitId = this.$route.query.visitId;
    this.customerId = this.$route.query.customerId;
    this.customerName = this.$route.query.customerName;
  }

  private goCustomerDetails() {
    this.$router.replace({
      path: "/customerDetails",
      query: { id: this.customerId }
    });
  }

  private goCreateItem() {
    if (!this.customerId || !this.customerName) {
      return;
    }
    this.$router.replace({
      path: "/createItem",
      query: {
        customerId: this.customerId,
        customerName: this.customerName
      }
    });
  }

  private goShare() {
    common.toastMessage("功能正在开发中!", 2000);
  }

  private goBack() {
    this.$router.back();
  }
}

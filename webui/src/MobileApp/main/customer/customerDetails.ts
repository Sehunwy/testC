/**
 * @module MobileApp\main\customer
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import crmLabel from "@/MobileApp/components/crmLabel";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";
import AppCookies from "../../appCookies";
import customerDynamic from "./customerDynamic";
@Component({
  components: { crmLabel, crmLoading, customerDynamic }
})
export default class CustomerDetails extends Vue {
  [x: string]: any;
  private customerId = "";
  private customerDetails = {} as IndexObject;
  private isBusy = false;
  private tabContentHeight = 0;

  created() {
    this.customerId = this.$route.query.id;
    this.getCustomerDetails();
  }

  mounted() {
    this.tabContentHeight = document.documentElement!.clientHeight - 90 - 50;
    console.log("当前是客户详情界面.....");
  }

  private getCustomerDetails() {
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.customerService",
        className: "CustomerService",
        method: "getCustomerDetails",
        args: {
          customerId: this.customerId
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.customerDetails = res.data.data;
        } else {
          common.toastMessage("查询客户详情出错!" + res.data.error);
        }
      })
      .catch(res => {
        common.toastMessage("查询客户详情异常!" + res);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private goBack() {
    this.$router.back();
  }

  private goCreateItem() {
    if (!this.customerDetails || !this.customerDetails.Id) {
      return;
    }
    this.$router.push({
      path: "/createItem",
      query: {
        customerId: this.customerDetails.Id,
        customerName: this.customerDetails.Name
      }
    });
  }

  private goVisitLocation() {
    if (!this.customerDetails || !this.customerDetails.Id) {
      return;
    }
    this.$router.push({
      path: "/visitLocation",
      query: {
        customerId: this.customerDetails.Id,
        customerName: this.customerDetails.Name
      }
    });
  }

  private goCreateContact() {
    if (!this.customerDetails || !this.customerDetails.Id) {
      return;
    }
    this.$router.push({
      path: "/createContact",
      query: {
        customerId: this.customerDetails.Id
      }
    });
  }

  private dialPhoneNumber(phoneNumber) {
    if (!phoneNumber) {
      return;
    }
    window.location.href = "tel:" + phoneNumber;
  }
}

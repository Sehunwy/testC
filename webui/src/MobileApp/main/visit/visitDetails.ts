/**
 * @module MobileApp\main\visit
 */

import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import format from "@/plugins/format";
import crmLabel from "@/MobileApp/components/crmLabel";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";
import AppCookies from "../../appCookies";
import crmPhoto from "@/MobileApp/components/crmPhoto";

@Component({
  components: { crmLabel, crmLoading, crmPhoto },
  filters: {
    formatDateTime(date, dateFormat) {
      return format.formatDateTime(date, dateFormat);
    },
    formatVisitDuration(beginTime, finishTime) {
      return format.formatVisitDuration(beginTime, finishTime);
    }
  }
})
export default class VisitDetails extends Vue {
  [x: string]: any;
  private currentVisitId = "";
  private visitDetails = {};
  private isBusy = false;
  private currentPersonId;

  created() {
    this.currentVisitId = this.$route.query.visitId;
    this.currentPersonId = AppCookies.instance.getPersonId();
    this.getVisiteDetails();
  }

  private getVisiteDetails() {
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.visit.visitService",
        className: "VisitService",
        method: "getVisitDetails",
        args: {
          id: this.currentVisitId
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.visitDetails = res.data.data;
        } else {
          common.toastMessage("查询拜访详情失败!" + res.data.error);
        }
      })
      .catch(res => {
        common.toastMessage("查询拜访详情异常!" + res);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private goCreateVisitAdditional(id) {
    this.$router.push({
      path: "/createVisitAdditional",
      query: { visitId: id }
    });
  }
  private goCustomerDetails(customerId) {
    this.$router.push({
      path: "/customerDetails",
      query: { id: customerId }
    });
  }

  private goBack() {
    this.$router.back();
  }
}

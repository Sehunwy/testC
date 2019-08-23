/**
 * @module MobileApp\main\daily\dailyDetails
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import crmLoading from "@/MobileApp/components/crmLoading";
import format from "@/plugins/format";
import common from "@/MobileApp/utils/common";

@Component({
  components: { crmLoading },
  filters: {
    formatDateTime(date) {
      return format.formatDateTime(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
})
export default class DailyDetails extends Vue {
  [x: string]: any;
  private dailyId = "";
  private isBusy = false;
  private dailyDetails: any = {};

  created() {
    this.dailyId = this.$route.query.Id;
    this.getDailyDetail();
  }

  private goBack() {
    this.$router.back();
  }

  private getDailyDetail() {
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.attendance.dailyReportService",
        className: "DailyReportService",
        method: "getById",
        args: {
          id: this.dailyId
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.dailyDetails = res.data.data;
        } else {
          common.toastMessage("查询日报详情失败!" + res.data.error);
        }
      })
      .catch(res => {
        common.toastMessage("查询日报详情异常!" + res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }
}

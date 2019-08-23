/**
 * @module MobileApp\main\daily\createDaily
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppCookies from "../../appCookies";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";

@Component({
  components: { crmLoading }
})
export default class CreateDaily extends Vue {
  [x: string]: any;
  private dailyContent = "";
  private isBusy = false;

  private goBack() {
    this.$router.back();
  }

  private createDailyReport() {
    if (!this.checkUserInput()) {
      return;
    }
    let currentPersonId = AppCookies.instance.getPersonId();
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.attendance.dailyReportService",
        className: "DailyReportService",
        method: "createDailyReport",
        args: {
          personId: currentPersonId,
          content: this.dailyContent
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.notifyRefreshDailyIndicator();
          this.goBack();
        } else {
          common.toastMessage("提交失败!" + res.data.error);
        }
      })
      .catch(res => {
        common.toastMessage("提交异常!" + res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private notifyRefreshDailyIndicator() {
    this.$store.commit("changeRefreshDailyIndicator");
  }

  private checkUserInput() {
    if (
      !this.dailyContent ||
      this.dailyContent === "" ||
      this.dailyContent.trim() === ""
    ) {
      common.toastMessage("请先填写日报内容!");
      return false;
    }
    return true;
  }
}

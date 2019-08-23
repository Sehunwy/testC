/**
 * @module MobileApp\main\visit\createVisitAdditional
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import common from "@/MobileApp/utils/common";
import crmLoading from "@/MobileApp/components/crmLoading";
import AppCookies from "../../appCookies";

@Component({
  components: { crmLoading }
})
export default class CreateVisitAdditional extends Vue {
  private visitContentAdditional = "";
  private isBusy = false;

  private goBack() {
    this.$router.back();
  }
  private createVisitAdditional() {
    if (!this.checkUserInput()) {
      return;
    }
    let currentPersonId = AppCookies.instance.getPersonId();
    let id = this.$route.query.visitId;
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.visit.visitService",
        className: "VisitService",
        method: "createVisitAdditional",
        args: {
          personId: currentPersonId,
          visitId: id,
          content: this.visitContentAdditional
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
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

  private checkUserInput() {
    if (
      !this.visitContentAdditional ||
      this.visitContentAdditional === "" ||
      this.visitContentAdditional.trim() === ""
    ) {
      common.toastMessage("请先填写拜访内容补充!");
      return false;
    }
    return true;
  }
}

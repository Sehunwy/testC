/**
 * @module MobileApp\main\workbench
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import common from "@/MobileApp/utils/common";
import crmCopyright from "@/MobileApp/components/crmCopyright";
@Component({
  components: { crmCopyright }
})
export default class Workbench extends Vue {
  [x: string]: any;
  private showSettingActions = false;
  private refreshAction = { name: "刷新" };
  private exitAction = { name: "退出登录" };
  private changePassword = { name: "修改密码" };
  private settingActions = [] as IndexObject;
  private personName = "";

  created() {
    this.personName = AppCookies.instance.getPersonName();
    this.settingActions.push(this.refreshAction);
    this.settingActions.push(this.changePassword);
    this.settingActions.push(this.exitAction);
  }

  private openSettingActionsheet() {
    this.showSettingActions = true;
  }

  private onSelectSettingAction(action) {
    if (!action) {
      return;
    }
    if (action.name === this.refreshAction.name) {
      this.reloadApp();
    } else if (action.name === this.exitAction.name) {
      this.exitSignin();
    } else if (action.name === this.changePassword.name) {
      this.changePW();
    }
    return;
  }

  private reloadApp() {
    window.location.reload(true);
  }

  private exitSignin() {
    AppCookies.instance.removeAll();
    window.location.reload(true);
  }

  private changePW() {
    this.$router.push("/changePassword");
  }

  private toDailyList() {
    this.$router.push("/dailyList");
  }

  private toAnalysisReport() {
    this.$router.push("/report");
  }
}

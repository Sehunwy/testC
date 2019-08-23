/**
 * @module MobileApp\main\workbench
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import common from "@/MobileApp/utils/common";
@Component
export default class ChangePassword extends Vue {
  [x: string]: any;
  private info = {
    entCd: "",
    signinName: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };
  created() {
    this.info.signinName = AppCookies.instance.getAccountName();
    this.info.entCd = AppCookies.instance.getEntCd();
  }
  private goBack() {
    this.$router.back();
  }
  private modifyPassword() {
    if (!this.checkPasswordInput()) {
      return;
    }
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.permission.signinService",
        className: "SigninService",
        method: "modifySigninPassword",
        args: {
          entCd: this.info.entCd,
          signinName: this.info.signinName,
          oldPassword: this.info.oldPassword,
          newPassword: this.info.newPassword
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          common.toastMessage("修改成功!" , 2000);
          AppCookies.instance.removeAll();
          window.location.reload(true);
        } else {
          common.toastMessage("修改密码失败!" + res.data.error, 2000);
          console.log(res);
        }
      })
      .catch(res => {
        common.toastMessage("修改密码异常!" + res, 2000);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }
  private checkPasswordInput() {
    if (!this.info.oldPassword) {
      common.toastMessage("原密码不能为空!");
      return false;
    }
    if (!this.info.newPassword) {
      common.toastMessage("新密码不能为空!");
      return false;
    }
    if (!this.info.confirmPassword) {
      common.toastMessage("确认密码不能为空!");
      return false;
    }
    if (this.info.confirmPassword !== this.info.newPassword) {
      common.toastMessage("新密码和确认密码不一致!");
      return false;
    }
    return true;
  }
}

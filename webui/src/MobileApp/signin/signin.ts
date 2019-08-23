/**
 * @module MobileApp\signin
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../appCookies";
import common from "@/MobileApp/utils/common";

@Component
export default class Signin extends Vue {
  [x: string]: any;

  private accountName = "";
  private password = "";
  private isBusy = false;

  created() {
    this.accountName = AppCookies.instance.getAccountName();
  }

  private signin() {
    if (!this.checkUserInput()) {
      return;
    }
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.permission.signinService",
        className: "SigninService",
        method: "signin",
        args: {
          entCd: "SNS",
          signinName: this.accountName,
          password: this.password
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          if (res.data.data) {
            this.signinSuccessed(res.data.data);
          } else {
            common.toastMessage("用户名或密码错误!", 2000);
          }
        } else {
          common.toastMessage("登录失败!" + res.data.error, 2000);
          console.log(res);
        }
      })
      .catch(res => {
        common.toastMessage("登录异常!" + res, 2000);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private checkUserInput() {
    if (!this.accountName || !this.password) {
      common.toastMessage("用户名或密码不能为空!");
      return false;
    }
    return true;
  }

  private signinSuccessed(data) {
    common.toastMessage("登录成功", 600);
    // 写Cookie
    AppCookies.instance.setEntId(data.EntId);
    AppCookies.instance.setEntCd(data.EntCd);
    AppCookies.instance.setPersonId(data.PersonId);
    AppCookies.instance.setPersonName(data.PersonName);
    AppCookies.instance.setAccountId(data.Id);
    AppCookies.instance.setAccountName(data.SigninName);
    AppCookies.instance.setIsLeader(data.IsLeader);
    AppCookies.instance.setIsSalesPerson(data.IsSalesPerson);
    AppCookies.instance.setSalesAreaId(data.SalesAreaId);
    AppCookies.instance.setSalesArea(data.SalesArea);

    // 跳转
    this.skipPage();
  }

  private forgetPassword() {
    common.toastMessage("请联系管理员找回密码!", 4000);
  }

  private createAccount() {
    this.$router.push("/signup");
  }

  private skipPage() {
    this.$router.replace("/main/visit");
  }
}

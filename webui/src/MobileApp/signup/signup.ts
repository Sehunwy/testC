/**
 * @module MobileApp\signup
 */

import Vue from "vue";
import { Component } from "vue-property-decorator";
import common from "@/MobileApp/utils/common";
import { IndexObject } from "@/types";

@Component
export default class Signup extends Vue {
  [x: string]: any;
  private isBusy = false;
  private verificationCode = "";
  private tele = "";
  private password = "";
  private confirmPassword = "";
  private confirmCode = "";
  private nickname = "";
  private canvasWidth = 90;
  private canvasHeight = 30;

  mounted() {
    this.createCode();
  }
  
  private signup() {
    if (!this.checkUserInput()) {
      return;
    }
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.permission.signupService",
        className: "SignupService",
        method: "signup",
        args: {
        telephone: this.tele,
        name: this.nickname,
        password: this.password
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          common.dialogAlert("提示", "注册成功!").then(() => {
            this.goBack();
          });
        } else {
          common.toastMessage("注册失败!" + res.data.error, 2000);
          console.log(res);
        }
      })
      .catch(res => {
        common.toastMessage("注册异常!" + res, 2000);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private goBack() {
    this.$router.back();
  }

  private rand() {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let arr = str.split("");
    let ranNum = Math.floor(Math.random() * 36);
    let randomCode = arr[ranNum];
    return randomCode;
  }

  private drawline(canvas, context) {
    context.beginPath();
    context.moveTo(
      Math.floor(Math.random() * (this as any).canvasWidth),
      Math.floor(Math.random() * (this as any).canvasHeight)
    );
    context.lineTo(
      Math.floor(Math.random() * (this as any).canvasWidth),
      Math.floor(Math.random() * (this as any).canvasHeight)
    );
    context.lineWidth = 1;
    context.strokeStyle = "#275DB3";
    context.stroke();
  }

  private createCode() {
    let code = "";
    let myCanvas = this.$refs.mycanvas as IndexObject;
    let context = myCanvas.getContext("2d");
    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    context.strokeStyle = "#FFF";
    context.strokeRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (let i = 0; i < 20; i++) {
      this.drawline(myCanvas, context);
    }
    for (let k = 0; k < 4; k++) {
      context.font = "20px Arial";
      context.save();
      let rA = 1 - Math.random() * 2;
      let angle = rA / 8;
      let ranNum = this.rand();
      context.rotate(angle);
      context.fillText(ranNum, 18 * k + 4, 25);
      context.restore();
      code += ranNum;
    }
    this.verificationCode = code;
  }

  private checkUserInput() {
    let reg = /^1[3456789]\d{9}$/;
    if (!this.tele) {
      common.toastMessage("手机号不能为空!");
      return false;
    }
    if (!reg.test(this.tele)) {
      common.toastMessage("请输入有效的手机号码");
      return false;
    }
    if (!this.nickname) {
      common.toastMessage("昵称不能为空!");
      return false;
    }
    if (!this.password || !this.confirmPassword) {
      common.toastMessage("密码或确认密码不能为空!");
      return false;
    }
    if (this.password !== this.confirmPassword) {
      common.toastMessage("密码和确认密码不一致!");
      return false;
    }
    if (!this.confirmCode) {
      common.toastMessage("验证码不能为空!");
      return false;
    }
    if (this.confirmCode.toUpperCase() !== this.verificationCode) {
      common.toastMessage("验证码输入错误!");
      return false;
    }
    return true;
  }
}

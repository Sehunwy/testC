/**
 * @module MobileApp\main\person
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import AppCookies from "../../appCookies";
import common from "@/MobileApp/utils/common";

@Component
export default class PersonDetails extends Vue {
  [x: string]: any;
  private active = 0;
  private personInfo = {};
 
  mounted() {
    this.queryPersonInfo();
  }

  private queryPersonInfo() {
    this.personInfo = this.$route.query.PersonInfo;
  }
  
  private onClickLeft() {
    this.$router.back();
  }

  private dialPhoneNumber(phoneNumber) {
    if (!phoneNumber) {
      common.toastMessage("此用户未配置电话信息,请联系管理员!", 2000);
      return;
    }
    window.location.href = "tel:" + phoneNumber;
  }

}

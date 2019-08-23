/**
 * @module MobileApp\main\visit
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import location from "@/MobileApp/components/location";
import common from "@/MobileApp/utils/common";

@Component({
  components: { location }
})
export default class VisitLocation extends Vue {
  [x: string]: any;
  private currentPersonId = "";
  private currentEntId = "";
  private currentEntCd = "";
  private currentCustomerId = "";
  private currentCustomerName = "";
  private currentLocation: any = {};
  private currentLocationPoint: any = {};
  private currentLocationDesc = "";
  private isBusy = false;

  created() {
    this.currentCustomerId = this.$route.query.customerId;
    this.currentCustomerName = this.$route.query.customerName;
    this.currentEntId = AppCookies.instance.getEntId();
    this.currentEntCd = AppCookies.instance.getEntCd();
    this.currentPersonId = AppCookies.instance.getPersonId();
  }

  private locationCompleted(locationInfo) {
    this.currentLocation = locationInfo;
    this.currentLocationPoint = locationInfo.point;
    this.currentLocationDesc = locationInfo.address;
    this.beginVisit();
  }

  private beginVisit() {
    if (!this.checkBeginVisitInfo()) {
      return;
    }
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.visit.visitService",
        className: "VisitService",
        method: "beginVisit",
        args: {
          personId: this.currentPersonId,
          beginData: {
            EntId: this.currentEntId,
            EntCd: this.currentEntCd,
            CustomerId: this.currentCustomerId,
            CustomerName: this.currentCustomerName,
            BeginLongitude: this.currentLocationPoint.lng,
            BeginLatitude: this.currentLocationPoint.lat,
            BeginLocationDesc: this.currentLocationDesc
          }
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.notifyStartCurrentVisit(res.data.data);
          this.goCreateVisit(res.data.data);
        } else {
          common.toastMessage("开始拜访失败!" + res.data.error);
        }
        console.log(res);
      })
      .catch(res => {
        common.toastMessage("开始拜访异常!" + res);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private notifyStartCurrentVisit(visitId) {
    this.$store.commit("setCurrentVisitId", visitId);
  }

  private checkBeginVisitInfo() {
    if (!this.currentCustomerId) {
      common.toastMessage("没有指定拜访客户,请返回重试!");
      return false;
    }
    if (!this.currentLocation || !this.currentLocationPoint) {
      common.toastMessage("没有获取到定位信息,请尝试重新定位!");
      return false;
    }
    if (!this.currentPersonId) {
      common.toastMessage("未能确定您的登录信息,请退出重新登录!");
      return false;
    }
    return true;
  }

  private goCreateVisit(visitId) {
    this.$router.replace({
      path: "/createVisit",
      query: {
        newVisitId: visitId
      }
    });
  }

  private selectionChanged(location) {}

  private goBack() {
    common
      .dialogConfirm("温馨提示", "请确认要取消拜访?")
      .then(() => {
        // on confirm
        this.$router.back();
      })
      .catch(() => {
        // on cancel
      });
  }
}

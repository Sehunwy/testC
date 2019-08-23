/**
 * @module MobileApp\main\visit
 */

import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import { Toast } from "vant";
import AppCookies from "../../appCookies";
import BaiduMap from "@/plugins/map";
import crmLoading from "@/MobileApp/components/crmLoading";
import format from "@/plugins/format";
import common from "@/MobileApp/utils/common";
import crmPhoto from "@/MobileApp/components/crmPhoto";

@Component({
  components: { crmLoading, crmPhoto }
})
export default class CreateVisit extends Vue {
  [x: string]: any;
  private currentPersonId = "";
  private currentVisitId: any = null;
  private currentVisit: any = {};
  private visitBeginTime: any = null;
  private timer: any = null;
  private formatVisitBeginTime = "";
  private visitDuration = "";
  private isBusyQuery = false;
  private isBusyFinish = false;
  private finishVisitInfo = {
    FinishLongitude: "",
    FinishLatitude: "",
    FinishLocationDesc: "",
    VisitPerson: "",
    VisitPersonPost: "",
    VisitPersonPhone: "",
    PeerPerson: "",
    Content: "",
    PictureIds: []
  };

  private onEnter() {
    this.currentPersonId = AppCookies.instance.getPersonId();
    this.currentVisitId = this.$route.query.newVisitId;
    if (!this.currentVisitId) {
      common.toastMessage("没有拜访信息");
      this.goBack();
      return;
    }
    this.queryCurrentVisit();
  }

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.onEnter();
    });
  }

  private queryCurrentVisit() {
    this.isBusyQuery = true;
    this.$Api
      .invoke({
        moduleName: "crm.visit.visitService",
        className: "VisitService",
        method: "getById",
        args: {
          id: this.currentVisitId
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.queryCurrentVisitSuccess(res);
        } else {
          common.toastMessage("查询拜访数据失败!" + res.data.error);
        }
        console.log(res);
      })
      .catch(res => {
        common.toastMessage("查询拜访数据异常!" + res);
        console.log(res);
      })
      .finally(() => {
        this.isBusyQuery = false;
      });
  }

  private queryCurrentVisitSuccess(res) {
    if (!res.data.data.IsVisiting) {
      common.dialogAlert("提示", "当前的拜访已结束!").then(() => {
        this.goBack();
      });
      return;
    }
    this.currentVisit = res.data.data;
    if (!this.currentVisit.PictureIds) {
      this.currentVisit.PictureIds = [];
    }
    this.initFinishVisitInfo(res.data.data);
    this.formatVisitBeginTime = format.formatDateTime(
      this.currentVisit.CreateTime,
      "yyyy-MM-dd hh:mm:ss"
    );
    this.startComputeDurationTimer();
  }

  private initFinishVisitInfo(visit) {
    this.finishVisitInfo.VisitPerson = visit.VisitPerson;
    this.finishVisitInfo.VisitPersonPost = visit.VisitPersonPost;
    this.finishVisitInfo.VisitPersonPhone = visit.VisitPersonPhone;
    this.finishVisitInfo.PeerPerson = visit.PeerPerson;
    this.finishVisitInfo.Content = visit.Content;
    this.finishVisitInfo.PictureIds = visit.PictureIds;
  }

  private startComputeDurationTimer() {
    this.visitBeginTime = new Date(this.currentVisit.CreateTime);
    this.visitDuration = this.computeVisitDuration(this.visitBeginTime);
    this.timer = setInterval(() => {
      this.visitDuration = this.computeVisitDuration(this.visitBeginTime);
    }, 1000);
  }

  private computeVisitDuration(beginTime) {
    let currentDate = new Date();
    let timeDiff = currentDate.getTime() - beginTime.getTime();
    if (timeDiff < 0) {
      return "00时00分00秒";
    }
    let allSeconds = Math.floor(timeDiff / 1000);
    let hours = Math.floor(allSeconds / 3600);
    let minutes = Math.floor((allSeconds - hours * 3600) / 60);
    let seconds = allSeconds - hours * 3600 - minutes * 60;
    return hours + "时" + minutes + "分" + seconds + "秒";
  }

  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private saveVisitData() {
    this.saveVisitDataPromise()
      .then(res => {
        common.toastMessage("已保存");
      })
      .catch(res => {
        console.log(res);
      });
  }

  private saveVisitDataThenGoBack() {
    let saveToast = Toast.loading({
      duration: 0,
      forbidClick: true,
      message: "正在保存..."
    });
    this.saveVisitDataPromise()
      .then(res => {
        Toast.clear();
        this.goBack();
      })
      .catch(res => {
        Toast.clear();
        console.log(res);
      });
  }

  private onPhotoChange() {
    this.saveVisitDataPromise()
      .then(res => {
        console.log("已保存");
      })
      .catch(res => {
        console.log(res);
      });
  }

  private saveVisitDataPromise() {
    return new Promise((resolve, reject) => {
      this.$Api
        .invoke({
          moduleName: "crm.visit.visitService",
          className: "VisitService",
          method: "saveVisitData",
          args: {
            personId: this.currentPersonId,
            visitId: this.currentVisitId,
            visitData: this.finishVisitInfo
          }
        })
        .then(res => {
          if (res.data && res.data.isSuccess) {
            resolve(true);
          } else {
            common.toastMessage("保存拜访数据失败!" + res.data.error);
            reject(false);
          }
        })
        .catch(res => {
          common.toastMessage("保存拜访数据异常!" + res);
          reject(false);
        })
        .finally(() => {});
    });
  }

  private getGeolocationThenFinishVisit() {
    if (!this.checkFinishVisitInfo()) {
      return;
    }
    BaiduMap.getGeolocation()
      .then(res => {
        this.finishVisitInfo.FinishLongitude = res.point.lng;
        this.finishVisitInfo.FinishLatitude = res.point.lat;
        this.finishVisitInfo.FinishLocationDesc = BaiduMap.generateAddressDesc(
          res.address
        );
        this.finishVisit();
      })
      .catch(errorMsg => {
        console.log(errorMsg);
        this.finishVisit();
      });
  }

  private finishVisit() {
    this.isBusyFinish = true;
    this.$Api
      .invoke({
        moduleName: "crm.visit.visitService",
        className: "VisitService",
        method: "finishVisit",
        args: {
          personId: this.currentPersonId,
          visitId: this.currentVisitId,
          finishData: this.finishVisitInfo
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.notifyFinishCurrentVisit();
          this.goVisitCompleted();
        } else {
          common.toastMessage("结束拜访失败!" + res.data.error);
        }
        console.log(res);
      })
      .catch(res => {
        common.toastMessage("结束拜访异常!" + res);
        console.log(res);
      })
      .finally(() => {
        this.isBusyFinish = false;
      });
  }

  private notifyFinishCurrentVisit() {
    this.$store.commit("removeCurrentVisitId");
  }

  private checkFinishVisitInfo() {
    if (!this.currentPersonId) {
      common.toastMessage("未能确定您的登录信息,请退出重新登录!");
      return false;
    }
    if (!this.currentVisitId || !this.currentVisit.Id) {
      common.toastMessage("未查到当前拜访数据!");
      return false;
    }
    if (!this.finishVisitInfo.VisitPerson) {
      common.toastMessage("请输入拜访人!");
      return false;
    }
    if (!this.finishVisitInfo.Content) {
      common.toastMessage("请输入拜访内容!");
      return false;
    }
    return true;
  }

  private goBack() {
    this.$router.back();
  }

  private goVisitCompleted() {
    this.$router.replace({
      path: "/visitCompleted",
      query: {
        visitId: this.currentVisitId,
        customerId: this.currentVisit.CustomerId,
        customerName: this.currentVisit.CustomerName
      }
    });
  }
}

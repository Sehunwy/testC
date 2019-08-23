/**
 * @module MobileApp\main\daily\dailyList
 */
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import format from "@/plugins/format";
import AppCookies from "../../appCookies";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";
import crmBackTop from "@/MobileApp/components/crmBackTop";

@Component({
  components: { crmBackTop },
  filters: {
    formatDateTime(date) {
      return format.formatDateTime(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
})
export default class DailyList extends Vue {
  [x: string]: any;
  private activeTab = 0;
  private tabContentHeight = 0;
  private keywordSelf = "";
  private keywordSubordinate = "";
  private isLoadingSelfRefresh = false;
  private isLoadingSelfNext = false;
  private finishedSelf = false;
  private finishedSubordinate = false;
  private isLoadingSubordinateRefresh = false;
  private isLoadingSubordinateNext = false;
  private currentPageSelf = 1;
  private currentPageSubordinate = 1;
  private pageSize = 20;
  private totalCountSelf;
  private totalCountSubordinate;
  private selfDailyList = [] as IndexObject;
  private subordinateDailyList = [] as IndexObject;
  private isLeader;

  created() {
    this.isLeader = JSON.parse(AppCookies.instance.getIsLeader());
  }
  mounted() {
    this.tabContentHeight = document.documentElement!.clientHeight - 90;
    this.tabChange(this.activeTab);
  }

  private tabChange(index) {
    if (!this.isLeader) {
      this.initSelfDailyDatas();
    } else {
      if (index === 0) {
        this.initSubordinateDailyDatas();
        console.log("当前是下属日历");
      } else if (index === 1) {
        this.initSelfDailyDatas();
        console.log("当前是我的日历");
      }
    }
  }

  private initSubordinateDailyDatas() {
    if (!this.subordinateDailyList || this.subordinateDailyList.length === 0) {
      this.$nextTick(function() {
        this.loadSubordinateDailyDatas();
      });
    }
  }

  private initSelfDailyDatas() {
    if (!this.selfDailyList || this.selfDailyList.length === 0) {
      this.$nextTick(function() {
        this.loadSelfDailyDatas();
      });
    }
  }

  get refreshDailyIndicator() {
    return this.$store.state.refreshDailyIndicator;
  }

  @Watch("refreshDailyIndicator")
  onRefreshDailyIndicatorChanged(newVal, oldVal) {
    console.log("开始刷新我的日报数据");
    this.loadSelfDailyDatas();
  }

  @Watch("keywordSelf")
  onkeywordSelfChanged(newVal: string, oldVal: string) {
    if (!newVal || newVal === "") {
      this.loadSelfDailyDatas();
    }
  }

  @Watch("keywordSubordinate")
  onkeywordSubordinateChanged(newVal: string, oldVal: string) {
    if (!newVal || newVal === "") {
      this.loadSubordinateDailyDatas();
    }
  }

  private loadSelfDailyDatas() {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.isLoadingSelfRefresh = false;
    this.isLoadingSelfNext = false;
    this.currentPageSelf = 1;
    this.querySelfDailyList(
      () => {
        this.isLoadingSelfRefresh = true;
      },
      () => {
        this.isLoadingSelfRefresh = false;
      }
    );
  }

  private getSelfDailyTotalPage() {
    return Math.ceil(this.totalCountSelf / this.pageSize);
  }
  private getSubordinateTotalPage() {
    return Math.ceil(this.totalCountSubordinate / this.pageSize);
  }

  private loadNextSelfDailyDatas() {
    console.log("----------------------------");
    this.currentPageSelf = this.currentPageSelf + 1;
    let totalPage = this.getSelfDailyTotalPage();
    if (this.currentPageSelf > totalPage) {
      this.finishedSelf = true;
      return;
    }
    this.querySelfDailyList(
      () => {
        this.isLoadingSelfNext = true;
      },
      () => {
        this.isLoadingSelfNext = false;
      }
    );
  }

  private querySelfDailyList(preQueryCallback, finallyQueryCallback) {
    let currentPersonId = AppCookies.instance.getPersonId();
    if (!currentPersonId) {
      return;
    }
    let skipData = (this.currentPageSelf - 1) * this.pageSize;
    preQueryCallback();
    this.$Api
      .invoke({
        moduleName: "crm.attendance.dailyReportService",
        className: "DailyReportService",
        method: "getDailyReports",
        args: {
          personId: currentPersonId,
          keyword: this.keywordSelf,
          skip: skipData,
          limit: this.pageSize
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.querySelfDailySuccess(res);
        } else {
          this.querySelfDailyFailed(res);
        }
      })
      .catch(res => {
        this.querySelfDailyException(res);
      })
      .finally(() => {
        finallyQueryCallback();
      });
  }

  private querySelfDailySuccess(res) {
    this.totalCountSelf = res.data.data[0];
    console.log(
      "当前页：" + this.currentPageSelf + "总数" + this.totalCountSelf
    );
    let totalPage = this.getSelfDailyTotalPage();
    if (isNaN(totalPage)) {
      this.finishedSelf = true;
    }
    if (this.currentPageSelf >= totalPage) {
      this.finishedSelf = true;
    } else {
      this.finishedSelf = false;
    }
    if (res.data.data[1]) {
      if (this.currentPageSelf === 1) {
        this.selfDailyList = res.data.data[1];
      } else {
        this.selfDailyList = this.selfDailyList.concat(res.data.data[1]);
      }
    }
  }

  private querySelfDailyFailed(res) {
    common.toastMessage("查询我的日报失败!" + res.data.error);
    console.log(res);
  }

  private querySelfDailyException(res) {
    this.totalCountSelf = 0;
    this.selfDailyList = [];
    this.finishedSelf = true;
    common.toastMessage("查询我的日报异常!" + res);
    console.log(res);
  }

  private loadSubordinateDailyDatas() {
    console.log("****************************");
    this.isLoadingSubordinateRefresh = false;
    this.isLoadingSubordinateNext = false;
    this.currentPageSubordinate = 1;
    this.querySubordinateDailyList(
      () => {
        this.isLoadingSubordinateRefresh = true;
      },
      () => {
        this.isLoadingSubordinateRefresh = false;
      }
    );
  }

  private loadNextSubordinateDailyDatas() {
    console.log(".............................");
    let totalPage = this.getSubordinateTotalPage();
    this.currentPageSubordinate = this.currentPageSubordinate + 1;
    if (isNaN(totalPage) || this.currentPageSubordinate > totalPage) {
      this.finishedSubordinate = true;
      return;
    }
    this.querySubordinateDailyList(
      () => {
        this.isLoadingSubordinateNext = true;
      },
      () => {
        this.isLoadingSubordinateNext = false;
      }
    );
  }
  private querySubordinateDailyList(preQueryCallback, finallyQueryCallback) {
    let currentPersonId = AppCookies.instance.getPersonId();
    let currentSkip = (this.currentPageSubordinate - 1) * this.pageSize;
    preQueryCallback();
    this.$Api
      .invoke({
        moduleName: "crm.attendance.dailyReportService",
        className: "DailyReportService",
        method: "getSubordinateDailyReports",
        args: {
          personId: currentPersonId,
          keyword: this.keywordSubordinate,
          skip: currentSkip,
          limit: this.pageSize
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.querySubordinateListSuccess(res);
        } else {
          this.querySubordinateListFailed(res);
        }
      })
      .catch(res => {
        this.querySubordinateListException(res);
      })
      .finally(() => {
        finallyQueryCallback();
      });
  }
  private querySubordinateListSuccess(res) {
    this.totalCountSubordinate = res.data.data[0];
    console.log("当前页：" + this.currentPageSubordinate);
    console.log("总数" + this.totalCountSubordinate);
    let totalPage = this.getSubordinateTotalPage();
    if (isNaN(totalPage)) {
      this.finishedSubordinate = true;
    }
    if (this.currentPageSubordinate >= totalPage) {
      this.finishedSubordinate = true;
    } else {
      this.finishedSubordinate = false;
    }
    if (res.data.data[1]) {
      if (this.currentPageSubordinate === 1) {
        this.subordinateDailyList = res.data.data[1];
      } else {
        this.subordinateDailyList = this.subordinateDailyList.concat(
          res.data.data[1]
        );
      }
    }
  }

  private querySubordinateListFailed(res) {
    common.toastMessage("查询下属日报失败!" + res.data.error);
    console.log(res);
  }

  private querySubordinateListException(res) {
    this.totalCountSubordinate = 0;
    this.subordinateDailyList = [];
    this.finishedSubordinate = true;
    common.toastMessage("查询下属日报异常!" + res);
    console.log(res);
  }

  private goBack() {
    this.$router.back();
  }

  private goCreateDaily() {
    this.$router.push("/createDaily");
  }

  private goDaliyDetails(id) {
    if (!id) {
      return;
    }
    this.$router.push({
      path: "/dailyDetails",
      query: { Id: id }
    });
  }
}

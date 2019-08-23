/**
 * @module MobileApp\main\visit
 */
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import format from "@/plugins/format";
import common from "@/MobileApp/utils/common";
import crmBackTop from "@/MobileApp/components/crmBackTop";
@Component({
  components: { crmBackTop },
  filters: {
    formatDateTime(date) {
      return format.formatDateTime(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatVisitState(isVisiting) {
      return format.formatVisitState(isVisiting);
    },
    formatVisitTime(beginTime, finishTime) {
      return format.formatVisitTime(beginTime, finishTime);
    },
    formatVisitDate(visitDate) {
      return format.formatVisitDate(visitDate);
    },
    formatVisitDateColor(formatVisitDate) {
      return format.formatVisitDateColor(formatVisitDate);
    }
  }
})
export default class Visit extends Vue {
  [x: string]: any;
  private keywordSelf = "";
  private keywordSubordinate = "";
  private currentPageSubordinate = 1;
  private currentPageSelf = 1;
  private pageSize = 20;
  private totalCountSubordinate;
  private totalCountSelf;
  private activeTab = 0;
  private finishedSubordinate = false;
  private isLoadingSubordinateRefresh = false;
  private isLoadingSubordinateNext = false;
  private isLoadingSelfRefresh = false;
  private isLoadingSelfNext = false;
  private finishedSelf = false;

  private subordinateVisitList = [] as IndexObject;
  private selfVisitList = [] as IndexObject;
  private tabContentHeight = 0;
  private isLeader;

  created() {
    this.isLeader = JSON.parse(AppCookies.instance.getIsLeader());
  }

  mounted() {
    this.tabContentHeight = document.documentElement!.clientHeight - 90 - 50;
    this.tabChange(this.activeTab);
  }

  private tabChange(index) {
    if (!this.isLeader) {
      this.initSelfVisitDatas();
    } else {
      if (index === 0) {
        this.initSubordinateVisitDatas();
        console.log("当前是下属拜访");
      } else if (index === 1) {
        this.initSelfVisitDatas();
        console.log("当前是我的拜访");
      }
    }
  }

  private initSubordinateVisitDatas() {
    if (!this.subordinateVisitList || this.subordinateVisitList.length === 0) {
      this.$nextTick(function () {
        this.loadSubordinateVisitDatas();
      });
    }
  }

  private initSelfVisitDatas() {
    if (!this.selfVisitList || this.selfVisitList.length === 0) {
      this.$nextTick(function () {
        this.loadSelfVisitDatas();
      });
    }
  }

  get currentVisitIndicator() {
    return this.$store.state.currentVisitIndicator;
  }

  @Watch("currentVisitIndicator")
  onCurrentVisitIndicatorChanged(newVal, oldVal) {
    if (!this.$store.state.currentVisitId) {
      console.log("结束拜访啦!开始刷新数据");
    } else {
      console.log("新增拜访啦!开始刷新数据");
    }
    console.log(this.$store.state.currentVisitId);
    this.loadSelfVisitDatas();
  }

  @Watch("keywordSelf")
  onkeywordSelfChanged(newVal: string, oldVal: string) {
    if (!newVal || newVal === "") {
      this.loadSelfVisitDatas();
    }
  }

  @Watch("keywordSubordinate")
  onkeywordSubordinateChanged(newVal: string, oldVal: string) {
    if (!newVal || newVal === "") {
      this.loadSubordinateVisitDatas();
    }
  }

  private goVisitSelectCustomer() {
    this.$router.push("/visitSelectCustomer");
  }

  private goSubordinateVisitDetails(visit) {
    if (!visit || !visit.Id) {
      return;
    }
    this.goVisitDetails(visit.Id);
  }

  private goSelfVisitDetails(visit) {
    if (!visit || !visit.Id) {
      return;
    }
    if (visit.IsVisiting) {
      this.goCreateVisit(visit.Id);
    } else {
      this.goVisitDetails(visit.Id);
    }
  }

  private goVisitDetails(id) {
    this.$router.push({
      path: "/visitDetails",
      query: { visitId: id }
    });
  }

  private goCreateVisit(id) {
    this.$router.push({
      path: "/createVisit",
      query: { newVisitId: id }
    });
  }

  private getSelfVisitTotalPage() {
    return Math.ceil(this.totalCountSelf / this.pageSize);
  }

  private loadSelfVisitDatas() {
    console.log("**********************************");

    this.isLoadingSelfRefresh = false;
    this.isLoadingSelfNext = false;
    this.currentPageSelf = 1;
    this.querySelfVisitList(
      () => {
        this.isLoadingSelfRefresh = true;
      },
      () => {
        this.isLoadingSelfRefresh = false;
      }
    );
  }

  private loadNextSelfVisitDatas() {
    console.log("----------------------------");
    let totalPage = this.getSelfVisitTotalPage();
    this.currentPageSelf = this.currentPageSelf + 1;
    if (this.currentPageSelf > totalPage) {
      this.finishedSelf = true;
      return;
    }
    this.querySelfVisitList(
      () => {
        this.isLoadingSelfNext = true;
      },
      () => {
        this.isLoadingSelfNext = false;
      }
    );
  }

  private querySelfVisitList(preQueryCallback, finallyQueryCallback) {
    let currentPersonId = AppCookies.instance.getPersonId();
    preQueryCallback();
    let currentSkip = (this.currentPageSelf - 1) * this.pageSize;
    this.$Api
      .invoke({
        moduleName: "crm.visit.visitService",
        className: "VisitService",
        method: "getOwnerList",
        args: {
          personId: currentPersonId,
          keyword: this.keywordSelf,
          skip: currentSkip,
          limit: this.pageSize
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.querySelfVisitSuccess(res);
        } else {
          this.querySelfVisitFailed(res);
        }
      })
      .catch(res => {
        this.querySelfVisitException(res);
      })
      .finally(() => {
        finallyQueryCallback();
      });
  }

  private querySelfVisitSuccess(res) {
    this.totalCountSelf = res.data.data[0];
    console.log(
      "当前页：" + this.currentPageSelf + "总数" + this.totalCountSelf
    );
    let totalPage = this.getSelfVisitTotalPage();
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
        this.selfVisitList = res.data.data[1];
      } else {
        this.selfVisitList = this.selfVisitList.concat(res.data.data[1]);
      }
    }
  }

  private querySelfVisitFailed(res) {
    common.toastMessage("查询我的拜访失败!" + res.data.error);
    console.log(res);
  }

  private querySelfVisitException(res) {
    this.totalCountSelf = 0;
    this.selfVisitList = [];
    this.finishedSelf = true;
    common.toastMessage("查询我的拜访异常!" + res);
    console.log(res);
  }

  private getSubordinateTotalPage() {
    return Math.ceil(this.totalCountSubordinate / this.pageSize);
  }

  private loadSubordinateVisitDatas() {
    console.log("****************************");
    this.isLoadingSubordinateRefresh = false;
    this.isLoadingSubordinateNext = false;
    this.currentPageSubordinate = 1;
    this.querySubordinateVisitList(
      () => {
        this.isLoadingSubordinateRefresh = true;
      },
      () => {
        this.isLoadingSubordinateRefresh = false;
      }
    );
  }

  private loadNextSubordinateVisitDatas() {
    console.log("----------------------------");
    let totalPage = this.getSubordinateTotalPage();
    this.currentPageSubordinate = this.currentPageSubordinate + 1;
    if (isNaN(totalPage) || this.currentPageSubordinate > totalPage) {
      this.finishedSubordinate = true;
      return;
    }
    this.querySubordinateVisitList(
      () => {
        this.isLoadingSubordinateNext = true;
      },
      () => {
        this.isLoadingSubordinateNext = false;
      }
    );
  }

  private querySubordinateVisitList(preQueryCallback, finallyQueryCallback) {
    let currentPersonId = AppCookies.instance.getPersonId();
    preQueryCallback();
    let currentSkip = (this.currentPageSubordinate - 1) * this.pageSize;
    this.$Api
      .invoke({
        moduleName: "crm.visit.visitService",
        className: "VisitService",
        method: "getSubordinateList",
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
        this.subordinateVisitList = res.data.data[1];
      } else {
        this.subordinateVisitList = this.subordinateVisitList.concat(
          res.data.data[1]
        );
      }
    }
  }

  private querySubordinateListFailed(res) {
    common.toastMessage("查询下属拜访失败!" + res.data.error);
    console.log(res);
  }

  private querySubordinateListException(res) {
    this.totalCountSubordinate = 0;
    this.subordinateVisitList = [];
    this.finishedSubordinate = true;
    common.toastMessage("查询下属拜访异常!" + res);
    console.log(res);
  }
}

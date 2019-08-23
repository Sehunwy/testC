/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../appCookies";
import common from "@/MobileApp/utils/common";

@Component
export default class CrmList extends Vue {
  [x: string]: any;
  @Prop({ default: "" }) moduleName!: string;
  @Prop({ default: "" }) moduleClassName!: string;
  @Prop({ default: "" }) methodName!: string;
  @Prop({ default: "" }) keyword!: string;
  @Prop({ default: 20 }) pageSize!: number;

  private currentPage = 1;
  private totalCount;
  private isLoadingRefresh = false;
  private isLoadingNext = false;
  private finished = false;
  private dataList = [] as IndexObject;

  @Watch("keyword")
  onKeywordChange(newVal, oldVal) {
    if (!newVal || newVal === "") {
      this.loadDataList();
    }
  }

  private initDataList() {
    console.log("CRM列表组件：初始化数据...");
    if (!this.dataList || this.dataList.length === 0) {
      this.loadDataList();
    }
  }

  private getTotalPage() {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  private loadDataList() {
    console.log("****************************");
    this.isLoadingRefresh = false;
    this.isLoadingNext = false;
    this.currentPage = 1;
    this.queryDataList(
      () => {
        this.isLoadingRefresh = true;
      },
      () => {
        this.isLoadingRefresh = false;
      }
    );
  }

  private loadNextDatas() {
    console.log(".............................");
    let totalPage = this.getTotalPage();
    this.currentPage = this.currentPage + 1;
    if (isNaN(totalPage) || this.currentPage > totalPage) {
      this.finished = true;
      return;
    }
    this.queryDataList(
      () => {
        this.isLoadingNext = true;
      },
      () => {
        this.isLoadingNext = false;
      }
    );
  }

  private queryDataList(preQueryCallback, finallyQueryCallback) {
    let currentPersonId = AppCookies.instance.getPersonId();
    let currentSkip = (this.currentPage - 1) * this.pageSize;
    preQueryCallback();
    this.$Api
      .invoke({
        moduleName: this.moduleName,
        className: this.moduleClassName,
        method: this.methodName,
        args: {
          personId: currentPersonId,
          keyword: this.keyword,
          skip: currentSkip,
          limit: this.pageSize
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.queryDataListSuccess(res);
        } else {
          this.queryDataListFailed(res);
        }
      })
      .catch(res => {
        this.queryDataListException(res);
      })
      .finally(() => {
        finallyQueryCallback();
      });
  }

  private queryDataListSuccess(res) {
    this.totalCount = res.data.data[0];
    console.log("当前页：" + this.currentPage);
    console.log("总数" + this.totalCount);
    let totalPage = this.getTotalPage();
    if (isNaN(totalPage)) {
      this.finished = true;
    }
    if (this.currentPage >= totalPage) {
      this.finished = true;
    } else {
      this.finished = false;
    }
    if (res.data.data[1]) {
      if (this.currentPage === 1) {
        this.dataList = res.data.data[1];
      } else {
        this.dataList = this.dataList.concat(res.data.data[1]);
      }
    }
  }

  private queryDataListFailed(res) {
    common.toastMessage("查询失败!" + res.data.error);
    console.log(res);
  }

  private queryDataListException(res) {
    this.totalCount = 0;
    this.dataList = [];
    this.finished = true;
    common.toastMessage("查询异常!" + res);
    console.log(res);
  }
}

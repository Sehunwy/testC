/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../appCookies";
import format from "@/plugins/format";
import BaiduMap from "@/plugins/map";
import common from "@/MobileApp/utils/common";

@Component({
  filters: {
    formatDistance(distance) {
      return format.formatDistance(distance);
    }
  }
})
export default class SelectCustomer extends Vue {
  [x: string]: any;
  @Prop({ default: "选择客户" }) title!: string;

  private currentCustomer = null;
  private keyword = "";
  private customerList = [];
  private customerCount = 0;
  private isLoading = false;
  private finished = false;
  private currentPage = 1;
  private pageSize = 25;

  private sortByName = "sortByName";
  private sortByDistance = "sortByDistance";
  private currentSortType = "sortByName";
  private currentAsc = true;
  private currentLocation: any = null;

  @Prop({ default: false }) showComponent!: boolean;

  @Watch("showComponent")
  onShowComponent(newVal: boolean, oldVal: boolean) {
    console.log(newVal);
    if (!newVal) {
      this.currentCustomer = null;
      return;
    }
    this.onQueryCustomerDatas();
  }

  mounted() {
    this.isLoading = true;
    BaiduMap.getGeolocation()
      .then(res => {
        this.isLoading = false;
        this.currentLocation = {
          Longitude: res.point.lng,
          Latitude: res.point.lat
        };
        this.currentSortType = this.sortByDistance;
        this.onQueryCustomerDatas();
      })
      .catch(errorMsg => {
        this.isLoading = false;
        common.toastMessage(errorMsg);
        this.currentSortType = this.sortByName;
        this.onQueryCustomerDatas();
      });
  }

  private onQueryCustomerDatas() {
    this.isLoading = false;
    this.finished = false;
    this.currentPage = 1;
    this.customerList = [];
    this.keyword = this.keyword.trim();
    this.queryCustomerList();
  }

  private getTotalPage() {
    return Math.ceil(this.customerCount / this.pageSize);
  }

  private loadNextCustomerDatas() {
    console.log("----------------------------");
    let totalPage = this.getTotalPage();
    this.currentPage = this.currentPage + 1;
    if (isNaN(totalPage) || this.currentPage > totalPage) {
      this.finished = true;
      return;
    }
    this.queryCustomerList();
  }

  private queryCustomerList() {
    let currentEntCd = AppCookies.instance.getEntCd();
    let currentPersonId = AppCookies.instance.getPersonId();
    this.isLoading = true;
    let currentSkip = (this.currentPage - 1) * this.pageSize;
    this.$Api
      .invoke({
        moduleName: "crm.basic.customerService",
        className: "CustomerService",
        method: "getHasPermissionCustomers",
        args: {
          entCd: currentEntCd,
          personId: currentPersonId,
          keyword: this.keyword,
          locationPoint: this.currentLocation,
          sortType: this.currentSortType,
          asc: this.currentAsc,
          skip: currentSkip,
          limit: this.pageSize
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.queryCustomersSuccess(res);
        } else {
          this.queryCustomersFailed(res);
        }
      })
      .catch(res => {
        this.queryCustomersException(res);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  private queryCustomersSuccess(res) {
    console.log("当前页：" + this.currentPage);
    this.customerCount = res.data.data[0];
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
        this.customerList = res.data.data[1];
      } else {
        this.customerList = this.customerList.concat(res.data.data[1]);
      }
    }
  }

  private queryCustomersFailed(res) {
    common.toastMessage("查询客户失败!" + res.data.error);
  }

  private queryCustomersException(res) {
    this.customerCount = 0;
    this.customerList = [];
    this.finished = true;
    common.toastMessage("查询客户异常!" + res);
  }

  @Emit("goBack")
  private goBack() {}

  private confirmComplete() {
    if (!this.currentCustomer) {
      common.dialogAlert("提示", "还未选择客户!");
      return;
    }
    this.complete();
  }

  @Emit("complete")
  private complete() {
    return this.currentCustomer;
  }
}

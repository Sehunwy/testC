/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../appCookies";
import localStorage from "@/plugins/localStorage";
import common from "@/MobileApp/utils/common";

@Component
export default class SearchCustomer extends Vue {
  [x: string]: any;

  private keyword = "";
  private customerCount = 0;
  private customerList = [];
  private searchHistoryList = [] as IndexObject;
  private localStorageKey = "customerSearchHistory";
  private isLoading = false;
  private finished = false;
  private currentPage = 1;
  private pageSize = 25;

  mounted() {
    this.getSearchHistoryList();
  }

  @Emit("onCancelSearch")
  private onClickBack() {}

  private onClickResult(customer) {
    if (!customer) {
      return;
    }
    this.searchComplete(customer);
    this.setSearchHistoryList(customer);
  }

  @Emit("searchComplete")
  private searchComplete(customer) {
    return customer;
  }

  private setSearchHistoryList(customer) {
    if (!customer) {
      return;
    }
    let existItem = Enumerable.from(this.searchHistoryList)
      .where((x: IndexObject) => x.Id === customer.Id)
      .firstOrDefault();
    if (existItem) {
      let index = this.searchHistoryList.indexOf(existItem);
      if (index > -1) {
        this.searchHistoryList.splice(index, 1);
      }
    }
    this.searchHistoryList.splice(0, 0, customer);
    localStorage.setStorage(this.localStorageKey, this.searchHistoryList);
  }

  private getSearchHistoryList() {
    let res = localStorage.getStorage(this.localStorageKey);
    if (!res) {
      this.searchHistoryList = [];
    } else {
      let list = JSON.parse(res);
      this.searchHistoryList = list;
    }
  }

  private clearSearchHistoryList() {
    localStorage.removeStorage(this.localStorageKey);
    this.getSearchHistoryList();
  }

  private onQueryCustomerDatas() {
    this.isLoading = false;
    this.finished = false;
    this.currentPage = 1;
    this.customerList = [];
    if (!this.keyword || !this.keyword.trim()) {
      this.finished = true;
      return;
    }
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
    if (!this.keyword) {
      return;
    }
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
          locationPoint: null,
          sortType: "sortByName",
          asc: true,
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
}

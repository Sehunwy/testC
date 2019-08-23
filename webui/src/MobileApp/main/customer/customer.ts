/**
 * @module MobileApp\main\customer
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import customerDropDown from "@/MobileApp/components/customerDropDown";
import searchCustomer from "@/MobileApp/components/searchCustomer";
import crmBackTop from "@/MobileApp/components/crmBackTop";
import format from "@/plugins/format";
import BaiduMap from "@/plugins/map";
import common from "@/MobileApp/utils/common";

@Component({
  components: { customerDropDown, searchCustomer, crmBackTop },
  filters: {
    formatDateTime(date) {
      return format.formatDateTime(date, "yyyy-MM-dd");
    },
    formatVisitDays(date) {
      return format.formatVisitDays(date);
    },
    formatCustomerLevel(level) {
      return format.formatCustomerLevel(level);
    },
    formatDistance(distance) {
      return format.formatDistance(distance);
    }
  }
})
export default class Customer extends Vue {
  [x: string]: any;
  private showSearchCustomer = false;
  private sortByDistance = "sortByDistance";
  private currentSortOption = { Cd: "sortByVisitTime", Asc: true };
  private showDistanceLabel = false;
  private currentLocation: any = null;
  private customerCount = 0;
  private customerList = [];
  private isLoadingRefresh = false;
  private isLoadingNext = false;
  private finished = false;
  private currentPage = 1;
  private pageSize = 20;

  mounted() {
    console.log("当前是客户界面.....");
  }

  private goCreateCustomer() {
    this.$router.push("/customerLocation");
  }

  private goCustomerDetails(customerId) {
    this.$router.push({
      path: "/customerDetails",
      query: { id: customerId }
    });
  }

  private sortOptionChanged(option) {
    if (!option) {
      return;
    }
    this.currentSortOption = option;
    this.scrollToTop();
    this.reloadCustomerDatas();
  }

  private scrollToTop() {
    (this.$refs.contentContainer as IndexObject).scrollTop = 0;
  }

  private openSearchCustomerPopup() {
    this.showSearchCustomer = true;
  }

  private cancelSearchCustomer() {
    this.showSearchCustomer = false;
  }

  private onSearchComplete(customer) {
    this.goCustomerDetails(customer.Id);
    this.cancelSearchCustomer();
  }

  private reloadCustomerDatas() {
    this.isLoadingRefresh = false;
    this.isLoadingNext = false;
    this.currentPage = 1;
    if (this.currentSortOption.Cd === this.sortByDistance) {
      this.getGeoLocationThenQuery();
    } else {
      this.queryCustomerList(
        () => {
          this.isLoadingRefresh = true;
        },
        () => {
          this.isLoadingRefresh = false;
        }
      );
    }
  }

  private getGeoLocationThenQuery() {
    BaiduMap.getGeolocation()
      .then(res => {
        console.log(res);
        this.currentLocation = {
          Longitude: res.point.lng,
          Latitude: res.point.lat
        };
        this.queryCustomerList(
          () => {
            this.isLoadingRefresh = true;
          },
          () => {
            this.isLoadingRefresh = false;
          }
        );
      })
      .catch(errorMsg => {
        this.isLoadingRefresh = false;
        common.toastMessage("定位失败,请重试!" + errorMsg);
      });
  }

  private getTotalPage() {
    return Math.ceil(this.customerCount / this.pageSize);
  }

  private loadNextCustomerDatas() {
    console.log("----------------------------");
    let totalPage = this.getTotalPage();
    this.currentPage = this.currentPage + 1;
    if (this.currentPage > totalPage) {
      this.finished = true;
      return;
    }
    this.queryCustomerList(
      () => {
        this.isLoadingNext = true;
      },
      () => {
        this.isLoadingNext = false;
      }
    );
  }

  private queryCustomerList(preQueryCallback, finallyQueryCallback) {
    let currentEntCd = AppCookies.instance.getEntCd();
    let currentPersonId = AppCookies.instance.getPersonId();
    preQueryCallback();
    let currentSkip = (this.currentPage - 1) * this.pageSize;
    this.$Api
      .invoke({
        moduleName: "crm.basic.customerService",
        className: "CustomerService",
        method: "getHasPermissionCustomers",
        args: {
          entCd: currentEntCd,
          personId: currentPersonId,
          keyword: "",
          locationPoint: this.currentLocation,
          sortType: this.currentSortOption.Cd,
          asc: this.currentSortOption.Asc,
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
        finallyQueryCallback();
      });
  }

  private queryCustomersSuccess(res) {
    console.log("当前页：" + this.currentPage);
    this.customerCount = res.data.data[0];
    let totalPage = this.getTotalPage();
    console.log("总页：" + totalPage);
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
    this.showDistanceLabel = this.currentSortOption.Cd === this.sortByDistance;
  }

  private queryCustomersFailed(res) {
    common.toastMessage("查询失败!" + res.data.error);
    console.log(res);
  }

  private queryCustomersException(res) {
    this.customerCount = 0;
    this.customerList = [];
    this.finished = true;
    common.toastMessage("查询异常!" + res);
    console.log(res);
  }
}

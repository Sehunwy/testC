/**
 * @module MobileApp\main\customer
 */
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import format from "@/plugins/format";
import common from "@/MobileApp/utils/common";
import AppCookies from "../../appCookies";

@Component({
  filters: {
    formatDateTime(date) {
      return format.formatDateTime(date, "yyyy-MM-dd hh:mm");
    },
    formatDynamicType(type) {
      if (type === "Item") {
        return "事项";
      } else if (type === "Visit") {
        return "拜访";
      } else {
        return "--";
      }
    },
    formatVisitState(isVisiting) {
      return format.formatVisitState(isVisiting);
    },
    formatItemState(state) {
      return format.formatItemState(state);
    },
    formatItemStateColor(state) {
      return format.formatItemStateColor(state);
    }
  }
})
export default class CustomerDynamic extends Vue {
  [x: string]: any;
  private currentPage = 1;
  private pageSize = 20;
  private dataList = [];
  private totalCount = 0;
  private showFilterOptionPopup = false;
  private filterOptionText = "全部";
  private filterOptionList = ["全部", "仅看拜访", "仅看事项"];
  private filterOptionValue = 0;

  private isLoadingRefresh = false;
  private isLoadingNext = false;
  private finished = false;

  private itemDynamicType = "Item";
  private visitDynamicType = "Visit";

  @Prop({ default: "" }) customerId!: string;

  mounted() {
    this.$nextTick(() => {
      this.initDataList();
    });
  }

  @Watch("filterOptionValue")
  onFilterOptionValueChange(newVal, oldVal) {
    this.loadDataList();
  }

  private onPickPopupConfirm(value, index) {
    this.showFilterOptionPopup = false;
    this.filterOptionText = value;
    this.filterOptionValue = index;
  }

  private onPickPopupCancel() {
    this.showFilterOptionPopup = false;
  }

  private openFilterOptionPopup() {
    this.showFilterOptionPopup = true;
  }

  private initDataList() {
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
    this.queryCustomerDynamic(
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
    this.queryCustomerDynamic(
      () => {
        this.isLoadingNext = true;
      },
      () => {
        this.isLoadingNext = false;
      }
    );
  }

  private queryCustomerDynamic(preQueryCallback, finallyQueryCallback) {
    let currentSkip = (this.currentPage - 1) * this.pageSize;
    preQueryCallback();
    this.$Api
      .invoke({
        moduleName: "crm.basic.customerDynamicService",
        className: "CustomerDynamicService",
        method: "getCustomerDynamics",
        args: {
          customerId: this.customerId,
          filterOption: this.filterOptionValue,
          skip: currentSkip,
          limit: this.pageSize
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.queryCustomerDynamicSuccess(res);
        } else {
          this.queryCustomerDynamicFailed(res);
        }
      })
      .catch(res => {
        this.queryCustomerDynamicException(res);
      })
      .finally(() => {
        finallyQueryCallback();
      });
  }

  private queryCustomerDynamicSuccess(res) {
    console.log(res.data.data[1]);
    this.totalCount = res.data.data[0];
    console.log("当前页：" + this.currentPage);
    console.log("总数" + this.totalCount);
    let totalPage = this.getTotalPage();
    console.log("总页数" + totalPage);
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

  private queryCustomerDynamicFailed(res) {
    common.toastMessage("查询客户动态失败!" + res.data.error);
  }

  private queryCustomerDynamicException(res) {
    this.totalCount = 0;
    this.dataList = [];
    this.finished = true;
    common.toastMessage("查询客户动态异常!" + res);
  }

  private goDynamicDetails(data) {
    if (!data || !data.Id || !data.DynamicType) {
      return;
    }
    if (data.DynamicType === this.itemDynamicType) {
      this.goItemDetails(data.Id);
      return;
    }
    if (data.DynamicType === this.visitDynamicType) {
      let currentPersonId = AppCookies.instance.getPersonId();
      if (data.CreaterId === currentPersonId && data.IsVisiting) {
        this.goCreateVisit(data.Id);
        return;
      }
      this.goVisitDetails(data.Id);
    }
  }

  private goVisitDetails(id) {
    if (!id) {
      return;
    }
    this.$router.push({ path: "/visitDetails", query: { visitId: id } });
  }

  private goCreateVisit(id) {
    if (!id) {
      return;
    }
    this.$router.push({ path: "/createVisit", query: { newVisitId: id } });
  }

  private goItemDetails(itemId) {
    if (!itemId) {
      return;
    }
    this.$router.push({ path: "/itemDetails", query: { id: itemId } });
  }
}

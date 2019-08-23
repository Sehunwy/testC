/**
 * @module MobileApp\main\item
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import format from "@/plugins/format";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";

@Component({
  components: { crmLoading },
  filters: {
    formatDateTime(date) {
      return format.formatDateTime(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatItemState(state) {
      return format.formatItemState(state);
    },
    formatItemStateColor(state) {
      return format.formatItemStateColor(state);
    },
    formatExecutors(executors) {
      if (!executors || executors.length === 0) {
        return "";
      }
      return Enumerable.from(executors)
        .select((x: any) => x.Name)
        .toJoinedString(";");
    }
  }
})
export default class ItemDetails extends Vue {
  [x: string]: any;
  private itemDetails: any = {};
  private isBusy = false;
  private isBusyFinishItem = false;
  private isBusyDeleteItemFlow = false;
  private currentItemId = "";
  private currentPersonId = "";
  private itemFinishState = 3;

  created() {
    this.currentItemId = this.$route.query.id;
    this.currentPersonId = AppCookies.instance.getPersonId();
    this.getItemDetails();
  }

  private getItemDetails() {
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.item.itemService",
        className: "ItemService",
        method: "getItemById",
        args: {
          id: this.currentItemId
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.itemDetails = res.data.data;
        } else {
          common.toastMessage("查询事项详情失败!" + res.data.error);
        }
      })
      .catch(res => {
        common.toastMessage("查询事项详情异常!" + res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private confirmFinishItem() {
    if (!this.itemDetails || !this.itemDetails.Id) {
      return;
    }
    if (this.itemDetails.State === this.itemFinishState) {
      common.toastMessage("事项已结束");
      return;
    }
    common
      .dialogConfirm("温馨提示", "请确认要结束此事项?")
      .then(() => {
        // on confirm
        this.finishItem();
      })
      .catch(() => {
        // on cancel
      });
  }

  private finishItem() {
    this.isBusyFinishItem = true;
    this.$Api
      .invoke({
        moduleName: "crm.item.itemService",
        className: "ItemService",
        method: "finishItem",
        args: {
          personId: this.currentPersonId,
          itemId: this.currentItemId
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.notifyRefreshItemIndicator();
          this.getItemDetails();
        } else {
          common.toastMessage("结束事项失败!" + res.data.error);
        }
      })
      .catch(res => {
        common.toastMessage("结束事项异常!" + res);
      })
      .finally(() => {
        this.isBusyFinishItem = false;
      });
  }

  private notifyRefreshItemIndicator() {
    if (
      !this.itemDetails ||
      !this.itemDetails.CreaterId ||
      !this.currentPersonId
    ) {
      return;
    }
    if (this.itemDetails.CreaterId === this.currentPersonId) {
      this.$store.commit("changeRefreshSelfItemIndicator");
    } else {
      this.$store.commit("changeRefreshSubItemIndicator");
    }
  }

  private confirmDeleteItemFlow(itemFlow) {
    if (!itemFlow || !itemFlow.Id) {
      return;
    }
    if (this.itemDetails.State === this.itemFinishState) {
      common.toastMessage("事项已结束,不能删除此事项流程");
      return;
    }
    if (itemFlow.CreaterId !== this.currentPersonId) {
      common.toastMessage("您没有删除此流程权限");
      return;
    }
    common
      .dialogConfirm("温馨提示", "请确认要删除此事项流程?")
      .then(() => {
        // on confirm
        this.deleteItemFlow(itemFlow);
      })
      .catch(() => {
        // on cancel
      });
  }

  private deleteItemFlow(itemFlow) {
    this.isBusyDeleteItemFlow = true;
    this.$Api
      .invoke({
        moduleName: "crm.item.itemService",
        className: "ItemService",
        method: "deleteItemFlow",
        args: {
          personId: this.currentPersonId,
          itemFlowId: itemFlow.Id
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.getItemDetails();
        } else {
          common.toastMessage("删除事项流程失败!" + res.data.error);
        }
      })
      .catch(res => {
        common.toastMessage("删除事项流程异常!" + res);
      })
      .finally(() => {
        this.isBusyDeleteItemFlow = false;
      });
  }

  private replyItemFlow() {
    common.toastMessage("功能正在开发中!");
  }

  private goCreateItemFlow() {
    if (this.itemDetails.State === this.itemFinishState) {
      common.toastMessage("事项已结束");
      return;
    }
    if (!this.itemDetails || !this.itemDetails.Id) {
      return;
    }
    this.$router.push({
      path: "/createItemFlow",
      query: { item: this.itemDetails }
    });
  }

  private goBack() {
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

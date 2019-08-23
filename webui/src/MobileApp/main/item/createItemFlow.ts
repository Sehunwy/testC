/**
 * @module MobileApp\main\item
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import selectPerson from "@/MobileApp/components/selectPerson";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";
@Component({
  components: { crmLoading, selectPerson }
})
export default class CreateItemFlow extends Vue {
  [x: string]: any;
  private currentItem: any = null;
  private currentPersonId = "";
  private isBusy = false;
  private showSelectPersonPopup = false;
  private displayExecutors = "";

  private newItemFlow = {
    ItemId: "",
    Content: "",
    Analyze: "",
    NextPlan: "",
    Executors: []
  };

  created() {
    this.currentItem = this.$route.query.item;
    this.currentPersonId = AppCookies.instance.getPersonId();
    this.newItemFlow.ItemId = this.currentItem.Id;
  }

  private createItemFlow() {
    if (!this.checkInput()) {
      return;
    }
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.item.itemService",
        className: "ItemService",
        method: "createItemFlow",
        args: {
          personId: this.currentPersonId,
          itemId: this.currentItem.Id,
          itemFlow: this.newItemFlow
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.notifyRefreshItemIndicator();
          this.goBack();
        } else {
          common.toastMessage("新增事项流程失败!" + res.data.error);
          console.log(res);
        }
      })
      .catch(res => {
        common.toastMessage("新增事项流程异常!" + res);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private notifyRefreshItemIndicator() {
    if (
      !this.currentItem ||
      !this.currentItem.CreaterId ||
      !this.currentPersonId
    ) {
      return;
    }
    if (this.currentItem.CreaterId === this.currentPersonId) {
      this.$store.commit("changeRefreshSelfItemIndicator");
    } else {
      this.$store.commit("changeRefreshSubItemIndicator");
    }
  }

  private checkInput() {
    if (!this.currentItem || !this.currentItem.Id) {
      common.toastMessage("页面参数异常!");
      return false;
    }
    if (!this.newItemFlow.Content) {
      common.toastMessage("请输入流程描述!");
      return false;
    }
    return true;
  }

  private openSelectPersonPopup() {
    this.showSelectPersonPopup = true;
  }

  private closeSelectPersonPopup() {
    this.showSelectPersonPopup = false;
  }

  private selectPersonComplete(persons) {
    if (!persons || persons.length === 0) {
      this.newItemFlow.Executors = [];
      this.displayExecutors = "";
      return;
    }
    let simplePerson = Enumerable.from(persons)
      .select((x: any) => {
        return { Id: x.Id, Name: x.Name };
      })
      .toArray();
    this.newItemFlow.Executors = simplePerson as [];
    console.log(this.newItemFlow.Executors);
    this.displayExecutors = Enumerable.from(persons)
      .select((x: any) => x.Name)
      .toJoinedString(";");
    this.closeSelectPersonPopup();
  }

  private goBack() {
    this.$router.back();
  }
}

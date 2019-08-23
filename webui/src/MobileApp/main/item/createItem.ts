/**
 * @module MobileApp\main\item
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import selectCustomer from "@/MobileApp/components/selectCustomer";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";
@Component({
  components: { selectCustomer, crmLoading }
})
export default class CreateItem extends Vue {
  [x: string]: any;
  private currentPersonId = "";
  private isBusy = false;
  private showSelectCustomerPopup = false;
  private disableSelectCustomer = false;
  private newItem = {
    EntId: "",
    EntCd: "",
    Name: "",
    Description: "",
    CustomerId: "",
    CustomerName: "",
    Type: "",
    Level: 1,
    Analyze: "",
    NextPlan: "",
    Remark: ""
  };

  created() {
    this.currentPersonId = AppCookies.instance.getPersonId();
    this.newItem.EntId = AppCookies.instance.getEntId();
    this.newItem.EntCd = AppCookies.instance.getEntCd();
    let customerId = this.$route.query.customerId;
    let customerName = this.$route.query.customerName;
    this.newItem.CustomerId = customerId ? customerId : "";
    this.newItem.CustomerName = customerName ? customerName : "";
    if (this.newItem.CustomerId && this.newItem.CustomerName) {
      this.disableSelectCustomer = true;
    }
  }

  private createNewItem() {
    if (!this.checkInput()) {
      return;
    }
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.item.itemService",
        className: "ItemService",
        method: "createItem",
        args: {
          personId: this.currentPersonId,
          item: this.newItem
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.notifyRefreshItemIndicator();
          this.goBack();
        } else {
          common.toastMessage("新增事项失败!" + res.data.error);
          console.log(res);
        }
      })
      .catch(res => {
        common.toastMessage("新增事项异常!" + res);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private notifyRefreshItemIndicator() {
    this.$store.commit("changeRefreshSelfItemIndicator");
  }

  private checkInput() {
    if (!this.newItem.Name) {
      common.toastMessage("事项名称不能为空!");
      return false;
    }
    if (!this.newItem.CustomerId || !this.newItem.CustomerName) {
      common.toastMessage("请选择客户!");
      return false;
    }
    return true;
  }

  private openSelectCustomerPopup() {
    this.showSelectCustomerPopup = true;
  }

  private closeSelectCustomerPopup() {
    this.showSelectCustomerPopup = false;
  }

  private selectCustomerComplete(customer) {
    if (!customer || !customer.Id) {
      return;
    }
    this.newItem.CustomerId = customer.Id;
    this.newItem.CustomerName = customer.Name;
    this.showSelectCustomerPopup = false;
  }

  private goBack() {
    this.$router.back();
  }
}

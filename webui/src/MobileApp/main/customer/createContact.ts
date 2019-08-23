/**
 * @module MobileApp\main\item
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";

@Component({
  components: { crmLoading }
})
export default class CreateContact extends Vue {
  [x: string]: any;
  private isBusy=false;
  private customerId = "";
  private contact = {
    Name: "",
    Telephone: "",
    Email: "",
    Department: "",
    Title: ""
  };

  created() {
    this.customerId = this.$route.query.customerId;
  }

  private createCustomerContact() {
    if (!this.checkInput()) {
      return;
    }
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.customerService",
        className: "CustomerService",
        method: "createCustomerContact",
        args: {
          customerId: this.customerId,
          contact: this.contact
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.goBack();
        } else {
          common.toastMessage("新增客户联系人失败!" + res.data.error);
          console.log(res);
        }
      })
      .catch(res => {
        common.toastMessage("新增客户联系人异常!" + res);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private checkInput() {
    if (!this.contact.Name) {
      common.toastMessage("姓名不能为空!");
      return false;
    }
    if (!this.contact.Telephone) {
      common.toastMessage("联系电话不能为空!");
      return false;
    }
    return true;
  }

  private goBack() {
    this.$router.back();
  }
}

/**
 * @module MobileApp\main\customer
 */
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../../appCookies";
import selectDictionaryValue from "@/MobileApp/components/selectDictionaryValue";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";

@Component({
  components: { selectDictionaryValue, crmLoading }
})
export default class CreateCustomer extends Vue {
  [x: string]: any;
  private showSelectDictionaryValue = false;
  private popupTitle = "";
  private popupDicKey = "";
  private popupOldValue = null;
  private setValueCallback;
  private currentLocation;
  private isBusy = false;
  private newCustomer = {
    EntId: "",
    EntCd: "",
    Name: "",
    Cd: "",
    Ctrl: "",
    SimpleName: "",
    Address: "",
    Longitude: "",
    Latitude: "",
    LocationDesc: "",
    Level: "",
    Telephone: "",
    Fax: "",
    ManagementCompany: "",
    IndustryCategory: "",
    MainProduction: "",
    Hobbies: "",
    DevelopProgress: "",
    CompetitorSituation: "",
    CompetitorAnalysis: "",
    AccountPeriod: "",
    CreditSituation: "",
    ContractAgreement: "",
    BusinessScale: "",
    Remark: ""
  };
  private customerContacts = [] as IndexObject;

  private onEnter() {
    this.currentLocation = this.$route.params.location;
    if (!this.currentLocation || !this.currentLocation.point) {
      common.toastMessage("没有定位信息,请重新定位!", 4000);
      this.goBack();
      return;
    }
    this.initCustomer();
  }

  private initCustomer() {
    this.newCustomer.EntId = AppCookies.instance.getEntId();
    this.newCustomer.EntCd = AppCookies.instance.getEntCd();
    this.newCustomer.Longitude = this.currentLocation.point.lng;
    this.newCustomer.Latitude = this.currentLocation.point.lat;
    this.newCustomer.LocationDesc = this.currentLocation.address;
    // 所在省市信息
  }

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.onEnter();
    });
  }

  private goBack() {
    common
      .dialogConfirm("温馨提示", "请确认要放弃新增客户?")
      .then(() => {
        // on confirm
        this.$router.back();
      })
      .catch(() => {
        // on cancel
      });
  }

  private createCustomerContact() {
    if (!this.customerContacts) {
      this.customerContacts = [];
    }
    let newContact = {
      Name: "",
      Telephone: "",
      Email: "",
      Department: "",
      Title: ""
    };
    this.customerContacts.push(newContact);
  }

  private confirmDeleteCustomerContact(index) {
    common
      .dialogConfirm("温馨提示", "请确认要删除客户联系人?")
      .then(() => {
        // on confirm
        this.deleteCustomerContact(index);
      })
      .catch(() => {
        // on cancel
      });
  }

  private deleteCustomerContact(index) {
    if (
      !this.customerContacts ||
      this.customerContacts.length === 0 ||
      index < 0
    ) {
      return;
    }
    this.customerContacts.splice(index, 1);
  }

  private confirmCreateCustomer() {
    if (!this.checkUserInput()) {
      return;
    }
    this.saveNewCustomer();
  }

  private saveNewCustomer() {
    let cuurentPersonId = AppCookies.instance.getPersonId();
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.customerService",
        className: "CustomerService",
        method: "createCustomer",
        args: {
          personId: cuurentPersonId,
          customerBasicInfo: this.newCustomer,
          customerContacts: this.customerContacts
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.createCustomerSuccess(res);
        } else {
          common.toastMessage("新增客户失败!" + res.data.error, 4000);
        }
        console.log(res);
      })
      .catch(res => {
        common.toastMessage("新增客户异常!" + res, 4000);
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private createCustomerSuccess(res) {
    this.$router.replace({
      path: "/customerDetails",
      query: { id: res.data.data }
    });
  }

  private checkUserInput() {
    if (!this.currentLocation || !this.currentLocation.point) {
      common.toastMessage("没有定位信息,请重新定位!");
      return false;
    }
    if (!this.newCustomer.Name) {
      common.toastMessage("请输入客户名称!");
      return false;
    }
    if (!this.newCustomer.Address) {
      common.toastMessage("请输入客户地址!");
      return false;
    }
    return true;
  }

  private openSelectDictionaryValue(dicKey, title, oldValue, setValueFunc) {
    this.popupDicKey = dicKey;
    this.popupTitle = title;
    this.popupOldValue = oldValue;
    this.setValueCallback = setValueFunc;
    this.showSelectDictionaryValue = true;
  }

  private cancelSelectDictionaryValue() {
    this.showSelectDictionaryValue = false;
  }

  private completeSelectDictionaryValue(value) {
    this.setValueCallback(value);
    this.showSelectDictionaryValue = false;
    this.popupOldValue = null;
  }
}

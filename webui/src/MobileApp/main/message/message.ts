/**
 * @module MobileApp\main\message
 */
import Vue from "vue";
import { IndexList, IndexSection } from 'mint-ui';
import 'mint-ui/lib/index-list/style.css';
import 'mint-ui/lib/index-section/style.css';
import { Component, Watch } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import navTabbar from "@/MobileApp/components/navTabbar";
import AppCookies from "../../appCookies";
import HanziToPinyin from "@/MobileApp/utils/hanziToPinyin";
import common from "@/MobileApp/utils/common";

Vue.component(IndexList.name,IndexList);
Vue.component(IndexSection.name,IndexSection);

@Component({
  components: { navTabbar }
})
export default class Message extends Vue {
  [x: string]: any;
  private isBusy = true;
  private keyword = "";
  private personList = [] as IndexObject;
  private personListGroupByLetter = [] as IndexObject;

  mounted() {
    this.queryPersonList();
  }

  @Watch("keyword")
  onKeywordChanged(newVal: string, oldVal: string) {
    if (!newVal || newVal === "") {
      this.queryPersonList();
    }
  }

  private goPersonDatails(personInfo) {
    this.$router.push({
      path: "/personDetails",
      query: { PersonInfo: personInfo }
    });
  }

  private queryPersonList() {
    this.isBusy = true;
    let currentEntCd = AppCookies.instance.getEntCd();
    this.$Api
      .invoke({
        moduleName: "crm.basic.personService",
        className: "PersonService",
        method: "getIncumbentList",
        args: {
          entCd: currentEntCd,
          incumbent: true,
          keyword: this.keyword
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.queryPersonSuccess(res);
        } else {
          this.queryPersonFailed(res);
        }
      })
      .catch(res => {
        this.queryPersonException(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private queryPersonSuccess(res) {
    this.personList = [];
    if (!res.data.data || res.data.data.length === 0) {
      this.personListGroupByLetter = [];
      return;
    }
    res.data.data.forEach(element => {
      element.Letter = HanziToPinyin.instance.initialTreatment(element.Name);
      this.personList.push(element);
    });
    this.personListGroupByLetter = Enumerable.from(this.personList)
      .groupBy(
        (x: any) => x.Letter,
        (x: any) => x,
        (key: any, res: any) => {
          return { Letter: key, personList: res.toArray() };
        }
      )
      .orderBy((x: any) => x.Letter)
      .toArray();
  }

  private queryPersonFailed(res) {
    common.toastMessage("查询失败!" + res.data.error);
  }

  private queryPersonException(res) {
    common.toastMessage("查询异常!" + res);
  }

  private dialPhoneNumber(phoneNumber) {
    if (!phoneNumber) {
      common.toastMessage("此用户未配置电话信息,请联系管理员!", 2000);
      return;
    }
    window.location.href = "tel:" + phoneNumber;
  }
}

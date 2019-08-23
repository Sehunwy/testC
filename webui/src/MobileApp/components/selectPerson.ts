/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { IndexList, IndexSection } from 'mint-ui';
import 'mint-ui/lib/index-list/style.css';
import 'mint-ui/lib/index-section/style.css';
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../appCookies";
import HanziToPinyin from "@/MobileApp/utils/hanziToPinyin";
import crmLoading from "@/MobileApp/components/crmLoading";
import common from "@/MobileApp/utils/common";

Vue.component(IndexList.name,IndexList);
Vue.component(IndexSection.name,IndexSection);

@Component({
  components: { crmLoading }
})
export default class SelectPerson extends Vue {
  [x: string]: any;
  private selectedPersons = [] as IndexObject;
  private isBusy = false;
  private personList = [] as IndexObject;
  private personListGroupByLetter = [] as IndexObject;

  @Prop({ default: "选择人员" }) title!: string;
  @Prop({ default: 0 }) maxCount!: Number;

  created() {
    this.getPersonList();
  }

  private getPersonList() {
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
          keyword: ""
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
          return { Letter: key, PersonList: res.toArray() };
        }
      )
      .orderBy((x: any) => x.Letter)
      .toArray();
  }

  private queryPersonFailed(res) {
    common.toastMessage("查询人员列表出错!" + res.data.error);
    console.log(res);
  }

  private queryPersonException(res) {
    common.toastMessage("查询人员列表异常!" + res);
    console.log(res);
  }

  private toggleCheckPerson(person) {
    if (!person || !this.$refs.checkboxes) {
      return;
    }
    let ckeckbox: any = Enumerable.from(this.$refs.checkboxes)
      .where((x: any) => {
        return x.name.Id === person.Id;
      })
      .firstOrDefault();
    if (!ckeckbox) {
      return;
    }
    ckeckbox.toggle();
  }

  @Emit("goBack")
  private goBack() {}

  private confirmComplete() {
    if (!this.selectedPersons || this.selectedPersons.length === 0) {
      common.dialogAlert("提示","还未选择人员!");
      return;
    }
    this.complete();
  }

  @Emit("complete")
  private complete() {
    return this.selectedPersons;
  }

}

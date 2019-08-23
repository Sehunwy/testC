/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";
import AppCookies from "../appCookies";

@Component
export default class SelectDictionaryValue extends Vue {
  [x: string]: any;

  @Prop({ default: "" }) title!: string;
  @Prop({ default: "" }) dicKey!: string;
  @Prop({ default: "" }) currentValue!: string;

  private selectedValue = "";
  private isBusy = false;
  private allValues = [] as IndexObject;

  @Watch("dicKey")
  onDicKeyChanged(newVal: string, oldVal: string) {
    this.allValues = [];
    this.selectedValue = "";
    this.queryDictionaryValueList(newVal);
  }

  @Watch("currentValue")
  onCurrentValueChanged(newVal: string, oldVal: string) {
    this.selectedValue = newVal;
  }

  created() {
    this.queryDictionaryValueList(this.dicKey);
  }

  private queryDictionaryValueList(dicItemCd) {
    let enterpriseCd = AppCookies.instance.getEntCd();
    if (
      !enterpriseCd ||
      enterpriseCd === "" ||
      !dicItemCd ||
      dicItemCd === ""
    ) {
      this.allValues = [];
      return;
    }
    this.isBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.dictionaryService",
        className: "DictionaryService",
        method: "getByCd",
        args: {
          entCd: enterpriseCd,
          cd: dicItemCd
        }
      })
      .then(res => {
        if (res.data.data) {
          this.allValues = res.data.data.Values;
        } else {
          this.allValues = [];
        }
      })
      .catch(res => {
        this.allValues = [];
        console.log(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }

  private onSelectValue(value) {
    if (this.selectedValue === value) {
      this.selectedValue = "";
    } else {
      this.selectedValue = value;
    }
    this.onComplete();
  }

  @Emit("cancel")
  private onCancel() {}

  @Emit("complete")
  private onComplete() {
    return this.selectedValue;
  }
}

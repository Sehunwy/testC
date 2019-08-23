import { IServiceData } from "@/types";
import { Res } from "@/utils";
import Vue from "vue";
import { get } from "./api";

export default class ServiceVue extends Vue {
  [x: string]: any;
  private data: IServiceData = {} as IServiceData;

  protected get Data() {
    return this.data;
  }
  protected set Data(value: IServiceData) {
    this.data = value;
  }

  public invoke() {
    console.log("调用的是基类方法");
    console.log("查询数据为：", this.data);
    this.data.isBusy = true;
    this.$Api
      .invoke(this.data.req)
      .then(res => {
        this.data.res = res;
        this.process(res);
        this.$nextTick(() => {
          this.data.isBusy = false;
        });
      })
      .catch(res => {
        this.data.res = res;
        this.process(res);
        this.$nextTick(() => {
          this.data.isBusy = false;
        });
      });
  }

  protected process(data: Res) {}
}

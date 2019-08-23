import Vue from "vue";
import { Component } from "vue-property-decorator";
import { RequestInfo, Res } from "../api";

@Component
export default class Pagination extends Vue {
  [x: string]: any;
  protected data = [];
  protected isBusy = false;
  protected currentPage = 1;
  protected totalCount = 0;
  protected pageSize = 100;
  protected req: RequestInfo = {
    moduleName: "",
    className: "",
    method: "",
    args: {}
  };

  page(page: number) {
    let skip = (page - 1) * this.pageSize;
    this.query(skip);
  }
  query(skip: number = 0, limit: number = this.pageSize) {
    this.isBusy = true;
    this.prePareRequest(skip, limit);
    this.$Api
      .invoke(this.req)
      .then(res => {
        this.processResult(res);
      })
      .finally(() => {
        this.isBusy = false;
      });
  }
  protected prePareRequest(skip: number = 0, limit: number = this.pageSize) {}

  protected processResult(res: Res) {
    this.totalCount = res.data.data[0];
    this.data = res.data.data[1];
  }
}

/**
 * @module views\crm\basic\enterprise
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class EnterpriseBasicInfo extends Vue {
  [x: string]: any;
  private enterprise = {};
  private isbusy = false;

  mounted() {
    console.log();
  }

  created() {
    this.getEnterprise("SNS");
  }

  private getEnterprise(code) {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.enterpriseService",
        className: "EnterpriseService",
        method: "getByCd",
        args: {
          cd: code
        }
      })
      .then(res => {
        this.enterprise = res.data.data;
        console.log(this.enterprise);
      })
      .catch(res => {
        this.$message.error("查询失败!");
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }
}

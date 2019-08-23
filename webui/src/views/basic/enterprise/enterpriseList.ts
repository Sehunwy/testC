/**
 * @module views\crm\basic\enterprise
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component, Prop, Watch } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class EnterpriseList extends Vue {
  [x: string]: any;
  private data = [];
  private currentPage = 1;
  private keyword = "";
  private pskip = 0;
  private plimit = 20;
  private isbusy = false;
  private count = 0;

  private editItem = {};
  private isShowAddForm = false;

  private queryEnterprise() {
    this.currentPage = 1;
    this.pskip = 0;
    this.getEnterpriseList();
  }

  private getEnterpriseList() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.enterpriseService",
        className: "EnterpriseService",
        method: "query",
        args: {
          keyword: this.keyword,
          skip: this.pskip,
          limit: this.plimit
        }
      })
      .then(res => {
        this.data = res.data.data[1];
        // Enumerable.from(this.data).where((c:IndexObject)=>c.Id=='')
        this.count = res.data.data[0];
        console.log(this.data);
      })
      .catch(res => {
        this.data = [];
        this.count = 0;
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  private page(page: number) {
    this.pskip = (page - 1) * this.plimit;
    this.getEnterpriseList();
  }

  created() {
    this.queryEnterprise();
  }

  private handleEdit(index, item) {
    this.editItem = item;
    this.isShowAddForm = true;
  }

  private handleDelete(index, item) {
    this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.delete(item);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }

  private delete(deleteItem) {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.enterpriseService",
        className: "EnterpriseService",
        method: "delete",
        args: {
          ids: [deleteItem.Id]
        }
      })
      .then(res => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.page(this.currentPage);
      })
      .catch(res => {
        this.$message.error("删除失败!");
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  private add() {
    this.editItem = {
      Name: "",
      Cd: "",
      Ctrl: "",
      SimpleName: "",
      Address: "",
      Telephone: "",
      Fax: "",
      LegalPerson: ""
    };
    this.isShowAddForm = true;
  }

  private cancelAdd() {
    this.editItem = {};
    this.isShowAddForm = false;
  }

  private save() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.enterpriseService",
        className: "EnterpriseService",
        method: "createOrUpdate",
        args: {
          newEnterprise: this.editItem
        }
      })
      .then(res => {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
        this.isShowAddForm=false;
        this.page(this.currentPage);
      })
      .catch(res => {
        this.$message.error("保存失败!");
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }
}

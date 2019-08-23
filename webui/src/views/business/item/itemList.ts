/**
 * @module views\crm\business\item
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class ItemList extends Vue {
  [x: string]: any;
  private dataList = [];
  private currentPage = 1;
  private keyword = "";
  private pskip = 0;
  private plimit = 20;
  private isbusy = false;
  private count = 0;
  private itemFlowList = [];
  private dialogTableVisible = false;
  private viewItemFlowBusy = false;

  private queryItemList() {
    this.currentPage = 1;
    this.pskip = 0;
    this.getItemList();
  }

  private getItemList() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.item.itemService",
        className: "ItemService",
        method: "query",
        args: {
          entCd: "SNS",
          keyword: this.keyword,
          skip: this.pskip,
          limit: this.plimit
        }
      })
      .then(res => {
        this.dataList = res.data.data[1];
        this.count = res.data.data[0];
      })
      .catch(res => {
        this.dataList = [];
        this.count = 0;
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  private page(page: number) {
    this.pskip = (page - 1) * this.plimit;
    this.getItemList();
  }

  created() {
    this.queryItemList();
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
        moduleName: "crm.item.itemService",
        className: "ItemService",
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

  private viewItemFlows(index, row) {
    if (!row || !row.Id) {
      return;
    }
    this.dialogTableVisible = true;
    this.viewItemFlowBusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.item.itemFlowService",
        className: "ItemFlowService",
        method: "getListByItemId",
        args: {
          itemId: row.Id
        }
      })
      .then(res => {
        this.itemFlowList = res.data.data;
      })
      .catch(res => {
        this.itemFlowList = [];
      })
      .finally(() => {
        this.viewItemFlowBusy = false;
      });
  }

  private closeViewItemFlowDialog() {
    this.dialogTableVisible = false;
    this.itemFlowList = [];
  }
}

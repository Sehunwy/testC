/**
 * @module views\crm\business\dailyReport
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class DailyReportList extends Vue {
  [x: string]: any;
  private dataList = [];
  private currentPage = 1;
  private keyword = "";
  private pskip = 0;
  private plimit = 20;
  private isbusy = false;
  private count = 0;

  private queryDailyReportList() {
    this.currentPage = 1;
    this.pskip = 0;
    this.getDailyReportList();
  }

  private getDailyReportList() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.attendance.dailyReportService",
        className: "DailyReportService",
        method: "query",
        args: {
          entCd:"SNS",
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
    this.getDailyReportList();
  }

  created() {
    this.queryDailyReportList();
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
        moduleName: "crm.attendance.dailyReportService",
        className: "DailyReportService",
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
}

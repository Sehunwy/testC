/**
 * @module views\crm\basic\dictionary
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class Dictionary extends Vue {
  [x: string]: any;
  private dataList = [];
  private isbusy = false;
  private keyword = "";
  private currentData = {} as IndexObject;
  private currentDataValues: string[] = [];

  private queryDatas() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.dictionaryService",
        className: "DictionaryService",
        method: "query",
        args: {
          entCd: "SNS",
          keyword: this.keyword
        }
      })
      .then(res => {
        this.dataList = res.data.data;
        console.log(this.dataList);
      })
      .catch(res => {
        this.dataList = [];
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  private onSelectChanged(data) {
    this.currentData = data;
    if (!this.currentData || !this.currentData.Values) {
      this.currentDataValues = [];
    } else {
      this.currentDataValues = this.currentData.Values;
    }
  }

  private save(data) {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.dictionaryService",
        className: "DictionaryService",
        method: "createOrUpdate",
        args: {
          newObj: data
        }
      })
      .then(res => {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
        this.queryDatas();
      })
      .catch(res => {
        this.$message.error("保存失败!");
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  private createDictionaryValue() {
    if (!this.currentData) {
      this.$message({
        type: "info",
        message: "未指定数据字典项"
      });
      return;
    }
    if (!this.currentDataValues) {
      this.currentDataValues = [];
    }
    this.currentDataValues.push("");
  }

  private confirmDeleteDictionaryValue(index) {
    this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.deleteDictionaryValue(index);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }

  private deleteDictionaryValue(index) {
    if (!this.currentData) {
      this.$message({
        type: "info",
        message: "未指定数据字典项"
      });
      return;
    }
    if (!this.currentDataValues) {
      return;
    }
    if (index > -1) {
      this.currentDataValues.splice(index, 1);
    }
  }

  private saveDictionaryValue() {
    if (!this.currentData) {
      this.$message({
        type: "info",
        message: "未指定数据字典项"
      });
      return;
    }
    this.currentData.Values = this.currentDataValues;
    this.save(this.currentData);
  }

  private syncDictionary() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.dictionaryService",
        className: "DictionaryService",
        method: "syncDictionary",
        args: {
          entId: "5c110e82250cb7264c01801a",
          entCd: "SNS"
        }
      })
      .then(res => {
        this.$message({
          type: "success",
          message: "同步成功!"
        });
        this.queryDatas();
      })
      .catch(res => {
        this.$message.error("同步失败!");
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  created() {
    this.queryDatas();
  }
}

/**
 * @module views\crm\basic\dictionary
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class DictionaryTemplate extends Vue {
  [x: string]: any;
  private dataList = [];
  private isbusy = false;
  private keyword = "";
  private currentData = {} as IndexObject;
  private editData = {} as IndexObject;
  private dialogDictionaryItemVisible = false;
  private currentDataValues: string[] = [];

  private rules = {
    Name: [{ required: true, message: "请输入名称", trigger: "blur" }],
    Cd: [{ required: true, message: "请输入编码", trigger: "blur" }]
  };

  private queryDatas() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.dictionaryService",
        className: "DictionaryTemplateService",
        method: "query",
        args: {
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

  private createDictionary() {
    this.editData = {
      Name: "",
      Cd: "",
      Values: []
    };
    this.dialogDictionaryItemVisible = true;
  }

  private handleEdit(index, data) {
    this.editData = {
      Id: data.Id,
      Name: data.Name,
      Cd: data.Cd,
      Values: data.Values
    };
    this.dialogDictionaryItemVisible = true;
  }

  private closeDictionaryItemDialog() {
    this.dialogDictionaryItemVisible = false;
  }

  private handleDelete(index, data) {
    if (!data) {
      this.$message({
        type: "info",
        message: "未指定删除项"
      });
      return;
    }
    this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.remove(data);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }

  private remove(data) {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.dictionaryService",
        className: "DictionaryTemplateService",
        method: "delete",
        args: {
          ids: [data.Id]
        }
      })
      .then(res => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.queryDatas();
      })
      .catch(res => {
        this.$message.error("删除失败!");
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

  private validate(formName) {
    let form = this.$refs[formName] as IndexObject;
    form.validate(valid => {
      if (valid) {
        this.save(this.editData);
      } else {
        return false;
      }
    });
  }

  private save(data) {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.dictionaryService",
        className: "DictionaryTemplateService",
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
        this.closeDictionaryItemDialog();
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

  created() {
    this.queryDatas();
  }
}

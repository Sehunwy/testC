/**
 * @module views\crm\basic\area
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class Area extends Vue {
  [x: string]: any;
  private treeDatas = [];
  private isbusy = false;
  private defaultProps = {
    children: "Childs",
    label: "Name"
  };
  private currentData = {
    ParentCd: null,
    Name: "",
    Cd: ""
  } as IndexObject;
  private rules = {
    Name: [{ required: true, message: "请输入名称", trigger: "blur" }],
    Cd: [{ required: true, message: "请输入编码", trigger: "blur" }]
  };

  private queryTreeDatas() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.areaService",
        className: "AreaService",
        method: "getTreeList",
        args: {}
      })
      .then(res => {
        this.treeDatas = res.data.data;
        console.log(this.treeDatas);
      })
      .catch(res => {
        this.treeDatas = [];
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  private append(data) {
    console.log(data);
    this.currentData = {
      ParentCd: data.Cd,
      Name: "",
      Cd: ""
    };
  }

  private createRootData() {
    this.currentData = {
      ParentCd: "-1",
      Name: "",
      Cd: ""
    };
  }

  private confirmRemove(data) {
    if (!data) {
      this.$message({
        type: "info",
        message: "未指定删除项"
      });
      return;
    }
    this.$confirm("此操作将永久删除该记录及其子项, 是否继续?", "提示", {
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
        moduleName: "crm.basic.areaService",
        className: "AreaService",
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
        this.queryTreeDatas();
      })
      .catch(res => {
        this.$message.error("删除失败!");
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  private selectChanged(data, node) {
    this.currentData = data;
    console.log(data);
  }

  private validate(formName) {
    let form = this.$refs[formName] as IndexObject;
    form.validate(valid => {
      if (valid) {
        this.save();
      } else {
        return false;
      }
    });
  }

  private save() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.areaService",
        className: "AreaService",
        method: "createOrUpdate",
        args: {
          newObj: this.currentData
        }
      })
      .then(res => {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
        this.queryTreeDatas();
      })
      .catch(res => {
        this.$message.error("保存失败!");
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  created() {
    this.queryTreeDatas();
  }
}

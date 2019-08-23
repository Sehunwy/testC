/**
 * @module views\crm\basic\organization
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class Organization extends Vue {
  [x: string]: any;
  private treeDatas = [];
  private personList = [];
  private isbusy = false;
  private defaultProps = {
    children: "Childs",
    label: "Name"
  };
  private currentData = {} as IndexObject;
  private rules = {
    Name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
    Level: [{ required: true, message: "未指定部门层级", trigger: "blur" }]
  };

  private queryTreeDatas() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.organizationService",
        className: "OrganizationService",
        method: "getTreeList",
        args: {
          entCd: "SNS"
        }
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
      EntId: "5c110e82250cb7264c01801a",
      EntCd: "SNS",
      ParentId: data.Id,
      ParentName: data.Name,
      Level: data.Level + 1,
      Name: "",
      Cd: "",
      Ctrl: "",
      Remark: "",
      DeptHeaders: [],
      DeptTitles:[]
    };
  }

  private confirmRemove(data) {
    if (!data.ParentId) {
      this.$message({
        type: "info",
        message: "不可以删除"
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
        moduleName: "crm.basic.organizationService",
        className: "OrganizationService",
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
    // this.currentData.Childs = null;
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
        moduleName: "crm.basic.organizationService",
        className: "OrganizationService",
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
    this.getPersonList();
  }

  private getPersonList() {
    this.$Api
      .invoke({
        moduleName: "crm.basic.personService",
        className: "PersonService",
        method: "getList",
        args: {
          entCd: "SNS"
        }
      })
      .then(res => {
        this.personList = res.data.data;
      })
      .catch(res => {
        this.personList = [];
        console.log(res);
      });
  }
}

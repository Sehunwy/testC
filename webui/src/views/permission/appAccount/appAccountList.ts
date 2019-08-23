/**
 * @module views\crm\permission\appAccount
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";

@Component
export default class AppAccountList extends Vue {
  [x: string]: any;
  private dataList = [];
  private personList = [];
  private currentPage = 1;
  private keyword = "";
  private pskip = 0;
  private plimit = 20;
  private isbusy = false;
  private count = 0;

  private editItem = {} as IndexObject;
  private isShowAddForm = false;

  private rules = {
    PersonId: [{ required: true, message: "请选择人员", trigger: "blur" }],
    Telephone: [{ required: true, message: "未指定人员电话", trigger: "blur" }],
    SigninName: [{ required: true, message: "未指定账户登录名", trigger: "blur" }],
    Password: [{ required: true, message: "未指定账户密码", trigger: "blur" }]
  };

  private queryAccountList() {
    this.currentPage = 1;
    this.pskip = 0;
    this.getAccountList();
  }

  private getAccountList() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.permission.appAccountService",
        className: "AppAccountService",
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
        console.log(this.data);
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
    this.getAccountList();
  }

  created() {
    this.queryAccountList();
    this.getPersonList();
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

  private handleResetPassword(index, item){

  }

  private delete(deleteItem) {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.permission.appAccountService",
        className: "AppAccountService",
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
      EntId: "5c110e82250cb7264c01801a",
      EntCd: "SNS",
      Telephone: null,
      SigninName: null,
      Password: null,
      PersonId: null,
      PersonName: null,
      LastSigninTime: null
    } as IndexObject;
    this.isShowAddForm = true;
  }

  private cancelAdd() {
    this.editItem = {};
    this.isShowAddForm = false;
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
        moduleName: "crm.permission.appAccountService",
        className: "AppAccountService",
        method: "createOrUpdate",
        args: {
          newObj: this.editItem
        }
      })
      .then(res => {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
        this.isShowAddForm = false;
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

  private selectPersonChanged(personId) {
    if (!personId || !this.personList || !this.editItem) {
      return;
    }
    this.personList.forEach(element => {
      let person = element as IndexObject;
      if (person.Id === personId) {
        this.editItem.PersonName = person.Name;
        this.editItem.SigninName = person.Telephone;
        this.editItem.Telephone = person.Telephone;
        console.log(this.editItem);
      }
    });
  }
}

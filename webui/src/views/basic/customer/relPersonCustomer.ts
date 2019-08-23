/**
 * @module views\crm\basic\customer
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import { IndexObject } from "@/types";
import format from "@/plugins/format";

@Component({
  filters: {
    formatIncumbent(incumbent) {
      return format.formatIncumbent(incumbent);
    }
  }
})
export default class RelPersonCustomer extends Vue {
  [x: string]: any;
  private personList = [];
  private personCustomList = [];
  private unBindCustomList = [];
  private isbusy = false;
  private selectedPerson = {} as IndexObject;
  private dialogTableVisible = false;
  private selectedCustomerList = [];
  private searchUnBindClient = "";
  private searchBindClient = "";
  private searchPerson = "";

  private onSelectPerson(person) {
    this.selectedPerson = person;
    this.getPersonCustomerList(person);
  }

  created() {
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
        console.log(res.data.data);
        this.personList = res.data.data;
      })
      .catch(res => {
        this.personList = [];
        console.log(res);
      });
  }

  private getPersonCustomerList(person) {
    if(!person){
      this.personCustomList = [];
      return;
    }
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.customerService",
        className: "CustomerService",
        method: "getCustomersByPersonId",
        args: {
          personId: person.Id
        }
      })
      .then(res => {
        console.log(res.data.data);
        this.personCustomList = res.data.data;
      })
      .catch(res => {
        this.personCustomList = [];
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
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
    if (!this.selectedPerson) {
      this.$message({
        type: "info",
        message: "未选择人员"
      });
      return;
    }
    if (!deleteItem) {
      this.$message({
        type: "info",
        message: "未指定删除客户"
      });
      return;
    }
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.relPersonCustomerService",
        className: "RelPersonCustomerService",
        method: "deleteRel",
        args: {
          personId: this.selectedPerson.Id,
          customerId: deleteItem.Id
        }
      })
      .then(res => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getPersonCustomerList(this.selectedPerson);
      })
      .catch(res => {
        this.$message.error("删除失败!");
        console.log(res);
      })
      .finally(() => {
        this.isbusy = false;
      });
  }

  private openBindCustomerDialog() {
    if (!this.selectedPerson || !this.selectedPerson.Id) {
      this.$message({
        type: "info",
        message: "未选择人员"
      });
      return;
    }
    this.dialogTableVisible = true;
    this.getUnBindCustomList(this.selectedPerson);
  }

  private closeBindCustomerDialog() {
    this.dialogTableVisible = false;
    this.unBindCustomList = [];
    this.selectedCustomerList = [];
  }

  private bindCustomer() {
    if (
      this.selectedCustomerList === null ||
      this.selectedCustomerList.length === 0
    ) {
      this.dialogTableVisible = false;
      this.$message({
        type: "info",
        message: "未选择客户"
      });
      return;
    }
    if (!this.selectedPerson || !this.selectedPerson.Id) {
      this.$message({
        type: "info",
        message: "未选择人员"
      });
      return;
    }
    let rels: any[] = [];
    this.selectedCustomerList.forEach(element => {
      let newRel = {
        PersonId: this.selectedPerson.Id,
        PersonCd: this.selectedPerson.Cd,
        PersonName: this.selectedPerson.Name,
        CustomerId: (element as IndexObject).Id,
        CustomerCd: (element as IndexObject).Cd,
        CustomerName: (element as IndexObject).Name
      };
      rels.push(newRel);
    });
    console.log(rels);
    this.$Api
      .invoke({
        moduleName: "crm.basic.relPersonCustomerService",
        className: "RelPersonCustomerService",
        method: "createOrUpdateList",
        args: {
          objList: rels
        }
      })
      .then(res => {
        this.$message({
          type: "success",
          message: "绑定成功!"
        });
        this.getPersonCustomerList(this.selectedPerson);
      })
      .catch(res => {
        this.$message.error("绑定失败!");
        console.log(res);
      })
      .finally(() => {
        this.closeBindCustomerDialog();
      });
  }

  private getUnBindCustomList(person) {
    this.$Api
      .invoke({
        moduleName: "crm.basic.customerService",
        className: "CustomerService",
        method: "getUnbindCustomerList",
        args: {
          entCd:"SNS",
          personId: person.Id
        }
      })
      .then(res => {
        console.log(res.data.data);
        this.unBindCustomList = res.data.data;
      })
      .catch(res => {
        this.unBindCustomList = [];
        console.log(res);
      });
  }

  private onSelectedCustomerChange(val) {
    console.log(val);
    this.selectedCustomerList = val;
  }
}

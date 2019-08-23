/**
 * @module views\crm\basic\person
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
export default class Person extends Vue {
  [x: string]: any;
  private dataList = [];
  private deptList = [];
  private salesAreaList = [];
  private salesAreaListAndAll = [];
  private currentPage = 1;
  private keyword = "";
  private pskip = 0;
  private plimit = 10;
  private isbusy = false;
  private count = 0;
  private selectedDept = {};

  private editItem = {} as IndexObject;
  private isShowAddForm = false;

  private queryPerson() {
    this.currentPage = 1;
    this.pskip = 0;
    this.getPersonList();
  }

  private getPersonList() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.personService",
        className: "PersonService",
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
    this.getPersonList();
  }

  created() {
    this.queryPerson();
    this.getDeptList();
    this.getSalesAreaList();
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
        moduleName: "crm.basic.personService",
        className: "PersonService",
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
      Name: null,
      Cd: null,
      Ctrl: null,
      Address: null,
      Title: null,
      Telephone: null,
      Email: null,
      Gender: null,
      DirectDeptId: null,
      DirectDept: null,
      SalesAreaId: null,
      SalesArea: null,
      Incumbent: true,
      IsSalesPerson: true,
      CanViewSaleAreas: [],
      ClockingInTypeCd: null,
      ClockingInType: null,
      Remark: null,
      ProvinceCd: null,
      ProvinceName: null,
      CityCd: null,
      CityName: null,
      DistrictCd: null,
      DistrictName: null
    } as IndexObject;
    this.isShowAddForm = true;
  }

  private cancelAdd() {
    // this.editItem = {};
    this.isShowAddForm = false;
  }

  private save() {
    this.isbusy = true;
    this.$Api
      .invoke({
        moduleName: "crm.basic.personService",
        className: "PersonService",
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

  private getDeptList() {
    this.$Api
      .invoke({
        moduleName: "crm.basic.organizationService",
        className: "OrganizationService",
        method: "getList",
        args: {
          entCd: "SNS"
        }
      })
      .then(res => {
        this.deptList = res.data.data;
      })
      .catch(res => {
        this.deptList = [];
        console.log(res);
      });
  }

  private selectDeptChanged(deptId) {
    if (!deptId || !this.deptList || !this.editItem) {
      return;
    }
    this.deptList.forEach(element => {
      let dept = element as IndexObject;
      if (dept.Id === deptId) {
        this.selectedDept = dept;
        this.editItem.DirectDept = dept.Name;
      }
    });
  }

  private getSalesAreaList() {
    this.$Api
      .invoke({
        moduleName: "crm.basic.salesAreaService",
        className: "SalesAreaService",
        method: "getList",
        args: {
          entCd: "SNS"
        }
      })
      .then(res => {
        this.salesAreaList = res.data.data;
        let lst = res.data.data.slice();
        lst.splice(0, 0, { Id: "-1", Name: "全部" });
        this.salesAreaListAndAll = lst;
      })
      .catch(res => {
        this.salesAreaList = [];
        this.salesAreaListAndAll = [];
        console.log(res);
      });
  }

  private selectSalesAreaChanged(salesAreaId) {
    if (!salesAreaId || !this.salesAreaList || !this.editItem) {
      return;
    }
    this.salesAreaList.forEach(element => {
      let salesArea = element as IndexObject;
      if (salesArea.Id === salesAreaId) {
        this.editItem.SalesArea = salesArea.Name;
      }
    });
  }

  private isSalesPersonChanged(newValue) {
    if (newValue || !this.editItem) {
      return;
    }
    this.editItem.SalesArea = null;
    this.editItem.SalesAreaId = null;
  }
}

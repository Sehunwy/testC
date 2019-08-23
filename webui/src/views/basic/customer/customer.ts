/**
 * @module views\crm\basic\customer
 */
import Vue from "vue";
import Enumerable from "linq";
import { Component } from "vue-property-decorator";
import {IndexObject} from "@/types";

@Component
export default class Customer extends Vue {
    [x: string]: any;
    private dataList = [];
    private currentPage = 1;
    private keyword = "";
    private pskip = 0;
    private plimit = 20;
    private isbusy = false;
    private count = 0;
  
    private editItem = {} as IndexObject;
    private isShowAddForm = false;
  
    private queryCustomer() {
      this.currentPage = 1;
      this.pskip = 0;
      this.getCustomerList();
    }
  
    private getCustomerList() {
      this.isbusy = true;
      this.$Api
        .invoke({
          moduleName: "crm.basic.customerService",
          className: "CustomerService",
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
      this.getCustomerList();
    }
  
    created() {
      this.queryCustomer();
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
          moduleName: "crm.basic.customerService",
          className: "CustomerService",
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
          SimpleName: null,
          Address: null,
          LocationDesc: null,
          Level: null,
          Telephone: null,
          Fax: null,
          IndustryCategory: null,
          MainProduction: null,
          DevelopProgress: null,
          // 收货信息
          Consignee: null,
          ConsigneePhone: null,
          ConsigneeAddress: null,
          ConsigneeRemark: null,
          // 客户详情
          RegisterAddress: null,
          CreditCode: null,
          CreditCodeExpire: null,
          ProduceLicense: null,
          ProduceLicenseExpire: null,
          BusinessLicense: null,
          BusinessLicenseExpire: null,
          RegisteredCapital: null,
          CompanyType: null,
          LegalPerson: null,
          LegalPersonIdNumber: null,
          LegalPersonAddress: null,
          Bank: null,
          BankAccount: null,
          AccountPeriod: null,
          CreditSituation: null,
          CreditLine: null,
          ContractAgreement: null,
          OwnerProductClose: null,
          AgencyProductClose: null,
          CompanySite: null,
          // 经营信息
          BusinessAddress: null,
          BusinessArea: null,
          BusinessScale: null,
          TechnicalSituation: null,
          BusinessProduction: null,
          ProductionSellArea: null,
          BusinessOwnerProduction: null,
          Remark: null,
          // 省市区
          ProvinceCd: null,
          ProvinceName: null,
          CityCd: null,
          CityName: null,
          CountyCd: null,
          CountyName: null
        } as IndexObject;
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
          moduleName: "crm.basic.customerService",
          className: "CustomerService",
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
}

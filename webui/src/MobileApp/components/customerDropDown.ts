/**
 * @module MobileApp\components
 */
import Vue from "vue";
import { Component, Prop, Watch, Emit } from "vue-property-decorator";
import { IndexObject } from "@/types";
import Enumerable from "linq";

@Component
export default class CustomerDropDown extends Vue {
  [x: string]: any;
  private showSortDropdown = false;
  private showFilterDropdown = false;
  private showBackCover = false;
  private soryByVisitTime = {
    Name: "按拜访时间排序",
    SimpleName: "拜访时间",
    Cd: "sortByVisitTime",
    Asc: true
  };
  private soryByCreateTime = {
    Name: "按创建时间排序",
    SimpleName: "创建时间",
    Cd: "sortByCreateTime",
    Asc: false
  };
  private soryByName = {
    Name: "按名称排序",
    SimpleName: "名称",
    Cd: "sortByName",
    Asc: true
  };
  private soryByDistance = {
    Name: "按距离排序",
    SimpleName: "距离",
    Cd: "sortByDistance",
    Asc: true
  };
  private soryByLevel = {
    Name: "按级别排序",
    SimpleName: "级别",
    Cd: "sortByLevel",
    Asc: false
  };
  private sortOptions = [
    this.soryByVisitTime,
    this.soryByCreateTime,
    this.soryByName,
    this.soryByDistance,
    this.soryByLevel
  ];
  private defaultSort = this.soryByVisitTime;

  private filterAll = { Name: "全部", Cd: "All" };
  private filterByLevel = { Name: "客户等级", Cd: "CustomerLevel" };
  private filterByManageCompany = { Name: "管理公司", Cd: "ManagementCompany" };
  private filterByDevProgress = { Name: "开发进度", Cd: "DevProgress" };
  private filterByOrganization = { Name: "组织结构", Cd: "Organization" };

  private filterTypes = [
    this.filterAll,
    this.filterByLevel,
    this.filterByManageCompany,
    this.filterByDevProgress,
    this.filterByOrganization
  ];
  private defaultFilterType = this.filterAll;

  @Prop({ default: true }) enableFilterDropdown!: boolean;
  
  mounted() {
    this.onSelectSortOption();
  }

  private openSortDropdown() {
    if (this.showFilterDropdown) {
      this.showFilterDropdown = false;
    }
    this.showSortDropdown = !this.showSortDropdown;
    this.showBackCover = this.showSortDropdown;
  }

  private openFilterDropdown() {
    if (this.showSortDropdown) {
      this.showSortDropdown = false;
    }
    this.showFilterDropdown = !this.showFilterDropdown;
    this.showBackCover = this.showFilterDropdown;
  }

  private closeDropdown() {
    this.showFilterDropdown = false;
    this.showSortDropdown = false;
    this.showBackCover = false;
  }

  private sortOptionClick(option) {
    if (this.defaultSort === option) {
      option.Asc = !option.Asc;
    }
    this.defaultSort = option;
    this.closeDropdown();
    this.onSelectSortOption();
  }

  @Emit("onSelectSortOption")
  private onSelectSortOption() {
    return this.defaultSort;
  }

  @Emit("onSearch")
  private onSearch() {}

  private filterTypeItemClick(filterType) {
    this.defaultFilterType = filterType;
    if(this.defaultFilterType===this.filterAll){
      this.closeDropdown();
    }
  }
}

import Vue from "vue";

export const crmAppEntId = "GHCrmApp_EntId";
export const crmAppEntCd = "GHCrmApp_EntCd";
export const crmAppPersonId = "GHCrmApp_PersonId";
export const crmAppPersonName = "GHCrmApp_PersonName";
export const crmAppAccountId = "GHCrmApp_AccountId";
export const crmAppAccountName = "GHCrmApp_AccountName";
export const crmAppIsLeader = "GHCrmApp_IsLeader";
export const crmAppIsSalesPerson = "GHCrmApp_IsSalesPerson";
export const crmAppSalesAreaId = "GHCrmApp_SalesAreaId";
export const crmAppSalesArea = "GHCrmApp_SalesArea";

export class AppCookies extends Vue {
  public checkCookies() {
    if (
      !this.getPersonId() ||
      !this.getPersonName() ||
      !this.getAccountId() ||
      !this.getAccountName() ||
      !this.getEntId() ||
      !this.getEntCd() ||
      !this.getIsLeader()
    ) {
      return false;
    }
    return true;
  }

  // 获取cookie
  public getEntId() {
    return this.$cookies.get(crmAppEntId);
  }

  public getEntCd() {
    return this.$cookies.get(crmAppEntCd);
  }

  public getPersonId() {
    return this.$cookies.get(crmAppPersonId);
  }

  public getPersonName() {
    return this.$cookies.get(crmAppPersonName);
  }

  public getAccountId() {
    return this.$cookies.get(crmAppAccountId);
  }

  public getAccountName() {
    return this.$cookies.get(crmAppAccountName);
  }

  public getIsLeader() {
    return this.$cookies.get(crmAppIsLeader);
  }

  public getIsSalesPerson() {
    return this.$cookies.get(crmAppIsSalesPerson);
  }

  public getSalesAreaId() {
    return this.$cookies.get(crmAppSalesAreaId);
  }

  public getSalesArea() {
    return this.$cookies.get(crmAppSalesArea);
  }

  // 设置cookie
  public setEntId(data) {
    this.$cookies.set(crmAppEntId, data, "1Y");
  }

  public setEntCd(data) {
    this.$cookies.set(crmAppEntCd, data, "1Y");
  }

  public setPersonId(data) {
    this.$cookies.set(crmAppPersonId, data, "1Y");
  }

  public setPersonName(data) {
    this.$cookies.set(crmAppPersonName, data, "1Y");
  }

  public setAccountId(data) {
    this.$cookies.set(crmAppAccountId, data, "1Y");
  }

  public setAccountName(data) {
    this.$cookies.set(crmAppAccountName, data, "1Y");
  }

  public setIsLeader(data) {
    this.$cookies.set(crmAppIsLeader, data, "1Y");
  }

  public setIsSalesPerson(data) {
    this.$cookies.set(crmAppIsSalesPerson, data, "1Y");
  }

  public setSalesAreaId(data) {
    this.$cookies.set(crmAppSalesAreaId, data, "1Y");
  }

  public setSalesArea(data) {
    this.$cookies.set(crmAppSalesArea, data, "1Y");
  }

  public removeAll() {
    this.$cookies.remove(crmAppEntId);
    this.$cookies.remove(crmAppEntCd);
    this.$cookies.remove(crmAppPersonId);
    this.$cookies.remove(crmAppPersonName);
    this.$cookies.remove(crmAppAccountId);
    this.$cookies.remove(crmAppAccountName);
    this.$cookies.remove(crmAppIsLeader);
    this.$cookies.remove(crmAppIsSalesPerson);
    this.$cookies.remove(crmAppSalesAreaId);
    this.$cookies.remove(crmAppSalesArea);
  }

  public static instance = new AppCookies();
}

export default AppCookies;

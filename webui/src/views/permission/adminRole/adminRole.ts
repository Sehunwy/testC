/**
 * @module views\permission\adminRole
 */
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";

@Component
export default class AdminRole extends Vue {
  [x: string]: any;
  private dialogNew = false;
  private dialogDele = false;
  private dialogModify = false;
  private ids = [];
  private keyword = "";
  private rowId;
  private adminRoleName = "";
  private adminRoleCd = "";
  private adminRoleCtrl = "";
  private adminRoleNameModify = "";
  private adminRoleCdModify = "";
  private adminRoleCtrlModify = "";
  private adminRoles = [];
  private pageSize = 7;
  private totalCount = 0;
  private currentPage = 1;
  private adminRolesDele = [];
  private isDisabled = true;

  mounted() {
    this.queryAdminRole();
  }

  @Watch("adminRoles")
  onWidChanged(newVal: string, oldVal: string) {
    if (!newVal || newVal === "") {
      console.log("高度" + this.tableWid);
    }
  }

  @Watch("keyword")
  onkeywordChanged(newVal: string, oldVal: string) {
    if (!newVal || newVal === "") {
      this.queryAdminRole();
    }
  }

  updated() {}

  private InitializeCreate() {
    this.dialogNew = false;
    this.adminRoleName = "";
    this.adminRoleCd = "";
    this.adminRoleCtrl = "";
  }

  private createAdminRoleConfirm() {
    this.$Api
      .invoke({
        moduleName: "crm.permission.adminRoleService",
        className: "AdminRoleService",
        method: "createOrUpdate",
        args: {
          newObj: {
            Name: this.adminRoleName,
            Cd: this.adminRoleCd,
            Ctrl: this.adminRoleCtrl,
            EntCd: "SNS",
            EntId: "5c110e82250cb7264c01801a"
          }
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.keyword = "";
          this.queryAdminRole();
        } else {
          this.messagePrompt("新增失败！" + res.data.error);
        }
      })
      .catch(res => {
        this.messagePrompt("新增异常！" + res);
      })
      .finally(() => {
        this.InitializeCreate();
      });
  }

  private queryAdminRole() {
    let currentSkip = (this.currentPage - 1) * this.pageSize;
    if (this.keyword != "") {
      currentSkip = 0;
    }
    this.$Api
      .invoke({
        moduleName: "crm.permission.adminRoleService",
        className: "AdminRoleService",
        method: "query",
        args: {
          entCd: "SNS",
          keyword: this.keyword,
          skip: currentSkip,
          limit: this.pageSize
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.adminRoles = res.data.data[1];
          this.totalCount = res.data.data[0];
          console.log(
            "当前页 " +
              this.currentPage +
              "  总条数" +
              this.totalCount +
              "  " +
              currentSkip
          );
        } else {
          this.messagePrompt("查询失败！" + res.data.error);
        }
      })
      .catch(res => {
        this.messagePrompt("查询异常！" + res);
      })
      .finally(() => {
      });
  }

  private deleRow(row) {
    this.dialogDele = true;
    console.log(row);
    this.rowId = row.Id;
    (this as any).ids = [this.rowId];
    console.log(this.ids);
  }

  private batchDelete() {
    this.ids = [];
    this.dialogDele = true;
    for (let i = 0; i < this.adminRolesDele.length; i++) {
      (this as any).ids.push((this as any).adminRolesDele[i].Id);
    }
  }

  private deleteAdminRole(ids) {
    this.$Api
      .invoke({
        moduleName: "crm.permission.adminRoleService",
        className: "AdminRoleService",
        method: "delete",
        args: {
          ids: ids
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.currentPage = 1;
          this.keyword = "";
          this.queryAdminRole();
          this.messagePrompt("删除成功！");
        } else {
          this.messagePrompt("删除失败！" + res.data.error);
        }
      })
      .catch(res => {
        this.messagePrompt("删除异常！" + res);
      })
      .finally(() => {
        this.dialogDele = false;
      });
  }

  private deleteAdminRoleConfirm() {
    this.deleteAdminRole(this.ids);
  }

  private modifyRow(row) {
    this.dialogModify = true;
    this.adminRoleNameModify = row.Name;
    this.adminRoleCdModify = row.Cd;
    this.adminRoleCtrlModify = row.Ctrl;
    this.rowId = row.Id;
  }

  private modifyAdminRoleConfirm() {
    this.$Api
      .invoke({
        moduleName: "crm.permission.adminRoleService",
        className: "AdminRoleService",
        method: "createOrUpdate",
        args: {
          newObj: {
            Id: this.rowId,
            Name: this.adminRoleNameModify,
            Cd: this.adminRoleCdModify,
            Ctrl: this.adminRoleCtrlModify,
            EntCd: "SNS",
            EntId: "5c110e82250cb7264c01801a"
          }
        }
      })
      .then(res => {
        if (res.data && res.data.isSuccess) {
          this.keyword = "" ;
          this.queryAdminRole();
          this.messagePrompt("修改成功！");
        } else {
          this.messagePrompt("修改失败！" + res.data.error);
        }
      })
      .catch(res => {
        this.messagePrompt("修改异常！" + res);
      })
      .finally(() => {
        this.dialogModify = false;
      });
  }

  private handleSelectionChange(select) {
    this.adminRolesDele = select;
    if (select.length === 0) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
  }

  private messagePrompt(msg, time = 1000, isCenter = true) {
    this.$message({
      message: msg,
      duration: time,
      center: isCenter
    });
  }
}

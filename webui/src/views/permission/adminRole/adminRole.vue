<template>
  <div>
    <div class="topDiv">
      <el-input
        style="width:300px;"
        placeholder="请输入查询内容"
        v-model="keyword"
        class="input-with-select"
        @keyup.enter.native="queryAdminRole"
      >
      </el-input>
      <el-button
        style="position:relative;right: 57px"
        type="primary"
        icon="el-icon-search"
        @click="queryAdminRole"
      ></el-button>
      <el-button size="small" type="primary" @click="dialogNew = true">新增</el-button>
      <el-button
        :disabled="isDisabled"
        class="dele"
        size="small"
        type="primary"
        @click="batchDelete"
      >批量删除</el-button>
    </div>

    <el-dialog title="新增权限管理" :visible.sync="dialogNew" width="30%" center>
      <el-form ref="form">
        <el-form-item label="名称" label-width="55px">
          <el-input v-model="adminRoleName"></el-input>
        </el-form-item>
        <el-form-item label="编码" label-width="55px">
          <el-input v-model="adminRoleCd"></el-input>
        </el-form-item>
        <el-form-item label="控制码" label-width="55px">
          <el-input v-model="adminRoleCtrl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="InitializeCreate">取 消</el-button>
        <el-button type="primary" @click="createAdminRoleConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-table
      class="table"
      :data="adminRoles"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="Name" label="名称" width="240"></el-table-column>
      <el-table-column prop="Cd" label="编码" width="240"></el-table-column>
      <el-table-column prop="Ctrl" label="控制码" width="240"></el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button @click="deleRow(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="modifyRow(scope.row)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="outerPagination">
      <div class="pagination">
        <el-pagination
          :total="totalCount"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          @current-change="queryAdminRole"
          layout="total, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogDele" width="30%">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDele = false">取 消</el-button>
        <el-button type="primary" @click="deleteAdminRoleConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改权限管理" :visible.sync="dialogModify" width="30%" center>
      <el-form ref="form">
        <el-form-item label="名称" label-width="55px">
          <el-input v-model="adminRoleNameModify"></el-input>
        </el-form-item>
        <el-form-item label="编码" label-width="55px">
          <el-input v-model="adminRoleCdModify"></el-input>
        </el-form-item>
        <el-form-item label="控制码" label-width="55px">
          <el-input v-model="adminRoleCtrlModify"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogModify = false">取 消</el-button>
        <el-button type="primary" @click="modifyAdminRoleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.input {
  display: inline-block;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  background-color: #fff;
}

.table {
  width: 96%;
  margin: 0px 2%;
  /* position: absolute; */
}

.topDiv {
  margin: 0px 2%;
}

.el-form-item__content {
  margin-left: 55px;
}

.outerPagination {
  /* width: 100%;
  position: relative;
  top: -55px; */
  text-align: center;
}

.pagination {
  margin: 0 auto;
  padding-top: 20px;
}

.pointer {
  cursor: pointer;
}
</style>

<script>
import AdminRole from "./adminRole.ts";
export default AdminRole;
</script>
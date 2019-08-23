<template>
  <div class="adminRolePermission">
    <el-row style="padding:0px 10px" :gutter="10">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>角色</span>
          </div>
          <div v-for="role in roles" :key="role" class="text item">{{ role }}</div>
        </el-card>
      </el-col>
      <el-col class="boxShadow" :span="18">
        <div class="header">
          <el-row :gutter="20">
            <el-col :span="3">菜单名称</el-col>
            <el-col :span="2">图标</el-col>
            <el-col :span="13">菜单地址</el-col>
            <el-col :span="4">功能项</el-col>
            <el-col :span="2">操作</el-col>
          </el-row>
        </div>
        <div>

          <el-tree :data="data5" :expand-on-click-node="false" accordion>
            <span class="custom-tree-node" slot-scope="{ node }">
              <span>
                <span>
                  <el-row :gutter="20">
                    <el-col :span="3">{{node.data.label}}</el-col>
                    <el-col :span="2">
                      <span class="icon iconfont" :class="node.data.icon"></span>
                    </el-col>
                    <el-col :span="13">{{node.data.addresMenu}}</el-col>
                    <el-col :span="4">{{node.data.functionItem}}</el-col>
                    <el-col :span="2">
                      <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                    </el-col>
                  </el-row>
                </span>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style>
/* el-tree-node__expand-icon el-icon-caret-right is-leaf
el-tree-node__expand-icon el-icon-caret-right */
.adminRolePermission .text {
  font-size: 14px;
}

.adminRolePermission .item {
  margin-bottom: 18px;
}

.adminRolePermission .clearfix:before,
.adminRolePermission .clearfix:after {
  display: table;
  content: "";
}
.adminRolePermission .clearfix:after {
  clear: both;
}

.adminRolePermission .boxShadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 0px 10px 40px 10px;
}

.adminRolePermission .header {
  padding: 10px 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.adminRolePermission .custom-tree-node {
  width: 100%;
}

.adminRolePermission .custom-tree-node .el-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.adminRolePermission .borderStyle {
  height: 35px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.adminRolePermission .el-tree {
  overflow: hidden;
}

.adminRolePermission .el-tree-node__content {
  height: 36px;
  line-height: 36px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.adminRolePermission .el-tree-node__content:hover {
  background-color: #fff;
}
.adminRolePermission .el-tree-node__expand-icon {
  font-size: 20px;
}
</style>

<script>
import AdminRolePermission from "./adminRolePermission.ts";
export default AdminRolePermission;
</script>
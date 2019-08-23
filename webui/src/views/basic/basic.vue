<template>
  <div>
    <el-container style="height: 850px; border: 1px solid #eee">
      <el-aside width="240px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1','2','3','4']" @select="onSelectedMenu">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>企业基本信息
            </template>
            <el-menu-item-group>
              <el-menu-item index="/enterpriseBasicInfo">企业基本资料</el-menu-item>
              <el-menu-item index="/organization">组织架构</el-menu-item>
              <el-menu-item index="/salesArea">销售片区</el-menu-item>
              <el-menu-item index="/person">人员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>客户基本信息
            </template>
            <el-menu-item-group>
              <el-menu-item index="/customer">客户列表</el-menu-item>
              <el-menu-item index="/relPersonCustomer">人员客户配置</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>系统管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/appAccountList">客户端账户管理</el-menu-item>
              <el-menu-item index="/dictionary">数据字典</el-menu-item>
              <!-- <el-menu-item index="3-2">后台管理角色</el-menu-item>
              <el-menu-item index="3-3">后台管理员</el-menu-item>
              <el-menu-item index="3-4">后台管理权限</el-menu-item>-->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>系统配置
            </template>
            <el-menu-item-group>
              <el-menu-item index="/enterpriseList">企业列表</el-menu-item>
              <el-menu-item index="/area">省市区</el-menu-item>
              <el-menu-item index="/dictionaryTemplate">数据字典模板</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <!-- <keep-alive> -->
            <router-view/>
          <!-- </keep-alive> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

<script>
import Basic from "./basic.ts";
export default Basic;
</script>
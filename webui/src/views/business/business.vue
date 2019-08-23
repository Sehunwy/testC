<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="240px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1','2','3','4']" @select="onSelectedMenu">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>考勤管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/business/attendanceList">打卡列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>拜访管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/business/visitList">拜访列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>事项管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/business/itemList">事项列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>日报管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/business/dailyReportList">日报列表</el-menu-item>
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
</style>

<script>
import Business from "./business.ts";
export default Business;
</script>
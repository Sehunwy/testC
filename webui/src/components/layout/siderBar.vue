<template>
    <div id="sidebar" :style="{ width: siderWidth + 'px'}" class>
      <el-menu
        router
        :default-active="active"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        :collapse="isCollapse"
        style="width:100%"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="icon iconfont icon-location iconStyle"></i>
            <span slot="title">基础数据</span>
          </template>
          <el-submenu index="1-1">
            <span slot="title">企业基本信息</span>
            <el-menu-item index="/basicData/enterpriseBasicInformation/basicInformation">企业基本资料</el-menu-item>
            <el-menu-item index="/basicData/enterpriseBasicInformation/organizationalStructure">组织架构</el-menu-item>
            <el-menu-item v-if="sales&&customer" index="1-1-3">销售片区</el-menu-item>
            <el-menu-item index="1-1-4">人员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <span slot="title">客户基本信息</span>
            <el-menu-item index="1-2-1">客户列表</el-menu-item>
            <el-menu-item index="1-2-2">人员客户配置</el-menu-item>
          </el-submenu>
          <el-submenu index="1-3">
            <span slot="title">系统管理</span>
            <el-menu-item index="1-3-1">客户端账号管理</el-menu-item>
            <el-menu-item index="1-3-2">数据字典</el-menu-item>
          </el-submenu>
          <el-submenu index="1-4">
            <span slot="title">系统配置</span>
            <el-menu-item index="1-4-1">企业列表</el-menu-item>
            <el-menu-item index="1-4-2">省市区</el-menu-item>
            <el-menu-item index="1-4-3">数据字典模板</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="icon iconfont icon-location iconStyle"></i>
            <span slot="title">业务数据</span>
          </template>
          <el-submenu index="2-1">
            <span slot="title">考勤管理</span>
            <el-menu-item index="/businessData/attendanceManagement/punchList">打卡列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <span slot="title">拜访管理</span>
            <el-menu-item index="2-2-1">拜访列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2-3">
            <span slot="title">事项管理</span>
            <el-menu-item index="2-3-1">事项列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2-4">
            <span slot="title">日报管理</span>
            <el-menu-item index="2-4-1">日报列表</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">
          <i class="icon iconfont icon-location iconStyle"></i>
          <span slot="title">统计报表</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="icon iconfont icon-location iconStyle"></i>
          <span slot="title">定位服务</span>
        </el-menu-item>
        <el-submenu index="5">
          <template slot="title">
            <i class="icon iconfont icon-location iconStyle"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item index="/permission/adminAccount">管理员账户管理</el-menu-item>
          <el-menu-item index="/permission/menuList">菜单列表</el-menu-item>
          <el-menu-item index="/permission/adminRole">管理员角色</el-menu-item>
          <el-menu-item index="/permission/adminRolePermission">管理员角色权限</el-menu-item>
        </el-submenu>
      </el-menu>
  </div>
</template>

<style scoped>
#sidebar {
  position: fixed;
  overflow-x: hidden;
  height: 100%;
  background-color: #545c64;
  z-index: 2;
}

.iconStyle {
  margin-right: 5px;
  font-size: 16px;
}

#sidebar::-webkit-scrollbar {
  width: 0px; /*滚动条宽度*/
}

#sidebar:hover::-webkit-scrollbar {
  width: 4px;
}

/*定义滚动条轨道 */
#sidebar::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #545c64;
}

/*定义滑块*/
#sidebar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}
</style>

<script>
import SiderBar from "./siderBar.ts";
export default SiderBar;
</script>
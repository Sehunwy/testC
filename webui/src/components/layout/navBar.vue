<template>
  <div class="navbar">
    <span @click="$emit('changeNav')" class="icon iconfont icon-queding"></span>
    <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
      <!-- {{item.meta.title}} -->
      <span v-if="item.redirect === 'noredirect' || index == breadcrumbs.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="right-menu">
      <div style="display:inline-block;padding-right:20px">
        <span style="font-size:32px" class="icon iconfont icon-icon28"></span>
        <span>XXXX</span>
      </div>
      <span class="icon iconfont icon-shezhi"></span>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  height: 50px;
  padding: 0px 20px;
  border-bottom: 1px solid #ccc;
  line-height: 50px;
  width: 100%;
  overflow: hidden;
  background-color: #ffffff;
  z-index: 2;
}

.right-menu {
  display: inline-block;
  position: fixed;
  right: 10px;
}

.breadcrumb {
  display: inline-block;
  padding-left: 20px;
}
</style>

<script>
import NavBar from "./navBar.ts";
export default NavBar;
</script>
<template>
  <div style="width:100%;height:100%">
    <div :style="{ width: siderWidth + 'px'}" class="sidebar-container">
      <siderBar :siderWidth="siderWidth" :isCollapse="isCollapse"></siderBar>
    </div>

    <div class="main-container" :style="{ width: mainWidth + 'px'}">
      <navBar @changeNav="onChange"></navBar>
      <div class="content">
        <router-view/>
      </div>
    </div>

    <div class="footer">
      <div style="text-align: center;">2016-{{year}} © 光华致创</div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0px;
  overflow-x: hidden;
}

.footer {
  width: 100%;
  background-color: #fff;
  z-index: 1;
  height: 30px;
  line-height: 30px;
}

.sidebar-container {
  float: left;
  /* display: inline-block; */
  position: relative;
  left: 0px;;
  height: 100%;
}

.main-container {
  position: relative; 
  display: inline-block;
  top:0px;
  min-height: 94%;
}

.content {
  margin-top: 60px;
  padding: 0px 10px 30px 0px;
  width: 100%;
}
</style>

<script>
import Main from "./main.ts";
export default Main;
</script>
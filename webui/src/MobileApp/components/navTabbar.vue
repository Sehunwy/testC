<template>
  <div>
    <van-tabbar
      id="headerTabbar"
      v-model="active"
      active-color="#4b0"
      :fixed="false"
      @change="onChange"
    >
      <van-tabbar-item>
        <span style="font-size: 12pt;" :class="{'activeBorder':active===0}">通讯录</span>
      </van-tabbar-item>
      <van-tabbar-item>
        <span style="font-size: 12pt;" :class="{'activeBorder':active===1}">消息</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">

#headerTabbar {
  background-color: transparent;
  height: 30px;
  width: 200px;
}
.van-hairline--top-bottom {
  border-width: 0px;
}
.van-hairline--top-bottom::after {
  border-width: 0px;
}
.activeBorder{
  padding: 0px 4px 2px 4px;
  border-bottom: 2px solid red;
}
</style>

<script>
import NavTabbar from "./navTabbar.ts";
export default NavTabbar;
</script>
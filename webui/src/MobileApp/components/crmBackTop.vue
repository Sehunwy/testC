<template>
  <div class="backTopButton" :style="{right:right + 'px',bottom:bottom+'px'}">
    <transition name="van-fade">
      <div v-show="showBackTop" @touchstart.stop="backTop">
        <span class="icon iconfont icon-huidaodingbu"></span>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url(../common.less);
.backTopButton {
  position: fixed;
  color: #3fcc8e;
  border-radius: 8px;
  z-index: 110;
  & div {
    padding: 5px;
  }
  & span {
    font-size: 48px;
  }
}
</style>

<script>
import CrmBackTop from "./crmBackTop.ts";
export default CrmBackTop;
</script>
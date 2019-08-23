<template>
  <div>
    <div class="headBar">
      <div class="minibar">
        <a @click="openSettingActionsheet">
          <span class="icon iconfont icon-shezhi"></span>
        </a>
        <span class="icon iconfont icon-notice" style="margin-left:10px;"></span>
      </div>
      <div class="personalbar">
        <div class="imgplaceholder">
          <img src="../../../assets/img/user.png">
        </div>
        <div class="userplaceholder">
          <p>{{personName}}</p>
        </div>
        <div class="moreInfoplaceholder">
          <span class="icon iconfont icon-gengduo"></span>
        </div>
      </div>
      <van-actionsheet
        v-model="showSettingActions"
        :actions="settingActions"
        cancel-text="取消"
        @select="onSelectSettingAction"
      />
    </div>
    <div id="contentContainer" class="content">
      <van-cell class="navLinkItem" :border="false" is-link @click="toDailyList">
        <span slot="icon" class="icon iconfont icon-todo navLinkItemIcon"/>
        <span slot="title" class="navLinkItemTitle">工作日报</span>
      </van-cell>
      <van-cell class="navLinkItem" :border="false" is-link @click="toAnalysisReport">
        <span slot="icon" class="icon iconfont icon-zhexiantu navLinkItemIcon"/>
        <span slot="title" class="navLinkItemTitle">分析报表</span>
      </van-cell>
      <crmCopyright></crmCopyright>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
@import url(./style.less);
#contentContainer {
  background-color: f9f9f9;
}
.navLinkItem {
  margin-top: 8px;
}

.navLinkItemIcon {
  color: #3fcc8e;
}
.navLinkItemTitle {
  margin-left: 10px;
  font-size: 12pt;
}
</style>

<script>
import Workbench from "./workbench.ts";
export default Workbench;
</script>
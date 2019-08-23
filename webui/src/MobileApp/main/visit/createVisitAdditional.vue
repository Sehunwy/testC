<template>
  <div>
    <van-nav-bar
      class="headBar fixedHeader"
      @click-left="goBack"
      @click-right="createVisitAdditional"
    >
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">拜访内容补充</span>
      <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <crmLoading v-show="isBusy"></crmLoading>
      <div class="visitAdditionalTitle">补充内容</div>
      <van-cell-group>
        <van-field
          v-model="visitContentAdditional"
          type="textarea"
          :autosize=" { maxHeight: 360, minHeight: 180 }"
          placeholder="请输入补充内容"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  background-color: #f9f9f9;
  padding: 0px 5px;
}
.visitAdditionalTitle {
  font-size: 14px;
  padding: 5px 0px;
}
</style>

<script>
import CreateVisitAdditional from "./createVisitAdditional.ts";
export default CreateVisitAdditional;
</script>
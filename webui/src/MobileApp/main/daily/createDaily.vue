<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack" @click-right="createDailyReport">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">新建工作日报</span>
      <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <crmLoading v-show="isBusy"></crmLoading>
      <div class="createDailyTitle">工作日报内容</div>
      <van-cell-group>
        <van-field
          v-model="dailyContent"
          type="textarea"
          :autosize=" { maxHeight: 360, minHeight: 180 }"
          placeholder="请输入您的工作日报"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
@import url(../../common.less);
#contentContainer {
  background-color: #f9f9f9;
  padding: 0px 5px;
}
.createDailyTitle {
  font-size: 14px;
  padding: 5px 0px;
}
</style>

<script>
import CreateDaily from "./createDaily.ts";
export default CreateDaily;
</script>
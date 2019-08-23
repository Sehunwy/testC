<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">日报详情</span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <crmLoading v-show="isBusy"></crmLoading>
      <div class="dailyDetailsContainer van-hairline--surround">
        <span>{{dailyDetails.Content}}</span>
      </div>
      <div class="footerContainer flexRowLayout">
        <div>
          <span>{{dailyDetails.PersonName}}</span>
        </div>
        <div>
          <span>{{dailyDetails.CreateTime|formatDateTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  background-color: #f9f9f9;
  padding: 5px;
}

.dailyDetailsContainer {
  color: black;
  background-color: #ffffff;
  min-height: 180px;
  max-height: 360px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px 15px;
  & span {
    white-space: pre-wrap;
    font-size: 14px;
    line-height: 24px;
    word-wrap: break-word;
  }
}

.footerContainer {
  padding: 5px;
  & span {
    color: #959595;
    font-size: 12px;
  }
}
</style>

<script>
import DailyDetails from "./dailyDetails.ts";
export default DailyDetails;
</script>
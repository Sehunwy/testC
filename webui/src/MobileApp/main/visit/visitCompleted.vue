<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">拜访完成</span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <div class="mainInfoContainer">
        <div class="contentTitle van-ellipsis">
          <span>{{customerName}}</span>
        </div>
        <div class="iconPosition">
          <div class="icon iconfont icon-yiwancheng yiwancheng"></div>
        </div>
      </div>
      <div class="bodyContainer">
        <div class="moreOperationContainer">
          <div class="tips van-hairline--bottom">下面还有更多操作呢！</div>
          <div class="otherOperationContaner">
            <div @click="goCustomerDetails">
              <div class="icon iconfont icon-client operationButton"></div>
              <div class="operationTitle">客户详情</div>
            </div>
            <div @click="goCreateItem">
              <div class="icon iconfont icon-todo operationButton"></div>
              <div class="operationTitle">创建事项</div>
            </div>
            <div @click="goShare">
              <div class="icon iconfont icon-icon_fabu operationButton"></div>
              <div class="operationTitle">分享</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  background-color: #f9f9f9;
}
.mainInfoContainer {
  height: 150px;
  font-size: 20px;
  background-color: #3fcc8e;
}
.bodyContainer{
  text-align: center;
}
.moreOperationContainer {
  display: inline-block;
  background-color: #fff;
  height: 180px;
  width: 80%;
  border: 1px solid #fff;
  border-radius: 20px;
  margin-top: -20px;
}
.otherOperationContaner {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
}
.yiwancheng {
  font-size: 80px;
  color: #fff;
}
.contentTitle {
  padding: 40px 30px 20px 30px;
  color: #fff;
}
.iconPosition {
  height: 90px;
  width: 90px;
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 1;
}
.tips {
  padding: 2px 0px 2px 15px;
  text-align: left;
  height: 30px;
  line-height: 30px;
  color: #757575;
  font-size: 14px;
}
.operationButton {
  text-align: left;
  background-color: #3fcc8e;
  color: #fff;
  height: 40px;
  width: 40px;
  border-radius: 28px;
  border: 1px solid #3fcc8e;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 30px;
}
.operationTitle {
  font-size: 14px;
  color: #969799;
  margin-top: 4px;
  text-align: center;
}
</style>

<script>
import VisitCompleted from "./visitCompleted.ts";
export default VisitCompleted;
</script>
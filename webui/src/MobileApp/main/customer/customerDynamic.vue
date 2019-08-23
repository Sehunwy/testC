<template>
  <div>
    <div @click="openFilterOptionPopup" class="filterContainer">
      <span>{{filterOptionText}}</span>
      <span class="icon iconfont icon-xiangxia"></span>
    </div>
    <van-pull-refresh v-model="isLoadingRefresh" @refresh="loadDataList">
      <van-list
        v-model="isLoadingNext"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="loadNextDatas"
        class="crmVanList"
      >
        <div
          style="display:flex;align-items:center;border-bottom:1px solid white;"
          v-for="(item,index) in dataList"
          :key="index"
          @click="goDynamicDetails(item)"
        >
          <van-col span="3" style="align-self:flex-start;">
            <img class="headPortrait" src="../../../assets/img/headPortrait.png">
          </van-col>
          <van-col span="18">
            <div style="padding:5px 10px;">
              <div class="dynamicHeader">
                <span>{{item.CreaterName}} > {{item.DynamicType|formatDynamicType}}</span>
                <van-tag
                  round
                  v-show="item.DynamicType===itemDynamicType"
                  :color="item.State|formatItemStateColor"
                  class="dynamicState"
                >{{item.State|formatItemState}}</van-tag>
                <van-tag
                  round
                  v-show="item.DynamicType===visitDynamicType"
                  :color="item.IsVisiting?'#3fcc8e':'#b2b2b2'"
                  class="dynamicState"
                >{{item.IsVisiting|formatVisitState}}</van-tag>
              </div>
              <div class="dynamicContent">
                <span v-show="item.DynamicType===itemDynamicType">{{item.Name}}</span>
                <span v-show="item.DynamicType===visitDynamicType">{{item.Content}}</span>
              </div>
              <div class="createTime">
                <div offset="4" span="6" class="subBottomText">{{item.CreateTime|formatDateTime}}</div>
              </div>
            </div>
          </van-col>
        </div>
      </van-list>
    </van-pull-refresh>

    <van-popup v-model="showFilterOptionPopup" position="bottom">
      <van-picker
        :columns="filterOptionList"
        show-toolbar
        title="请选择筛选条件"
        @cancel="onPickPopupCancel"
        @confirm="onPickPopupConfirm"
        ref="filterOptionPicker"
      ></van-picker>
    </van-popup>
  </div>
</template>

<style>
.van-picker__cancel {
  color: #3fcc8e !important;
}
.van-picker__confirm {
  color: #3fcc8e !important;
}
</style>

<style scoped lang="less">
@import url(../../common.less);
.filterContainer {
  margin: 5px auto;
  line-height: 30px;
  background-color: white;
  text-align: center;
  width: 88%;
  height: 30px;
  border-radius: 8px;
  color: #646464;
  font-size: 14px;
}
.headPortrait {
  width: 45px;
  padding-left: 5px;
  border-radius: 50%;
}
.dynamicHeader {
  font-size: 14px;
  font-weight: 500;
  color: black;
  padding: 5px 0px;
}
.dynamicContent {
  background-color: #fff;
  line-height: 22px;
  border: 1px solid #fff;
  box-shadow: 1px 1px 2px #aaaaaa;
  border-radius: 8px;
  color: #646464;
  font-size: 14px;
  padding: 10px;
  min-height: 22px;
}
.createTime {
  padding: 5px 0px;
  font-size: 12px;
  color: #959595;
}
.dynamicState{
  margin-left: 10px;
}
</style>

<script>
import CustomerDynamic from "./customerDynamic.ts";
export default CustomerDynamic;
</script>
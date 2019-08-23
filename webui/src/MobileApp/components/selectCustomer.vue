<template>
  <div>
    <div class="fixedHeader">
      <van-nav-bar class="headBar" @click-left="goBack" @click-right="confirmComplete">
        <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
        <span slot="title" class="headBarTitle">{{title}}</span>
        <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
      </van-nav-bar>
      <van-search
        class="vansearchClass"
        placeholder="请输入搜索关键词"
        v-model="keyword"
        show-action
        @search="onQueryCustomerDatas"
        autofocus
      >
        <div slot="action" @click="onQueryCustomerDatas">查找</div>
      </van-search>
    </div>
    <div id="contentContainer" class="content">
      <van-list
        v-model="isLoading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="loadNextCustomerDatas"
      >
        <van-radio-group v-model="currentCustomer">
          <div
            v-for="(item,index) in customerList"
            :key="index"
            @click="currentCustomer = item"
            class="customerItemContainer van-hairline--bottom"
          >
            <van-row type="flex" align="center">
              <van-col span="18">
                <div class="subNameText van-ellipsis">{{item.Name}}</div>
                <div class="subAddressText flexRowLayout" style="justify-content: flex-start">
                  <span class="icon iconfont icon-location" style="font-size:12px;"></span>
                  <div class="van-ellipsis" style="margin-left:2px">{{item.LocationDesc}}</div>
                </div>
              </van-col>
              <van-col span="6">
                <div class="flexRowLayout" style="justify-content:flex-end;align-items:center;">
                  <van-tag
                    color="#44bb00"
                    style="margin-right:10px;"
                    v-show="currentSortType===sortByDistance"
                  >{{item.Distance|formatDistance}}</van-tag>
                  <van-radio :name="item" checked-color="#3fcc8e"/>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-radio-group>
      </van-list>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("../common.less");
#contentContainer {
  padding: 0px 0px 10px 0px;
  background-color: #f9f9f9;
  top: 84px;
}
.customerItemContainer {
  padding: 10px 15px;
  background-color: #fff;
  .subNameText {
    font-size: 14px;
  }
  .subAddressText {
    color: #959595;
    font-size: 12px;
    margin: 4px 0px;
  }
}
</style>

<script>
import SelectCustomer from "./selectCustomer.ts";
export default SelectCustomer;
</script>
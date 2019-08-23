<template>
  <div>
    <div class="fixedHeader">
      <van-nav-bar class="headBar" @click-right="goCreateCustomer">
        <span slot="title" class="headBarTitle">客户</span>
        <span slot="right" class="icon iconfont icon-xinzeng2 headBarIcon"></span>
      </van-nav-bar>
      <customerDropDown
        :enableFilterDropdown="false"
        @onSelectSortOption="sortOptionChanged"
        @onSearch="openSearchCustomerPopup"
      ></customerDropDown>
    </div>
    <div id="contentContainer" class="content contentBottom" ref="contentContainer">
      <div id="totalCountContainer" class="van-hairline--bottom">
        <span>共有{{customerCount}}家客户</span>
      </div>
      <van-pull-refresh v-model="isLoadingRefresh" @refresh="reloadCustomerDatas">
        <van-list
          v-model="isLoadingNext"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="loadNextCustomerDatas"
          class="crmVanList"
        >
          <div
            class="itemContainer"
            v-for="(item,index) in customerList"
            :key="index"
            @click="goCustomerDetails(item.Id)"
          >
            <van-row type="flex" align="center">
              <van-col span="1" style="color:red;align-self:flex-start;">
                <span style="color:#3fcc8e;font-size:12px;">◤</span>
              </van-col>
              <van-col span="17">
                <div style="padding:5px 0px;">
                  <div class="subNameText van-ellipsis">{{item.Name}}</div>
                  <div class="subAddressText flexRowLayout" style="justify-content: flex-start">
                    <span class="icon iconfont icon-location" style="font-size:12px;"></span>
                    <div class="van-ellipsis" style="margin-left:2px">{{item.Address}}</div>
                  </div>
                  <div class="subListText flexRowLayout">
                    <div>
                      <span style="color:#3fcc8e">{{item.LastVisitTime|formatVisitDays}}</span>
                    </div>
                    <div>
                      <span>{{item.Level|formatCustomerLevel}}</span>
                    </div>
                    <div>
                      <span>{{item.CreateTime|formatDateTime}}</span>
                    </div>
                  </div>
                </div>
              </van-col>
              <van-col span="6">
                <div
                  class="flexColumnLayout"
                  style="height:100%;justify-content:space-around;align-items:flex-end;padding-right:10px;"
                >
                  <div style="height:16px;">
                    <van-tag round color="#3fcc8e" v-show="false">拜访中</van-tag>
                  </div>
                  <div class="flexRowLayout" style="height:24px;line-height:24px;">
                    <van-tag
                      plain
                      color="#f2826a"
                      v-show="showDistanceLabel"
                    >{{item.Distance|formatDistance}}</van-tag>
                    <span class="icon iconfont icon-gengduo" style="color:#d7d7d7;font-size:16pt;"></span>
                  </div>
                  <div style="height:16px;"></div>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-list>
      </van-pull-refresh>
      <crmBackTop containerId="contentContainer"></crmBackTop>
    </div>
    <van-popup
      v-model="showSearchCustomer"
      :overlay="false"
      :close-on-click-overlay="false"
      position="right"
      style="height:100%;width:100%;margin-top:0px"
    >
      <searchCustomer @onCancelSearch="cancelSearchCustomer" @searchComplete="onSearchComplete"></searchCustomer>
    </van-popup>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  top: 87px;
  background-color: #f9f9f9;
}
#totalCountContainer {
  height: 20px;
  line-height: 20px;
  color: #595959;
  font-size: 8pt;
  padding-left: 5px;
}
.itemContainer {
  color: black;
  background-color: #ffffff;
  margin-bottom: 5px;
  height: 68px;
  .subNameText {
    font-size: 14px;
  }
  .subAddressText {
    color: #959595;
    font-size: 12px;
    margin: 4px 0px;
  }
  .subListText {
    color: #959595;
    font-size: 10px;
  }
}
</style>

<script>
import Customer from "./customer.ts";
export default Customer;
</script>
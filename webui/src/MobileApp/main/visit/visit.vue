<template>
  <div>
    <div class="fixedHeader">
      <van-nav-bar class="headBar" @click-right="goVisitSelectCustomer">
        <span slot="title" class="headBarTitle">拜访</span>
        <span slot="right" class="icon iconfont icon-xinzeng2 headBarIcon"></span>
      </van-nav-bar>
    </div>
    <div id="contentContainer" class="content contentTop contentBottom">
      <van-tabs v-model="activeTab" @change="tabChange" :line-width="80" color="#3fcc8e" swipeable>
        <van-tab title="下属拜访" v-if="isLeader">
          <div
            class="vanTabContentContainer"
            :style="{ height: tabContentHeight + 'px' }"
            id="subContentContainer"
          >
            <van-search
              class="vansearchClass"
              v-model="keywordSubordinate"
              placeholder="请输入搜索关键词"
              @search="loadSubordinateVisitDatas"
            />
            <van-pull-refresh
              v-model="isLoadingSubordinateRefresh"
              @refresh="loadSubordinateVisitDatas"
            >
              <van-list
                v-model="isLoadingSubordinateNext"
                :finished="finishedSubordinate"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="loadNextSubordinateVisitDatas"
                class="crmVanList"
              >
                <div
                  class="itemContainer"
                  v-for="(item, index) in subordinateVisitList"
                  :key="index"
                  @click="goSubordinateVisitDetails(item)"
                >
                  <van-row style="height: 26px;" type="flex" align="center">
                    <van-col
                      offset="1"
                      span="19"
                      class="van-ellipsis subNameText"
                    >{{item.CustomerName}}</van-col>
                    <van-col span="4">
                      <van-tag
                        round
                        :color="item.IsVisiting?'#3fcc8e':'#b2b2b2'"
                      >{{item.IsVisiting|formatVisitState}}</van-tag>
                    </van-col>
                  </van-row>
                  <van-row style="height:16px" type="flex" align="center">
                    <van-col offset="1" span="1">
                      <span class="icon iconfont icon-location little_icon"></span>
                    </van-col>
                    <van-col
                      span="20"
                      class="van-ellipsis subAddressText"
                    >{{item.BeginLocationDesc}}</van-col>
                    <van-col span="2">
                      <span class="icon iconfont icon-gengduo little_icon icon_more"></span>
                    </van-col>
                  </van-row>
                  <van-row type="flex" align="center">
                    <van-col offset="1" span="1">
                      <span class="icon iconfont icon-wode little_icon"></span>
                    </van-col>
                    <van-col
                      span="8"
                      class="van-ellipsis subAddressText"
                    >{{item.SalesArea?item.SalesArea:'--'}} > {{item.CreaterName}}</van-col>
                    <van-col span="1">
                      <span
                        class="icon iconfont little_icon"
                        :class="item.IsVisiting?'icon-tubiao_kaishishijian':'icon-tubiao_jieshushijian'"
                      ></span>
                    </van-col>
                    <van-col
                      span="7"
                      class="van-ellipsis subAddressText"
                    >{{item.CreateTime|formatVisitTime(item.FinishTime)}}</van-col>
                    <van-col span="6">
                      <van-tag
                        plain
                        :color="item.CreateTime|formatVisitDate|formatVisitDateColor"
                      >{{item.CreateTime|formatVisitDate}}</van-tag>
                    </van-col>
                  </van-row>
                </div>
              </van-list>
            </van-pull-refresh>
            <crmBackTop containerId="subContentContainer"></crmBackTop>
          </div>
        </van-tab>
        <van-tab title="我的拜访">
          <div
            class="vanTabContentContainer"
            :style="{ height: tabContentHeight + 'px' }"
            id="selfContentContainer"
          >
            <van-search
              class="vansearchClass"
              v-model="keywordSelf"
              placeholder="请输入搜索关键词"
              @search="loadSelfVisitDatas"
            />
            <van-pull-refresh v-model="isLoadingSelfRefresh" @refresh="loadSelfVisitDatas">
              <van-list
                v-model="isLoadingSelfNext"
                :finished="finishedSelf"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="loadNextSelfVisitDatas"
                class="crmVanList"
              >
                <div
                  class="itemContainer"
                  v-for="(item, index) in selfVisitList"
                  :key="index"
                  @click="goSelfVisitDetails(item)"
                >
                  <van-row style="height:26px" type="flex" align="center">
                    <van-col
                      offset="1"
                      span="19"
                      class="van-ellipsis subNameText"
                    >{{item.CustomerName}}</van-col>
                    <van-col span="4">
                      <van-tag
                        round
                        :color="item.IsVisiting?'#3fcc8e':'#b2b2b2'"
                      >{{item.IsVisiting|formatVisitState}}</van-tag>
                    </van-col>
                  </van-row>
                  <van-row style="height:16px" type="flex" align="center">
                    <van-col offset="1" span="1">
                      <span class="icon iconfont icon-location little_icon"></span>
                    </van-col>
                    <van-col
                      span="20"
                      class="van-ellipsis subAddressText"
                    >{{item.BeginLocationDesc}}</van-col>
                    <van-col span="2">
                      <span class="icon iconfont icon-gengduo little_icon icon_more"></span>
                    </van-col>
                  </van-row>
                  <van-row type="flex" align="center">
                    <van-col offset="1" span="1">
                      <span
                        class="icon iconfont little_icon"
                        :class="item.IsVisiting?'icon-tubiao_kaishishijian':'icon-tubiao_jieshushijian'"
                      ></span>
                    </van-col>
                    <van-col
                      span="16"
                      class="van-ellipsis subAddressText"
                    >{{item.CreateTime|formatVisitTime(item.FinishTime)}}</van-col>
                    <van-col span="6">
                      <van-tag
                        plain
                        :color="item.CreateTime|formatVisitDate|formatVisitDateColor"
                      >{{item.CreateTime|formatVisitDate}}</van-tag>
                    </van-col>
                  </van-row>
                </div>
              </van-list>
            </van-pull-refresh>
            <crmBackTop containerId="selfContentContainer"></crmBackTop>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);

#contentContainer {
  background-color: #f9f9f9;
}

.itemContainer {
  color: black;
  background-color: #ffffff;
  margin-bottom: 5px;
}

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

.little_icon {
  color: #959595;
  line-height: 24px;
  font-size: 12px;
}

.icon_more {
  font-size: 16pt;
  color: #d7d7d7;
}
</style>

<script>
import Visit from "./visit.ts";
export default Visit;
</script>

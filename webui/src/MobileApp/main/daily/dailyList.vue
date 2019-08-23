<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack" @click-right="goCreateDaily">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">日报列表</span>
      <span slot="right" class="icon iconfont icon-xinzeng2 headBarIcon"></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <van-tabs v-model="activeTab" :line-width="80" color="#3fcc8e" swipeable @change="tabChange">
        <van-tab title="下属日报" v-if="isLeader">
          <div
            class="vanTabContentContainer"
            :style="{ height: tabContentHeight + 'px' }"
            id="subContentContainer"
          >
            <van-search
              class="vansearchClass"
              v-model="keywordSubordinate"
              placeholder="请输入搜索关键词"
              @search="loadSubordinateDailyDatas"
            />
            <van-pull-refresh
              v-model="isLoadingSubordinateRefresh"
              @refresh="loadSubordinateDailyDatas"
            >
              <van-list
                v-model="isLoadingSubordinateNext"
                :finished="finishedSubordinate"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="loadNextSubordinateDailyDatas"
                class="crmVanList"
              >
                <div
                  class="itemContainer"
                  v-for="(item,index) in subordinateDailyList"
                  :key="index"
                  @click="goDaliyDetails(item.Id)"
                >
                  <van-row type="flex" align="center" justify="space-between">
                    <van-col span="20">
                      <div style="padding:10px 5px;">
                        <div class="subNameText van-ellipsis">{{item.Content}}</div>
                        <div class="subListText flexRowLayout">
                          <div>
                            <span>{{item.PersonName}}</span>
                          </div>
                          <div>
                            <span>{{item.CreateTime|formatDateTime}}</span>
                          </div>
                        </div>
                      </div>
                    </van-col>
                    <van-col span="4">
                      <div class="moreDetails">
                        <span class="icon iconfont icon-gengduo"></span>
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </van-list>
            </van-pull-refresh>
            <crmBackTop containerId="subContentContainer"></crmBackTop>
          </div>
        </van-tab>
        <van-tab title="我的日报">
          <div
            class="vanTabContentContainer"
            :style="{ height: tabContentHeight + 'px' }"
            id="selfContentContainer"
          >
            <van-search
              class="vansearchClass"
              placeholder="请输入搜索关键词"
              v-model="keywordSelf"
              @search="loadSelfDailyDatas"
            />
            <van-pull-refresh v-model="isLoadingSelfRefresh" @refresh="loadSelfDailyDatas">
              <van-list
                v-model="isLoadingSelfNext"
                :finished="finishedSelf"
                :immediate-check="false"
                finished-text="没有更多了"
                @load="loadNextSelfDailyDatas"
                class="crmVanList"
              >
                <div
                  class="itemContainer"
                  v-for="(item,index) in selfDailyList"
                  :key="index"
                  @click="goDaliyDetails(item.Id)"
                >
                  <van-row type="flex" align="center" justify="space-between">
                    <van-col span="20">
                      <div style="padding:10px 5px;">
                        <div class="subNameText van-ellipsis">{{item.Content}}</div>
                        <div class="subListText flexRowLayout">
                          <div>
                            <span>{{item.PersonName}}</span>
                          </div>
                          <div>
                            <span>{{item.CreateTime|formatDateTime}}</span>
                          </div>
                        </div>
                      </div>
                    </van-col>
                    <van-col span="4">
                      <div class="moreDetails">
                        <span class="icon iconfont icon-gengduo"></span>
                      </div>
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
  margin-top: 5px;
  padding-left: 10px;
  .subNameText {
    font-size: 14px;
  }
  .subListText {
    color: #959595;
    font-size: 12px;
    padding-top: 10px;
  }
}
.moreDetails {
  padding-right: 10px;
  text-align: right;
  & span {
    color: #d7d7d7;
    font-size: 16pt;
  }
}
</style>

<script>
import DailyList from "./dailyList.ts";
export default DailyList;
</script>
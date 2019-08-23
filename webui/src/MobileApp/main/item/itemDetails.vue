<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">事项详情</span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop contentBottom">
      <crmLoading v-show="isBusy" style="padding:5px 0px;"></crmLoading>
      <div id="topInfo" class="van-hairline--bottom">
        <div>
          <van-tag
            round
            size="medium"
            :color="itemDetails.State|formatItemStateColor"
          >{{itemDetails.State|formatItemState}}</van-tag>
        </div>
        <div>{{itemDetails.CreateTime|formatDateTime}}</div>
        <div @click="confirmFinishItem">
          <span
            class="iconfont icon-jieshu finishIcon"
            :class="itemDetails.State===itemFinishState?'disableTabbarItem':'blackIcon'"
          ></span>
        </div>
      </div>
      <div id="itemInfoContainer">
        <div class="flexRowLayout itemInfoRow">
          <div class="itemInfoTitle">客户：</div>
          <div class="itemInfoContent">{{itemDetails.CustomerName}}</div>
        </div>
        <div class="flexRowLayout itemInfoRow">
          <div class="itemInfoTitle">事项：</div>
          <div class="itemInfoContent">{{itemDetails.Name}}</div>
        </div>
        <div class="flexRowLayout itemInfoRow">
          <div class="itemInfoTitle">概述：</div>
          <div class="itemInfoContent">{{itemDetails.Description}}</div>
        </div>
        <div class="flexRowLayout itemInfoRow">
          <div class="itemInfoTitle">分析：</div>
          <div class="itemInfoContent">{{itemDetails.Analyze}}</div>
        </div>
        <div class="flexRowLayout itemInfoRow">
          <div class="itemInfoTitle">下一计划：</div>
          <div class="itemInfoContent">
            <span>{{itemDetails.NextPlan}}</span>
          </div>
        </div>
        <div class="flexRowLayout itemInfoRow">
          <div class="itemInfoTitle">备注：</div>
          <div class="itemInfoContent">{{itemDetails.Remark}}</div>
        </div>
        <div class="flexRowLayout itemInfoRow">
          <div class="itemInfoTitle">创建：</div>
          <div class="itemInfoContent" style="color:#3fcc8e;">{{itemDetails.CreaterName}}</div>
          <span
            class="icon iconfont icon-dianhua dialPhoneIcon"
            @click.stop="dialPhoneNumber(itemDetails.CreaterPhone)"
          ></span>
        </div>
      </div>
      <div class="itemFlowContainer" v-for="(itemFlow,index) in itemDetails.ItemFlows" :key="index">
        <van-row class="itemFlowDate">{{itemFlow.CreateTime|formatDateTime}}</van-row>
        <div style="background-color:white;">
          <div class="van-hairline--bottom flexRowLayout itemFlowHeader">
            <div class="executorsContainer van-ellipsis">执行人:{{itemFlow.Executors|formatExecutors}}</div>
            <div @click="confirmDeleteItemFlow(itemFlow)">
              <span
                class="iconfont icon-delete deleteIcon"
                :class="itemFlow.CreaterId != currentPersonId||itemDetails.State==itemFinishState?'disableTabbarItem':'blackIcon'"
              ></span>
            </div>
          </div>
          <div class="itemFlowContent">
            <div class="flexRowLayout detail">
              <div class="detailTitle">描述：</div>
              <div class="detailContent">{{itemFlow.Content}}</div>
            </div>
            <div class="flexRowLayout detail">
              <div class="detailTitle">分析：</div>
              <div class="detailContent">{{itemFlow.Analyze}}</div>
            </div>
            <div class="flexRowLayout detail">
              <div class="detailTitle">下一计划：</div>
              <div class="detailContent">{{itemFlow.NextPlan}}</div>
            </div>
          </div>
          <div class="van-hairline--top flexRowLayout itemFlowHeader">
            <div class="executorsContainer">创建:{{itemFlow.CreaterName}}</div>
            <div>
              <span class="iconfont icon-changyonghuifu deleteIcon" @click="replyItemFlow"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-tabbar :zIndex="101">
      <van-tabbar-item
        :class="itemDetails.State==itemFinishState?'disableTabbarItem':'bottomTabbarItem'"
        @click="goCreateItemFlow"
      >
        <span slot="icon" class="icon iconfont icon-xinzeng2"></span>
        <span>新增流程</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  background-color: #f9f9f9;
  padding-bottom: 10px;
}
#topInfo {
  height: 35px;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0px 10px;
  .finishIcon {
    font-size: 20px;
  }
}
#itemInfoContainer {
  background-color: white;
  padding: 15px 0px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  .itemInfoRow {
    justify-content: flex-start;
    align-items: flex-start;
    padding-right: 10px;
    .itemInfoTitle {
      text-align: right;
      min-width: 80px;
      color: black;
    }
    .itemInfoContent {
      text-align: left;
      color: #646464;
      word-break: break-all;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}

.dialPhoneIcon {
  margin-left:5px;
  font-size:14px;
  color:#3fcc8e;
}

.itemFlowContainer {
  .itemFlowDate {
    padding: 4px 0px;
    width: 100%;
    font-size: 12px;
    text-align: center;
  }
}

.itemFlowHeader {
  padding: 5px 10px;
  .executorsContainer {
    font-size: 14px;
  }
  .deleteIcon {
    font-size: 18px;
  }
}

.itemFlowContent {
  padding: 8px 0px;
  .detail {
    justify-content: flex-start;
    align-items: flex-start;
    padding-right: 10px;
    padding-bottom: 4px;
    font-size: 14px;
    .detailTitle {
      min-width: 80px;
      text-align: right;
    }
    .detailContent {
      color: #646464;
      word-break: break-all;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}
.blackIcon {
  color: black;
}
.disableTabbarItem {
  color: #c8c9cc;
}
.bottomTabbarItem {
  color: #3fcc8e;
}
</style>

<script>
import ItemDetails from "./itemDetails.ts";
export default ItemDetails;
</script>
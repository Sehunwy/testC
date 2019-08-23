<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">拜访详情</span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop contentBottom">
      <crmLoading v-show="isBusy"></crmLoading>
      <div class="flexRowLayout headerContentContainer">
        <div class="headPortraitContainer">
          <img src="../../../assets/img/headPortrait.png">
        </div>
        <div class="flexColumnLayout headerInfo">
          <div>{{visitDetails.SalesArea}} > {{visitDetails.CreaterName}}</div>
          <div>
            <span>拜访 | {{visitDetails.CustomerName}}</span>
          </div>
          <div class="lightText">
            <span>{{visitDetails.CreateTime|formatDateTime('yyyy-MM-dd hh:mm:ss')}}</span>
          </div>
        </div>
        <div>
          <span
            class="icon iconfont visitStateIcon"
            :class="visitDetails.IsVisiting?['icon-jinhangzhong','visitingStateColor']:['icon-yiwancheng','finishStateColor']"
          ></span>
        </div>
      </div>
      <div class="locationContainer">
        <van-steps direction="vertical" :active="4">
          <van-step>
            <div class="flexRowLayout locationItem">
              <div class="flexColumnLayout locationInfo">
                <div>开始拜访</div>
                <div>
                  <span class="icon iconfont icon-location lightText"></span>
                  <span class="lightText">{{visitDetails.BeginLocationDesc}}</span>
                </div>
              </div>
              <div>{{visitDetails.CreateTime|formatDateTime('MM-dd hh:mm')}}</div>
            </div>
          </van-step>
          <van-step>
            <div
              class="visitDurationTime"
            >停留{{visitDetails.CreateTime|formatVisitDuration(visitDetails.FinishTime)}}</div>
          </van-step>
          <van-step>
            <div class="flexRowLayout locationItem">
              <div class="flexColumnLayout locationInfo">
                <div>结束拜访</div>
                <div>
                  <span class="icon iconfont icon-location lightText"></span>
                  <span class="lightText">{{visitDetails.FinishLocationDesc}}</span>
                </div>
              </div>
              <div>{{visitDetails.FinishTime|formatDateTime('MM-dd hh:mm')}}</div>
            </div>
          </van-step>
        </van-steps>
      </div>
      <div class="visitContentContainer" v-show="!visitDetails.IsVisiting">
        <crmLabel title="客户名称" :content="visitDetails.CustomerName"></crmLabel>
        <crmLabel title="拜访人员" :content="visitDetails.VisitPerson"></crmLabel>
        <crmLabel title="职务" :content="visitDetails.VisitPersonPost"></crmLabel>
        <crmLabel title="联系方式" :content="visitDetails.VisitPersonPhone"></crmLabel>
        <crmLabel title="同行人员" :content="visitDetails.PeerPerson"></crmLabel>
        <crmLabel title="拜访内容" :content="visitDetails.Content" style="min-height:180px"></crmLabel>
      </div>
      <crmPhoto
        style="margin-top:10px;"
        v-show="!visitDetails.IsVisiting"
        v-model="visitDetails.PictureIds"
        imageCategory="Visit"
        headerTitle="拜访照片"
        :readOnly="true"
        :businessId="visitDetails.Id"
        :customerName="visitDetails.CustomerName"
      ></crmPhoto>
      <div
        class="visitContentAddContainer"
        v-show="visitDetails&&visitDetails.VisitAdditionals&&visitDetails.VisitAdditionals.length>0"
      >
        <div class="visitContentAddTitle van-hairline--bottom">
          <div class="createHeader flexRowLayout van-hairline--bottom">
            <div class="flexRowLayout" style="justify-content: flex-start;">
              <img src="../../../assets/img/separate.png">
              <span class="headerText">拜访内容补充</span>
            </div>
          </div>
        </div>
        <div
          class="visitAddContent"
          v-for="(item,index) in visitDetails.VisitAdditionals"
          :key="index"
        >
          <crmLabel
            :title="item.CreateTime | formatDateTime('yyyy-MM-dd hh:mm:ss')"
            :content="item.Content"
          ></crmLabel>
        </div>
      </div>
    </div>
    <van-tabbar :zIndex="101">
      <van-tabbar-item
        class="bottomTabbarItem"
        @click="goCreateVisitAdditional(visitDetails.Id)"
        v-show="currentPersonId===visitDetails.CreaterId && !visitDetails.IsVisiting"
      >
        <span slot="icon" class="icon iconfont icon-xinzeng2"></span>
        <span>拜访内容补充</span>
      </van-tabbar-item>
      <van-tabbar-item class="bottomTabbarItem" @click="goCustomerDetails(visitDetails.CustomerId)">
        <span slot="icon" class="icon iconfont icon-client"></span>
        <span>客户详情</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  background-color: #f9f9f9;
  padding: 10px 0px;
}
.van-step--vertical {
  padding: 0px;
}

.headerContentContainer {
  padding: 5px 0px;
  background-color: #fff;
  font-size: 14px;
  line-height: 20px;
  justify-content: flex-start;
  .headerInfo {
    align-items: flex-start;
    width: 70%;
  }
}

.headPortraitContainer {
  padding: 0px 5px;
  & img {
    width: 48px;
  }
}

.visitContentContainer {
  margin-top: 10px;
}

.locationContainer {
  margin-top: 10px;
  background-color: #fff;
}

.locationItem {
  padding: 10px 10px 10px 5px;
  .locationInfo {
    justify-content: center;
    align-items: flex-start;
  }
}

.visitDurationTime {
  padding: 10px 0px 10px 5px;
  font-size: 14px;
  color: black;
}

.lightText {
  font-size: 12px;
  color: #969799;
}

.visitStateIcon {
  font-size: 48px;
  margin-top: 20px;
  margin-right: 12px;
}

.visitingStateColor {
  color: #3fcc8e;
}

.finishStateColor {
  color: #b2b2b2;
}

.bottomTabbarItem {
  color: #3fcc8e;
}
.visitAddContent {
  margin: 4px 4px;
}
.visitContentAddContainer {
  margin: 8px 0px;
  .createHeader {
    height: 40px;
    background-color: #fff;
    & img {
      height: 24px;
      width: 20px;
    }
    .headerText {
      font-size: 11pt;
      font-weight: 600;
    }
    .headerCreateBtn {
      padding: 5px 15px;
      & span {
        color: #3fcc8e;
        font-size: 14pt;
        font-weight: 600;
      }
    }
  }
}
</style>
 
<script>
import VisitDetails from "./visitDetails.ts";
export default VisitDetails;
</script>
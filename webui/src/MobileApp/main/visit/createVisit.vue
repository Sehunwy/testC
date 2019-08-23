<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="saveVisitDataThenGoBack">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">拜访进行中...</span>
      <span
        slot="right"
        class="icon iconfont icon-jieshu headBarIcon"
        @click="getGeolocationThenFinishVisit"
        v-show="!isBusyQuery&&currentVisit.Id"
      ></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop contentBottom">
      <crmLoading v-show="isBusyQuery||isBusyFinish"></crmLoading>
      <div v-show="!isBusyQuery&&currentVisit.Id">
        <van-cell-group>
          <van-field
            label="开始时间"
            v-model="formatVisitBeginTime"
            left-icon="icon iconfont icon-kaishishijian"
            readonly
          ></van-field>
          <van-field
            v-model="visitDuration"
            label="停留时长"
            left-icon="icon iconfont icon-zengjiashichang"
            readonly
          ></van-field>
        </van-cell-group>
        <van-cell-group style="margin-top:8px;">
          <van-field
            v-model="currentVisit.BeginLocationDesc"
            label="位置"
            left-icon="icon iconfont icon-location"
            disabled
          ></van-field>
          <van-field
            v-model="currentVisit.CustomerName"
            label="客户名称"
            left-icon="icon iconfont icon-client"
            disabled
          ></van-field>
        </van-cell-group>
        <van-cell-group style="margin-top:8px;">
          <van-field
            v-model="finishVisitInfo.VisitPerson"
            label="拜访人员"
            placeholder="请输入拜访人员"
            input-align="right"
            type="textarea"
            autosize
            rows="1"
            required
          />
          <van-field
            v-model="finishVisitInfo.VisitPersonPost"
            label="职务"
            placeholder="请输入职务"
            input-align="right"
            type="textarea"
            autosize
            rows="1"
          />
          <van-field
            v-model="finishVisitInfo.VisitPersonPhone"
            label="联系方式"
            placeholder="请输入联系方式"
            input-align="right"
            type="textarea"
            autosize
            rows="1"
          />
          <van-field
            v-model="finishVisitInfo.PeerPerson "
            label="同行人员"
            placeholder="请输入同行人员"
            input-align="right"
            type="textarea"
            autosize
            rows="1"
          />
          <van-field
            v-model="finishVisitInfo.Content"
            label="拜访内容"
            placeholder="请输入拜访内容"
            type="textarea"
            :autosize="{ maxHeight: 160, minHeight: 100 }"
            required
          />
        </van-cell-group>
      </div>
      <crmPhoto
        style="margin-top:8px;"
        v-show="!isBusyQuery&&currentVisit.Id"
        v-model="finishVisitInfo.PictureIds"
        imageCategory="Visit"
        headerTitle="拜访照片"
        :readOnly="false"
        :allowPickAblum="true"
        :showHeader="true"
        :businessId="currentVisit.Id"
        :customerName="currentVisit.CustomerName"
        @photoChange="onPhotoChange"
      ></crmPhoto>
    </div>
    <van-tabbar :zIndex="101">
      <van-tabbar-item
        class="bottomTabbarItem"
        @click="saveVisitData"
        v-show="!isBusyQuery&&currentVisit.Id"
      >
        <span slot="icon" class="icon iconfont icon-Done"></span>
        <span>保存信息</span>
      </van-tabbar-item>
      <van-tabbar-item
        class="bottomTabbarItem"
        @click="getGeolocationThenFinishVisit"
        v-show="!isBusyQuery&&currentVisit.Id"
      >
        <span slot="icon" class="icon iconfont icon-jieshu"></span>
        <span>结束拜访</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  padding: 8px 0px;
  background-color: f9f9f9;
}
.bottomTabbarItem {
  color: #3fcc8e;
}
</style>

<script>
import CreateVisit from "./createVisit.ts";
export default CreateVisit;
</script>
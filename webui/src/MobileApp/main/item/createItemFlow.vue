<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack" @click-right="createItemFlow">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">新增流程</span>
      <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <crmLoading v-show="isBusy"></crmLoading>
      <van-field
        v-model="newItemFlow.Content"
        label="描述"
        placeholder="请输入描述内容"
        input-align="right"
        type="textarea"
        rows="2"
        autosize
        required
      />
      <van-field
        v-model="newItemFlow.Analyze"
        label="分析"
        placeholder="请输入分析内容"
        input-align="right"
        type="textarea"
        rows="2"
        autosize
      />
      <van-field
        v-model="newItemFlow.NextPlan"
        label="下一计划"
        placeholder="请输入下一步计划"
        input-align="right"
        type="textarea"
        rows="2"
        autosize
      />
      <van-field
        v-model="displayExecutors"
        label="执行人"
        placeholder="请选择执行人"
        input-align="right"
        type="textarea"
        rows="1"
        autosize
        readonly
        is-link
        @click="openSelectPersonPopup()"
      />
    </div>
    <van-popup
      v-model="showSelectPersonPopup"
      :overlay="false"
      :close-on-click-overlay="false"
      position="right"
      style="height:100%;width:100%;"
    >
      <selectPerson
        title="选择执行人"
        :maxCount="5"
        @goBack="closeSelectPersonPopup"
        @complete="selectPersonComplete"
      ></selectPerson>
    </van-popup>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  padding: 10px 0px;
  background-color: #f9f9f9;
}
</style>

<script>
import CreateItemFlow from "./createItemFlow.ts";
export default CreateItemFlow;
</script>
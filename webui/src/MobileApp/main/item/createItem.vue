<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack" @click-right="createNewItem">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">新增事项</span>
      <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <crmLoading v-show="isBusy"></crmLoading>
      <van-cell-group>
        <van-field
          v-model="newItem.CustomerName"
          label="客户"
          placeholder="请选择客户"
          input-align="right"
          required
          readonly
          :is-link="!disableSelectCustomer"
          :disabled="disableSelectCustomer"
          @click="openSelectCustomerPopup()"
        />
        <van-field
          v-model="newItem.Name"
          label="事项名称"
          placeholder="请输入事项名称"
          input-align="right"
          required
          type="textarea"
          rows="1"
          autosize
        />
        <van-cell title="事项等级">
          <van-radio-group v-model="newItem.Level">
            <van-radio class="levelRadio" checked-color="#3fcc8e" :name="Number(1)">一般</van-radio>
            <van-radio class="levelRadio marginLeft20" checked-color="#3fcc8e" :name="Number(2)">高</van-radio>
          </van-radio-group>
        </van-cell>
        <van-field
          v-model="newItem.Description"
          label="概述"
          placeholder="请输入事项概述"
          input-align="right"
          type="textarea"
          rows="1"
          autosize
        />
      </van-cell-group>
      <van-cell-group style="margin-top:10px;">
        <van-field
          v-model="newItem.Analyze"
          label="分析"
          placeholder="请输入事项分析"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newItem.NextPlan"
          label="下一计划"
          placeholder="请输入下一计划内容"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newItem.Remark"
          label="备注"
          placeholder="请输入备注内容"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
      </van-cell-group>
    </div>
    <van-popup
      v-model="showSelectCustomerPopup"
      :overlay="false"
      :close-on-click-overlay="false"
      position="right"
      style="height:100%;width:100%;"
    >
      <selectCustomer
        title="选择客户"
        :showComponent="true"
        @goBack="closeSelectCustomerPopup"
        @complete="selectCustomerComplete"
      ></selectCustomer>
    </van-popup>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  padding: 10px 0px;
  background-color: #f9f9f9;
}
.levelRadio {
  display: inline-block;
}
.marginLeft20 {
  margin-left: 20px;
}
.bottomLine {
  border-bottom: 1px solid gray;
}
</style>

<script>
import CreateItem from "./createItem.ts";
export default CreateItem;
</script>
<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="onCancel" @click-right="onComplete">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">{{title}}</span>
      <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <div v-show="isBusy" class="alignCenter width100">
        <van-loading style="display:inline-block"/>
      </div>
      <van-radio-group v-model="selectedValue">
        <van-cell-group>
          <van-cell
            v-for="(item,index) in allValues"
            clickable
            :key="index"
            :title="item"
            @click="onSelectValue(item)"
          >
            <van-radio
              :name="item"
              checked-color="#3fcc8e"
              :labelPosition="true"
              class="alignRight"
            />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("../common.less");
#contentContainer {
  padding: 10px 0px 0px 0px;
  background-color: #f9f9f9;
}
</style>

<script>
import SelectDictionaryValue from "./selectDictionaryValue.ts";
export default SelectDictionaryValue;
</script>
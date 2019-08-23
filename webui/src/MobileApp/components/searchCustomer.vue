<template>
  <div>
    <div class="fixedHeader">
      <van-nav-bar class="headBar" @click-left="onClickBack">
        <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
        <span slot="title" class="headBarTitle">查找客户</span>
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
      <div class="searchResultContainer">
        <div style="padding:4px 0px 2px 8px;font-size:10pt;color:#3fcc8e;">
          <span>搜索结果</span>
        </div>
        <van-list
          v-model="isLoading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="loadNextCustomerDatas"
          style="min-height:30px"
          class="van-hairline--top"
        >
          <van-cell-group :border="false">
            <van-cell
              v-for="(item,index) in customerList"
              clickable
              is-link
              :key="index"
              :title="item.Name"
              @click="onClickResult(item)"
            ></van-cell>
          </van-cell-group>
        </van-list>
      </div>
      <div class="historyContainer">
        <div
          class="van-hairline--bottom"
          style="padding:10px 0px 2px 8px;font-size:10pt;color:#3fcc8e;"
        >
          <span>搜索历史</span>
        </div>
        <div style="min-height:30px" class="van-hairline--top">
          <div
            style="display:inline-block;margin:10px 2px 0px 8px;"
            v-for="(item,index) in searchHistoryList"
            :key="index"
            @click="onClickResult(item)"
          >
            <van-tag round size="medium" style="min-width:60px;text-align:center;">{{item.Name}}</van-tag>
          </div>
        </div>
        <div style="padding:10px 0px;text-align:center;color:#6E6E6E;">
          <span
            class="icon iconfont icon-delete"
            style="font-size:14px;"
            @click="clearSearchHistoryList"
          >清空搜索历史</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("../common.less");
#contentContainer {
  top: 84px;
  padding: 0px 0px 10px 0px;
  background-color: #f9f9f9;
}
</style>

<script>
import SearchCustomer from "./searchCustomer.ts";
export default SearchCustomer;
</script>
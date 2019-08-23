<template>
  <div>
    <van-nav-bar class="headBar" @click-right="goCreateItem">
      <span slot="title" class="headBarTitle">事项</span>
      <span slot="right" class="icon iconfont icon-xinzeng2 headBarIcon"></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop contentBottom">
      <van-tabs
        :line-width="80"
        color="#3fcc8e"
        swipeable
        v-model="activeTab"
        @change="onActiveTabChange"
      >
        <van-tab title="下属事项" v-if="isLeader">
          <div
            class="vanTabContentContainer"
            :style="{ height: tabContentHeight + 'px' }"
            id="subContentContainer"
          >
            <van-search
              class="vansearchClass"
              v-model="keywordSubordinate"
              placeholder="请输入搜索关键词"
              @search="loadSubordinateItemDatas"
            />
            <crmList
              ref="subordinateCrmList"
              moduleName="crm.item.itemService"
              moduleClassName="ItemService"
              methodName="getSubordinateItemList"
              :keyword="keywordSubordinate"
            >
              <div slot="listItem" slot-scope="slotProps" @click="goItemDetails(slotProps.data.Id)">
                <itemTemplate :itemData="slotProps.data"></itemTemplate>
              </div>
            </crmList>
            <crmBackTop containerId="subContentContainer"></crmBackTop>
          </div>
        </van-tab>
        <van-tab title="我的事项">
          <div
            class="vanTabContentContainer"
            :style="{ height: tabContentHeight + 'px' }"
            id="selfContentContainer"
          >
            <van-search
              class="vansearchClass"
              placeholder="请输入搜索关键词"
              v-model="keywordSelf"
              @search="loadSelfItemDatas"
            />
            <crmList
              ref="selfCrmList"
              moduleName="crm.item.itemService"
              moduleClassName="ItemService"
              methodName="getItemList"
              :keyword="keywordSelf"
            >
              <div slot="listItem" slot-scope="slotProps" @click="goItemDetails(slotProps.data.Id)">
                <itemTemplate :itemData="slotProps.data"></itemTemplate>
              </div>
            </crmList>
            <crmBackTop containerId="selfContentContainer" :distance="20"></crmBackTop>
          </div>
        </van-tab>
        <van-tab title="参与事项">
          <div
            class="vanTabContentContainer"
            :style="{ height: tabContentHeight + 'px' }"
            id="involveContentContainer"
          >
            <van-search
              class="vansearchClass"
              placeholder="请输入搜索关键词"
              v-model="keywordInvolve"
              @search="loadInvolveItemDatas"
            />
            <crmList
              ref="involveCrmList"
              moduleName="crm.item.itemService"
              moduleClassName="ItemService"
              methodName="getInvolveItemList"
              :keyword="keywordInvolve"
            >
              <div slot="listItem" slot-scope="slotProps" @click="goItemDetails(slotProps.data.Id)">
                <itemTemplate :itemData="slotProps.data"></itemTemplate>
              </div>
            </crmList>
            <crmBackTop containerId="involveContentContainer" :distance="20"></crmBackTop>
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
</style>

<script>
import Item from "./item.ts";
export default Item;
</script>
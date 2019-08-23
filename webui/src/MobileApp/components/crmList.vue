<template>
  <div>
    <van-pull-refresh v-model="isLoadingRefresh" @refresh="loadDataList">
      <van-list
        v-model="isLoadingNext"
        :finished="finished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="loadNextDatas"
        class="crmVanList"
      >
        <div v-for="(item, index) in dataList" :key="index">
          <slot name="listItem" :data="item">{{item.Id}}</slot>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="less">
@import url(../common.less);
</style>

<script>
import CrmList from "./crmList.ts";
export default CrmList;
</script>
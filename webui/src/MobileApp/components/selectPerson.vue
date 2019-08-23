<template>
  <div>
    <div class="fixedHeader">
      <van-nav-bar class="headBar" @click-left="goBack" @click-right="confirmComplete">
        <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
        <span slot="title" class="headBarTitle">{{title}}</span>
        <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
      </van-nav-bar>
    </div>
    <div id="contentContainer" class="content contentTop">
      <van-checkbox-group v-model="selectedPersons" :max="maxCount">
        <mt-index-list id="personIndexList">
          <crmLoading v-show="isBusy" style="padding:5px 0px"></crmLoading>
          <mt-index-section
            v-for="(item, index) in personListGroupByLetter"
            :key="index"
            :index="item.Letter"
          >
            <van-cell-group>
              <van-cell
                v-for="(person, pindex) in item.PersonList"
                :key="pindex"
                :title="person.Name"
                :label="person.IsSalesPerson?person.SalesArea:person.DirectDept"
                :center="true"
                clickable
                @click="toggleCheckPerson(person)"
              >
                <van-checkbox :name="person" checked-color="#3fcc8e" ref="checkboxes"/>
              </van-cell>
            </van-cell-group>
          </mt-index-section>
        </mt-index-list>
      </van-checkbox-group>
    </div>
  </div>
</template>

<style>
.mint-indexsection-index {
  padding: 5px 10px !important;
}
</style>
<style scoped lang="less">
@import url("../common.less");
#contentContainer {
  background-color: #f9f9f9;
}
#personIndexList {
  touch-action: pan-y;
}
</style>

<script>
import SelectPerson from "./selectPerson.ts";
export default SelectPerson;
</script>
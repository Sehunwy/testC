<template>
  <div class="mainContainer">
    <div class="barContainer">
      <div
        class="barItem rightBorder"
        @click="openSortDropdown"
        :class="{'activeColor':showSortDropdown}"
      >
        <span class="icon iconfont icon-paixu-shengxu" v-show="defaultSort.Asc"></span>
        <span class="icon iconfont icon-paixu-jiangxu" v-show="!defaultSort.Asc"></span>
        <span class="barContainerText">{{defaultSort.SimpleName}}</span>
        <span class="icon iconfont icon-xiangxia" :class="{'rotate180':showSortDropdown}"></span>
      </div>
      <div
        class="barItem rightBorder"
        @click="openFilterDropdown"
        :class="{'activeColor':showFilterDropdown}"
        v-show="enableFilterDropdown"
      >
        <span class="icon iconfont icon-guolv"></span>
        <span class="barContainerText">筛选</span>
        <span class="icon iconfont icon-xiangxia" :class="{'rotate180':showFilterDropdown}"></span>
      </div>
      <div class="barItem" @click="onSearch">
        <span class="icon iconfont icon-small-chaxun"></span>
        <span class="barContainerText">查找</span>
      </div>
    </div>
    <transition name="dropdown">
      <div class="dropdownContainer" v-show="showSortDropdown">
        <ul>
          <li
            v-for="(item,index) in sortOptions"
            :key="index"
            @click="sortOptionClick(item)"
            class="sortItem"
            :class="{'bottomBorder':index<sortOptions.length-1,'activeColor':item.Cd===defaultSort.Cd}"
          >
            <span class="icon iconfont icon-paixu-shengxu" v-show="item.Asc"></span>
            <span class="icon iconfont icon-paixu-jiangxu" v-show="!item.Asc"></span>
            <span class="text">{{ item.Name }}</span>
            <span
              class="icon iconfont icon-wancheng"
              style="float:right"
              v-show="item.Cd===defaultSort.Cd"
            ></span>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="dropdown">
      <div class="dropdownContainer filterDropdownContainer" v-show="showFilterDropdown">
        <van-row>
          <van-col span="10" class="filterTypeContainer">
            <ul>
              <li
                v-for="(item,index) in filterTypes"
                :key="index"
                @click="filterTypeItemClick(item)"
                class="filterTypeItem"
                :class="{'selectFilterTypeItem':item.Cd===defaultFilterType.Cd}"
              >
                <span class="text">{{ item.Name }}</span>
                <span class="icon iconfont icon-xiangxia rotateMinus90" style="float:right"></span>
              </li>
            </ul>
          </van-col>
          <van-col span="14"></van-col>
        </van-row>
      </div>
    </transition>
    <transition name="backCover">
      <div class="dropdownBackCover" v-show="showBackCover" @click="closeDropdown"></div>
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("../common.less");

.mainContainer {
  background-color: #fff;
  height: auto;
  width: 100%;
  position: fixed;
}
.barContainer {
  height: 40px;
  background-color: #fcfcfc;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  display: -webkit-flex; /* Safari */
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: absolute;
  z-index: 50;
}
.barItem {
  text-align: center;
  width: 100%;
  font-size: 10pt;
}
.rightBorder {
  border-right: 0.025rem solid #e4e4e4;
}
.barContainerText {
  margin: 0px 4px;
}
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s;
  transform: translateY(0);
}
.dropdown-enter,
.dropdown-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}
.backCover-enter-active,
.backCover-leave-active {
  transition: opacity 0.3s;
}
.backCover-enter, .backCover-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.dropdownContainer {
  top: 41px;
  padding: 5px 0px;
  height: auto;
  width: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 40;
}
.dropdownBackCover {
  height: 100%;
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
}
.rotate180 {
  display: inline-block;
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.rotateMinus90 {
  display: inline-block;
  -moz-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
.sortItem {
  padding: 15px 10px;
  color: #666;
  .text {
    font-size: 10pt;
    margin-left: 5px;
  }
}
.filterDropdownContainer {
  padding: 0px;
  height: 320px;
}
.filterTypeContainer {
  background-color: #f7f7f7;
  height: 100%;
}
.filterTypeItem {
  padding: 10px 5px;
  color: #666;
  .text {
    font-size: 10pt;
    margin-left: 5px;
  }
}
.selectFilterTypeItem {
  background-color: #fff;
}
.bottomBorder {
  border-bottom: 0.025rem solid #e4e4e4;
}
.activeColor {
  color: #44bb00;
}
</style>

<script>
import CustomerDropDown from "./customerDropDown.ts";
export default CustomerDropDown;
</script>
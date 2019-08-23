<template>
  <div>
    <div class="fixedHeader">
      <van-nav-bar
        class="headBar"
        right-text="123"
        @click-left="goBack"
        @click-right="confirmComplete"
      >
        <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
        <span slot="title" class="headBarTitle">{{title}}</span>
        <div slot="right" class="flexRowLayout" style="justify-content:flex-end">
          <span class="headBarText">{{rightText}}</span>
          <span class="icon iconfont icon-queding headBarIcon"></span>
        </div>
      </van-nav-bar>
      <div id="mapContainer"></div>
      <div id="locationButtonContainer">
        <van-button
          round
          plain
          type="primary"
          :loading="isBusyLocation"
          :disabled="!allowLocation"
          size="small"
          @click="getGeolocation"
          style="height:25px;line-height:25px;"
        >
          <span class="icon iconfont icon-dingwei-dingwei"></span>
        </van-button>
      </div>
    </div>
    <div id="locationContainer" class="content">
      <van-radio-group v-model="selectedRadio" @change="onRadioChange">
        <div class="locationContainerTitle">
          <span>定位位置</span>
        </div>
        <van-cell
          :title="currentLocationAddressDesc"
          :center="true"
          icon="location-o"
          clickable
          @click="selectedRadio = '-1'"
        >
          <span slot="icon" class="icon iconfont icon-location" style="margin-right:5px;"></span>
          <van-radio name="-1" checked-color="#3fcc8e" class="alignRight"/>
        </van-cell>
        <div class="locationContainerTitle">
          <span>周边位置</span>
        </div>
        <div v-show="isBusyLocalSearch" class="alignCenter width100">
          <van-loading style="display:inline-block"/>
        </div>
        <div>
          <van-cell
            v-for="(item, index) in nearbyLocations"
            :key="index"
            :title="item.title"
            :label="item.address"
            :center="true"
            icon="location-o"
            clickable
            @click="selectedRadio = index"
          >
            <span slot="icon" class="icon iconfont icon-location" style="margin-right:5px;"></span>
            <van-row>
              <van-col span="16" style="padding:3px 0px 2px 0px">
                <van-tag color="#44bb00">{{item.distance|formatDistance}}</van-tag>
              </van-col>
              <van-col span="8">
                <van-radio :name="index" checked-color="#3fcc8e"></van-radio>
              </van-col>
            </van-row>
          </van-cell>
        </div>
      </van-radio-group>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("../common.less");
#mapContainer {
  width: 100%;
  height: 280px;
}
#locationContainer {
  top: 326px;
}
#locationButtonContainer {
  margin-top: -40px;
  margin-right: 10px;
  text-align: right;
}
.locationContainerTitle {
  margin-top: 5px;
  width: 100%;
  text-align: left;
  & span {
    color: #44bb00;
    font-size: 12px;
    margin-left: 5px;
  }
}
</style>

<script>
import Location from "./location.ts";
export default Location;
</script>
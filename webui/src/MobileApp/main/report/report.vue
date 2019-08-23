<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">报表</span>
      <!-- <span slot="right" class="icon iconfont icon-xinzeng2 headBarIcon"></span> -->
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="销售出访分析" :is-link="false" name="1" label="本月人均出访：0.6">
          <div id="salesVisit" style="height:180px;"></div>
          <div slot="value">
            <div class="color81bef7 valueDataFontSize">
              0.5
              <span class="upwardArrow">↑</span>
            </div>
            <div class="valueDescribe">昨日人均出访</div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="客户被拜访分析" :is-link="false" name="2" label="昨日拜访覆盖数量：33">
          <div id="customerVisitAnalysis" style="height:180px;"></div>
          <div slot="value">
            <div class="color013adf valueDataFontSize">5.26%</div>
            <div class="valueDescribe">本月拜访覆盖率</div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="新增客户分析-全部" :is-link="false" name="3" label="日均增长量：3.4">
          <div id="addCustomerAnalysis" style="height:180px;"></div>
          <div slot="value">
            <div class="color04b404 valueDataFontSize">
              6
              <span class="upwardArrow">↑</span>
            </div>
            <div class="valueDescribe">昨日新增客户</div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="客户总量分析-全部" :is-link="false" name="4" label="昨日净增客户：2">
          <div id="customerTotalAnalysis" style="height:180px;"></div>
          <div slot="value">
            <div class="colora901db valueDataFontSize">
              6880
              <span class="upwardArrow rotate180">↑</span>
            </div>
            <div class="valueDescribe">总客户数</div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="销售出访排行榜" :is-link="false" name="5" label="本月最高：149 | 四川片区">
          <div id="salesVisitsRankingList" style="height:180px;"></div>
          <div slot="value">
            <div class="colorfa5858 valueDataFontSize">484</div>
            <div class="valueDescribe">本月出访总数</div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="新增客户排行榜" :is-link="false" name="6" label="本月最高：11 | 四川片区">
          <div id="newCustomerRankingList" style="height:180px;"></div>
          <div slot="value">
            <div class="color31b404 valueDataFontSize">53</div>
            <div class="valueDescribe">本月新增总数</div>
          </div>
        </van-collapse-item>
                <van-collapse-item title="工作执行分析" :is-link="false" name="7" label="14 62 0">
          <div id="workExecutionAnalysis" style="height:180px;"></div>
          <div slot="value">
            <div class="colorb45f04 valueDataFontSize">3.1</div>
            <div class="valueDescribe">今日人均执行项数</div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="工作执行轨迹" :is-link="false" name="8" label="14 62 0">
          <div id="workExecutionTrajectory" style="height:180px;"></div>
          <div slot="value">
            <div class="colorffbf00 valueDataFontSize">43</div>
            <div class="valueDescribe">今日执行总数</div>
          </div>
        </van-collapse-item>
      </van-collapse>
      <!-- <div>
        <div id="div1" :ondrop="drop(event)" :ondragover="allowDrop(event)"></div>
        <br>
        <img
          id="drag1"
          src="../../../assets/img/separate.png"
          draggable="true"
          :ondragstart="drag(event)"
        >
      </div>-->
    </div>
  </div>
</template>

<style scoped lang="less">
// #div1 {
//   width: 198px;
//   height: 66px;
//   padding: 10px;
//   border: 1px solid #aaaaaa;
// }
@import url(../../common.less);
#contentContainer {
  background-color: #f9f9f9;
}
.van-cell {
  color: black;
}
.valueDataFontSize {
  font-size: 24px;
}
.color81bef7 {
  color: #81bef7;
}
.color013adf {
  color: #013adf;
}
.color04b404 {
  color: #04b404;
}
.colora901db {
  color: #a901db;
}
.colorb45f04 {
  color: #b45f04;
}
.colorffbf00 {
  color: #ffbf00;
}
.colorfa5858 {
  color: #fa5858;
}
.color31b404 {
  color: #31b404;
}
.upwardArrow {
  font-size: 14px;
  color: #959595;
}
.valueDescribe {
  font-size: 12px;
  color: #959595;
}
</style>

<script>
import Report from "./report.ts";
export default Report;
</script>
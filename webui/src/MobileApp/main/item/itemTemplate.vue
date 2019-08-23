<template>
  <div class="itemContainer">
    <van-row>
      <van-col offset="1" span="19" class="subTopText van-ellipsis">事项：{{itemData.Name}}</van-col>
      <van-col span="4">
        <van-tag
          round
          :color="itemData.State|formatItemStateColor"
        >{{itemData.State|formatItemState}}</van-tag>
      </van-col>
    </van-row>
    <van-row>
      <van-col
        offset="1"
        span="18"
        class="subMiddleText van-ellipsis"
      >客户：{{itemData.CustomerName}}</van-col>
      <van-col offset="3" span="2">
        <span
          class="icon iconfont icon-gengduo little_icon icon_more"
          style="color:#d7d7d7;font-size:16pt;"
        ></span>
      </van-col>
    </van-row>
    <van-row class="subBottomText" type="flex">
      <van-col offset="1" span="6" class="van-ellipsis">
        等级:
        <span class="subBottomTextInfo">{{itemData.Level|formatItemLevel}}</span>
      </van-col>
      <van-col offset="2" span="6" class="van-ellipsis">
        创建:
        <span class="subBottomTextInfo">{{itemData.CreaterName}}</span>
      </van-col>
      <van-col offset="2" span="6" class="van-ellipsis">
        时间:
        <span class="subBottomTextInfo">{{itemData.CreateTime|formatDateTime}}</span>
      </van-col>
    </van-row>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
.itemContainer {
  padding: 7px 0px;
  color: black;
  background-color: #ffffff;
  margin-bottom: 5px;
}
.subTopText {
  color: black;
  font-size: 14px;
}
.subMiddleText {
  color: #646464;
  font-size: 12px;
  line-height: 20px;
  padding: 2px 0px;
}
.subBottomText {
  font-size: 10px;
  color: #959595;
  .subBottomTextInfo {
    color: #3fcc8e;
  }
}
</style>

<script>
import ItemTemplate from "./itemTemplate.ts";
export default ItemTemplate;
</script>
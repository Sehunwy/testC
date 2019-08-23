<template>
  <div>
    <div class="fixedHeader">
      <van-nav-bar class="headBar" @click-left="onClickLeft">
        <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
        <span slot="title" class="headBarTitle">个人资料</span>
      </van-nav-bar>
      <div class="contentHeader">
        <van-row>
          <van-col offset="1" span="4" style="margin-top:20px">
            <img class="headPortrait" src="../../../assets/img/headPortrait.png">
          </van-col>
          <van-col span="10" style="color:#fff;line-height:100px">{{personInfo.Name}}</van-col>
        </van-row>
      </div>
    </div>
    <div id="contentContainer" class="content contentBottom">
      <div class="contentBody">
        <van-tabs
          v-model="active"
          :line-width="80"
          color="#3fcc8e"
          swipeable
          sticky
          :offset-top="146"
        >
          <van-tab title="基本信息">
            <div class="van-hairline--bottom">
              <van-row class="contentBodyItem" type="flex" align="center">
                <van-col offset="1" span="4">
                  <div class="phone">移动电话</div>
                  <div>{{personInfo.Telephone}}</div>
                </van-col>
                <van-col style="margin-top:10px" span="2" offset="16">
                  <span
                    class="icon iconfont icon-dianhua icon_style"
                    @click="dialPhoneNumber(personInfo.Telephone)"
                  ></span>
                </van-col>
              </van-row>
            </div>
            <div class="van-hairline--bottom">
              <van-row class="contentBodyItem" type="flex" align="center">
                <van-col offset="1" span="20">
                  <div class="phone">邮箱</div>
                  <div class="van-ellipsis">{{personInfo.Email?personInfo.Email:'-'}}</div>
                </van-col>
              </van-row>
            </div>
            <div class="van-hairline--bottom">
              <van-row class="contentBodyItem" type="flex" align="center">
                <van-col offset="1" span="20">
                  <div class="phone">部门</div>
                  <div class="van-ellipsis">{{personInfo.DirectDept}}</div>
                </van-col>
              </van-row>
            </div>
            <div class="van-hairline--bottom">
              <van-row class="contentBodyItem" type="flex" align="center">
                <van-col offset="1" span="20">
                  <div class="phone">职位</div>
                  <div class="van-ellipsis">{{personInfo.Title?personInfo.Title:'-'}}</div>
                </van-col>
              </van-row>
            </div>
            <div class="van-hairline--bottom" v-show="personInfo.IsSalesPerson">
              <van-row class="contentBodyItem" type="flex" align="center">
                <van-col offset="1" span="20">
                  <div class="phone">销售片区</div>
                  <div class="van-ellipsis">{{personInfo.SalesArea}}</div>
                </van-col>
              </van-row>
            </div>
          </van-tab>
          <van-tab title="工作动态" disabled>内容 2</van-tab>
        </van-tabs>
      </div>
    </div>
    <van-tabbar :zIndex="101">
      <van-tabbar-item>
        <span class="icon iconfont icon-pinglun icon_style fonticon_gray"></span>
        <span class="fonticon_gray bottom_font">发消息</span>
      </van-tabbar-item>
      <van-tabbar-item @click="dialPhoneNumber(personInfo.Telephone)">
        <span class="icon iconfont icon-dianhua icon_style bottom_fonticon"></span>
        <span class="bottom_font bottom_fontblue">打电话</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);

#contentContainer {
  top: 146px;
  background-color: #f9f9f9;
}

.contentHeader {
  height: 100px;
  background-color: #3fcc8e;
}

.headPortrait {
  width: 60px;
  border-radius: 50%;
  overflow: hidden;
}

.contentBody {
  background-color: #fff;
}

.contentBodyItem {
  height: 70px;
}

.fonticon_gray {
  color: #c8c9cc !important;
}

.bottom_fonticon {
  font-size: 18px !important;
  color: #3fcc8e !important;
  display: block;
}

.van-tabbar-item--active {
  color: #3fcc8e !important;
}

.bottom_fontblue {
  color: #3fcc8e;
}

.bottom_font {
  font-size: 12px;
  display: block;
  padding-top: 5px;
  margin-left: -5px;
}

.phone {
  color: #959595;
  font-size: 14px;
  margin-bottom: 5px;
}

.icon_style {
  font-size: 20px;
  color: #3fcc8e;
}
</style>

<script>
import PersonDetails from "./personDetails.ts";
export default PersonDetails;
</script>
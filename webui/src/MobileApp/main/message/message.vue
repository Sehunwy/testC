<template>
  <div>
    <van-nav-bar class="headBar">
      <span slot="title" class="headBarTitle">沟通</span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop contentBottom">
      <van-tabs :line-width="80" color="#3fcc8e" swipeable>
        <van-tab title="通讯录">
          <van-search
            class="vansearchClass"
            placeholder="请输入搜索关键词"
            v-model="keyword"
            @search="queryPersonList"
          />
          <div v-show="isBusy" class="loadingContainer">
            <van-loading size="16px" style="display:inline-block; color:#969799"/>
            <span style="color:#969799;font-size:14px;padding-left:6px">加载中...</span>
          </div>
          <mt-index-list id="personIndexList">
            <mt-index-section
              v-for="(item, index) in personListGroupByLetter"
              :key="index"
              :index="item.Letter"
            >
              <div
                class="van-hairline--bottom personInfoContainer"
                v-for="(person, pindex) in item.personList"
                :key="pindex"
                @click="goPersonDatails(person)"
              >
                <van-row style="height: 60px;" type="flex" align="center">
                  <van-col span="3" offset="1">
                    <img class="headPortrait" src="../../../assets/img/headPortrait.png">
                  </van-col>
                  <van-col span="12" offset="1">
                    <div>{{person.Name}}</div>
                    <div
                      class="van-ellipsis salesAreaInfo"
                    >{{person.IsSalesPerson?person.SalesArea:person.DirectDept}}</div>
                  </van-col>
                  <van-col offset="5" span="3">
                    <span
                      class="icon iconfont icon-dianhua dialPhoneIcon"
                      @click.stop="dialPhoneNumber(person.Telephone)"
                    ></span>
                  </van-col>
                </van-row>
              </div>
            </mt-index-section>
          </mt-index-list>
        </van-tab>
        <van-tab title="消息" disabled></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style>
.mint-indexsection-index {
  padding: 5px 10px !important;
}
</style>

<style scoped lang="less">
@import url(../../common.less);

#contentContainer {
  background-color: #f9f9f9;
  overflow-y: hidden;
}

#personIndexList {
  touch-action: pan-y;
}

.loadingContainer {
  text-align: center;
  width: 100%;
  padding-top: 20px;
  height: 30px;
}

.headPortrait {
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.personInfoContainer {
  background-color: #fff;
}

.salesAreaInfo {
  margin-top: 2px;
  color: #959595;
  font-size: 14px;
}

.dialPhoneIcon {
  color: #3fcc8e;
}
</style>

<script>
import Message from "./message.ts";
export default Message;
</script>
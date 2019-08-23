<template>
  <div>
    <!-- <div style="height:100px;z-index:200">
      <div>
        <van-button size="small" @click="startVisiting">开始拜访</van-button>
        <van-button size="small" @click="finishVisiting">结束拜访</van-button>
      </div>
      <van-notice-bar :scrollable="false" mode="link" v-show="isVisitingCustomer">正在拜访：{{currentCustomerVisit}}</van-notice-bar>
    </div>-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- 下面的代码会导致页面跳转时会重新创建上一页面：比如从客户页面跳转到客户详情后,会重新创建客户页面,下一步考虑如何更好的解决此问题 -->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <van-tabbar :zIndex="100" v-model="active">
      <van-tabbar-item to="/main/visit" :replace="true">
        <span slot-scope="props" v-bind:class="props.active ? 'activeIcon' : 'normalIcon'">拜访</span>
        <span
          slot="icon"
          slot-scope="props"
          class="icon iconfont icon-recommend tabItemIcon"
          v-bind:class="props.active ? 'activeIcon' : 'normalIcon'"
        ></span>
      </van-tabbar-item>
      <van-tabbar-item to="/main/item" :replace="true">
        <span slot-scope="props" v-bind:class="props.active ? 'activeIcon' : 'normalIcon'">事项</span>
        <span
          slot="icon"
          slot-scope="props"
          class="icon iconfont icon-todo tabItemIcon"
          v-bind:class="props.active ? 'activeIcon' : 'normalIcon'"
        ></span>
      </van-tabbar-item>
      <van-tabbar-item icon="contact" to="/main/customer" :replace="true">
        <span slot-scope="props" v-bind:class="props.active ? 'activeIcon' : 'normalIcon'">客户</span>
        <span
          slot="icon"
          slot-scope="props"
          class="icon iconfont icon-client tabItemIcon"
          v-bind:class="props.active ? 'activeIcon' : 'normalIcon'"
        ></span>
      </van-tabbar-item>
      <van-tabbar-item icon="chat" to="/main/message" :replace="true">
        <span slot-scope="props" v-bind:class="props.active ? 'activeIcon' : 'normalIcon'">沟通</span>
        <span
          slot="icon"
          slot-scope="props"
          class="icon iconfont icon-xiaoxi tabItemIcon"
          v-bind:class="props.active ? 'activeIcon' : 'normalIcon'"
        ></span>
      </van-tabbar-item>
      <van-tabbar-item icon="contact" to="/main/workbench" :replace="true">
        <span slot-scope="props" v-bind:class="props.active ? 'activeIcon' : 'normalIcon'">我的</span>
        <span
          slot="icon"
          slot-scope="props"
          class="icon iconfont icon-wode tabItemIcon"
          v-bind:class="props.active ? 'activeIcon' : 'normalIcon'"
        ></span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style scoped>
@import url(../common.less);
.tabItemIcon {
  font-size: 22px;
}
.normalIcon {
  color: #7d7e80;
}
.activeIcon {
  color: #3fcc8e;
}
</style>

<script>
import Main from "./main.ts";
export default Main;
</script>
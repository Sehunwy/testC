<template>
  <div>
      <van-nav-bar class="headBar fixedHeader" @click-left="goBack" @click-right="modifyPassword">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">修改密码</span>
      <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
    </van-nav-bar>
    <van-cell-group id="contentContainer" class="content contentTop">
      <van-field
          v-model="info.oldPassword"
          label="原密码"
          placeholder="请输入原密码"
          type="password"
          input-align="right"
          required
        />
        <van-field
          v-model="info.newPassword"
          label="新密码"
          placeholder="请设置新密码"
          type="password"
          input-align="right"
          required
        />
        <van-field
          v-model="info.confirmPassword"
          label="确认密码"
          placeholder="请再次输入新密码"
          type="password"
          input-align="right"
          required
        />
    </van-cell-group>
  </div>
</template>

<style scoped lang="less">
#contentContainer {
  padding: 10px 0px;
  background-color: #f9f9f9;
}
</style>

<script>
import ChangePassword from "./changePassword.ts";
export default ChangePassword;
</script>
<template>
  <div class="container">
    <div id="signinContainer">
      <div id="logoContainer" class="centerContainer">
        <img src="../../assets/img/sns.png">
      </div>
      <div id="inputContainer" class="centerContainer">
        <input type="text" placeholder="请输入手机号" v-model="tele">
        <input type="text" placeholder="请输入昵称" v-model="nickname">
        <input type="password" placeholder="请输入密码" v-model="password">
        <input type="password" placeholder="请输入确认密码" v-model="confirmPassword">
        <div>
          <input style="width:100px" type="text" placeholder="请输入验证码" v-model="confirmCode">
          <canvas
            ref="mycanvas"
            id="mycanvas"
            style="margin-left:10px"
            :width="canvasWidth"
            :height="canvasHeight"
            @click="createCode"
          ></canvas>
        </div>

        <div id="buttonContainer" class="centerContainer">
          <van-button
            id="signinbutton"
            class="centerContainer"
            size="small"
            round
            @click="goBack"
          >返回</van-button>
          <van-button
            id="signinbutton"
            class="centerContainer"
            size="small"
            round
            @click="signup"
          >注册</van-button>
        </div>
      </div>
      <div class="centerContainer">
        <van-loading id="loadIndicator" v-show="isBusy"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less" src="./signup.less"></style>

<script>
import Signup from "./signup.ts";
export default Signup;
</script>

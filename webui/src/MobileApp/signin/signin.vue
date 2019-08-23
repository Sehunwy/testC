<template>
  <div class="container">
    <div id="signinContainer">
        <div id="logoContainer" class="centerContainer">
            <img src="../../assets/img/sns.png"/>   
        </div>
        <div id="inputContainer" class="centerContainer">
            <input type="text" placeholder="手机号/邮箱" v-model="accountName">
            <input type="password" placeholder="密码" v-model="password">
            <div id="forgetContainer" class="centerContainer">
                <a @click="forgetPassword"><span>忘记密码？</span></a>
            </div>
            <div id="buttonContainer" class="centerContainer">
                <van-button id="signinbutton" class="centerContainer" @click="signin" size="small" round>登录</van-button>
            </div>
            <div id="createContainer" class="centerContainer">
                <a @click="createAccount"><span>创建账号</span></a>
            </div>
        </div>
        <div class="centerContainer">
            <van-loading id="loadIndicator" v-show="isBusy"/>
        </div>
    </div>
  </div>
</template>

<style scoped lang="less" src="./style.less"></style>

<script>
  import Signin from "./signin.ts";
  export default Signin;
</script>
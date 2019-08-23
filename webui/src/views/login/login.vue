<template>
  <div class="login-container">
    <img class="logo" src="../../assets/companyLogo.png">
    <el-form class="login-form" label-position="left">
      <h3 class="title">光华CRM后台管理系统</h3>
      <el-form-item>
        <span class="icon iconfont icon-wode inputIcon"></span>
        <el-input v-model="username" name="username" type="text" placeholder="用户名"/>
      </el-form-item>
      <el-form-item>
        <span class="icon iconfont icon-ico_compile inputIcon"></span>
        <el-input v-model="password" name="password" type="password" placeholder="密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="login">登录</el-button>
      </el-form-item>
      <div class="otherOptions">
        <div id="forgetContainer">
          <a @click="forgetPassword">
            <span>忘记密码？</span>
          </a>
        </div>
        <div id="createContainer">
          <a @click="createAccount">
            <span>创建账号</span>
          </a>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-container {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  .logo {
    width: 300px;
    height: 40px;
    padding: 10px 20px;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 380px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .inputIcon {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
  }
  .otherOptions {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    #forgetContainer {
      color: white;
      font-size: 10pt;
    }
    #createContainer {
      color: white;
      font-size: 10pt;
    }
  }
}
</style>

<script>
import Login from "./login.ts";
export default Login;
</script>
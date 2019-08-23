<template>
  <div class="container">
    <div id="sloganContainer">
      <img src="../../assets/img/slogan_mini.png">
    </div>
    <div id="logoContainer">
      <img src="../../assets/img/sns.png">
    </div>
    <div id="skipContainer">
      <van-button @click="skipPage" size="small" round>{{totalSkipTime}} 跳过</van-button>
    </div>
  </div>
</template>

<style scoped lang="less" src="./style.less"></style>

<script>
import Welcome from "./welcome.ts";
export default Welcome;
</script>
<template>
  <div style="width:100%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>企业名称：成都圣恩生物科技股份有限公司</span>
        <span class="icon iconfont icon-ico_compile operation"></span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="text item">编码：SNS</div>
      <div class="text item">控制码：SNS</div>
      <div class="text item">简称：圣恩股份</div>
      <div class="text item">地址：科兴路西段755号</div>
      <div class="text item">电话</div>
      <div class="text item">传真：</div>
      <div class="text item">法人：朱俊松</div>
    </el-card>
  </div>
</template>

<style scoped>
.bg-purple {
  background-color: pink;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-left: 20px;
}

.operation {
  float: right;
  padding: 3px 0;
}

.operation:hover {
  cursor: pointer;
  color: #409eff;;
}

</style>

<script>
import BasicInformation from "./basicInformation.ts";
export default BasicInformation;
</script>
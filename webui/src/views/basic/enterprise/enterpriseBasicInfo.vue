<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height:28px">企业名称：{{enterprise.Name}}</span>
        <el-button style="float: right;" size="mini" icon="el-icon-edit" circle></el-button>
      </div>
      <div><span></span></div>
      <div><span>编码：{{enterprise.Cd}}</span></div>
      <div><span>控制码：{{enterprise.Ctrl}}</span></div>
      <div><span>简称：{{enterprise.SimpleName}}</span></div>
      <div><span>地址：{{enterprise.Address}}</span></div>
      <div><span>电话：{{enterprise.Telephone}}</span></div>
      <div><span>传真：{{enterprise.Fax}}</span></div>
      <div><span>法人：{{enterprise.LegalPerson}}</span></div>
    </el-card>
  </div>
</template>

<style scoped>
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
  width: 480px;
  margin: 10px;
}
</style>

<script>
import EnterpriseBasicInfo from "./enterpriseBasicInfo.ts";
export default EnterpriseBasicInfo;
</script>
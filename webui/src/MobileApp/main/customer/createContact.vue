<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack" @click-right="createCustomerContact">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">添加客户联系人</span>
      <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <crmLoading v-show="isBusy"></crmLoading>
      <van-cell-group>
        <van-field
          v-model="contact.Name"
          label="姓名"
          placeholder="请输入联系人姓名"
          input-align="right"
          required
        />
        <van-field
          v-model="contact.Telephone"
          label="电话"
          placeholder="请输入联系人电话"
          input-align="right"
          required
        />
        <van-field
          v-model="contact.Email"
          label="邮箱"
          placeholder="请输入联系人邮箱"
          input-align="right"
        />
        <van-field
          v-model="contact.Department"
          label="部门"
          placeholder="请输入联系人部门"
          input-align="right"
        />
        <van-field
          v-model="contact.Title"
          label="职位"
          placeholder="请输入联系人职位"
          input-align="right"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  padding: 10px 0px 0px 0px;
  background-color: #f9f9f9;
}
</style>

<script>
import CreateContact from "./createContact.ts";
export default CreateContact;
</script>
<template>
  <div>
    <van-nav-bar
      class="headBar fixedHeader"
      @click-left="goBack"
      @click-right="confirmCreateCustomer"
    >
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">新增客户</span>
      <span slot="right" class="icon iconfont icon-queding headBarIcon"></span>
    </van-nav-bar>
    <div id="contentContainer" class="content contentTop">
      <crmLoading v-show="isBusy"></crmLoading>
      <van-cell-group>
        <van-field
          v-model="newCustomer.LocationDesc"
          label="位置"
          left-icon="icon iconfont icon-location"
          type="textarea"
          autosize
          rows="1"
          disabled
        ></van-field>
      </van-cell-group>
      <van-cell-group style="margin-top:10px;">
        <van-field
          v-model="newCustomer.Name"
          label="客户名称"
          placeholder="请输入客户名称"
          input-align="right"
          type="textarea"
          autosize
          rows="1"
          required
          error-message
        />
        <van-field
          v-model="newCustomer.Address"
          label="客户地址"
          placeholder="请输入客户地址"
          input-align="right"
          type="textarea"
          autosize
          rows="1"
          required
          error-message
        />
        <van-field v-model="newCustomer.Cd" label="客户编码" placeholder="请输入客户编码" input-align="right"/>
        <van-field
          v-model="newCustomer.SimpleName"
          label="客户简称"
          placeholder="请输入客户简称"
          input-align="right"
        />
        <van-field
          v-model="newCustomer.Telephone"
          label="电话"
          placeholder="请输入电话"
          input-align="right"
        />
        <van-field v-model="newCustomer.Fax" label="传真" placeholder="请输入传真" input-align="right"/>
        <van-field
          v-model="newCustomer.ManagementCompany"
          label="管理公司"
          placeholder="请选择管理公司"
          input-align="right"
          readonly
          is-link
          @click="openSelectDictionaryValue('ManagementCompany','管理公司',newCustomer.ManagementCompany,(e)=>{newCustomer.ManagementCompany=e})"
        />
        <van-field
          v-model="newCustomer.Level"
          label="客户等级"
          placeholder="请选择客户等级"
          input-align="right"
          readonly
          is-link
          @click="openSelectDictionaryValue('CustomerLevel','客户等级',newCustomer.Level,(e)=>{newCustomer.Level=e})"
        />
        <van-field
          v-model="newCustomer.DevelopProgress"
          label="开发进度"
          placeholder="请选择开发进度"
          input-align="right"
          readonly
          is-link
          @click="openSelectDictionaryValue('DevelopmentProgress','开发进度',newCustomer.DevelopProgress,(e)=>{newCustomer.DevelopProgress=e})"
        />
        <van-field
          v-model="newCustomer.IndustryCategory"
          label="客户行业分类"
          placeholder="请选择客户行业分类"
          input-align="right"
          readonly
          is-link
          @click="openSelectDictionaryValue('CustomerIndustryCategory','客户行业分类',newCustomer.IndustryCategory,(e)=>{newCustomer.IndustryCategory=e})"
        />
      </van-cell-group>
      <van-cell-group style="margin-top:10px;">
        <van-field
          v-model="newCustomer.MainProduction"
          label="客户主要产品"
          placeholder="请输入客户主要产品"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newCustomer.Hobbies"
          label="客户兴趣爱好"
          placeholder="请输入客户兴趣爱好"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newCustomer.AccountPeriod"
          label="客户账期"
          placeholder="请输入客户账期"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newCustomer.CreditSituation"
          label="客户信用"
          placeholder="请输入客户信用"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newCustomer.ContractAgreement"
          label="合同约定"
          placeholder="请输入合同约定"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newCustomer.BusinessScale"
          label="客户规模"
          placeholder="请输入客户规模"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newCustomer.CompetitorSituation"
          label="竞品情况"
          placeholder="请输入竞品情况"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newCustomer.CompetitorAnalysis"
          label="竞品分析"
          placeholder="请输入竞品分析"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
        <van-field
          v-model="newCustomer.Remark"
          label="备注"
          placeholder="请输入备注"
          type="textarea"
          :autosize=" { maxHeight: 120, minHeight: 80 }"
        />
      </van-cell-group>
      <van-cell-group style="margin-top:10px;">
        <div class="contactContainer">
          <div class="createHeader flexRowLayout van-hairline--bottom">
            <div class="flexRowLayout" style="justify-content: flex-start;">
              <img src="../../../assets/img/separate.png">
              <span class="headerText">客户联系人</span>
            </div>
            <div class="headerCreateBtn" @click="createCustomerContact">
              <span class="icon iconfont icon-xinzeng2"></span>
            </div>
          </div>
          <div class="createBody">
            <div class="createBodyItem" v-for="(item,index) in customerContacts" :key="index">
              <van-cell-group>
                <van-field
                  v-model="item.Name"
                  label="姓名"
                  placeholder="请输入联系人姓名"
                  input-align="right"
                  required
                />
                <van-field
                  v-model="item.Telephone"
                  label="电话"
                  placeholder="请输入联系人电话"
                  input-align="right"
                  required
                />
                <van-field
                  v-model="item.Email"
                  label="邮箱"
                  placeholder="请输入联系人邮箱"
                  input-align="right"
                />
                <van-field
                  v-model="item.Department"
                  label="部门"
                  placeholder="请输入联系人部门"
                  input-align="right"
                />
                <van-field
                  v-model="item.Title"
                  label="职位"
                  placeholder="请输入联系人职位"
                  input-align="right"
                />
                <van-cell title="-">
                  <span
                    class="icon iconfont icon-delete bodyDeleteBtn"
                    @click="confirmDeleteCustomerContact(index)"
                  ></span>
                </van-cell>
              </van-cell-group>
            </div>
          </div>
        </div>
      </van-cell-group>
    </div>
    <van-popup
      v-model="showSelectDictionaryValue"
      :overlay="false"
      :close-on-click-overlay="false"
      position="right"
      style="height:100%;width:100%;"
    >
      <selectDictionaryValue
        @cancel="cancelSelectDictionaryValue"
        @complete="completeSelectDictionaryValue"
        :title="popupTitle"
        :dicKey="popupDicKey"
        :currentValue="popupOldValue"
      ></selectDictionaryValue>
    </van-popup>
  </div>
</template>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  padding: 10px 0px 50px 0px;
  background-color: #f9f9f9;
}
.contactContainer {
  min-height: 120px;
  .createHeader {
    height: 40px;
    & img {
      height: 24px;
      width: 20px;
    }
    .headerText {
      font-size: 11pt;
      font-weight: 600;
    }
    .headerCreateBtn {
      padding: 5px 15px;
      & span {
        color: #3fcc8e;
        font-size: 14pt;
        font-weight: 600;
      }
    }
  }
  .createBody {
    background-color: #f2f2f2;
    padding: 2px 0px;
    .createBodyItem {
      padding: 2px 0px;
      .bodyDeleteBtn {
        color: #3fcc8e;
        font-size: 14pt;
        font-weight: 600;
      }
    }
  }
}
</style>

<script>
import CreateCustomer from "./createCustomer.ts";
export default CreateCustomer;
</script>
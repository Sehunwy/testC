<template>
  <div>
    <van-nav-bar class="headBar fixedHeader" @click-left="goBack">
      <span slot="left" class="icon iconfont icon-fanhui headBarIcon"></span>
      <span slot="title" class="headBarTitle">客户详情</span>
      <!-- <span slot="right" class="icon iconfont icon-queding headBarIcon"></span> -->
    </van-nav-bar>
    <van-tabs
      id="contentContainer"
      class="content contentTop content-Bottom"
      :line-width="80"
      color="#3fcc8e"
      swipeable
    >
      <van-tab title="基本信息">
        <crmLoading v-show="isBusy" style="padding:5px 0px;"></crmLoading>
        <div class="vanTabContentContainer" :style="{ height: tabContentHeight + 'px' }">
          <crmLabel title="客户名称" :content="customerDetails.Name"></crmLabel>
          <crmLabel title="客户编码" :content="customerDetails.Cd"></crmLabel>
          <crmLabel title="客户简称" :content="customerDetails.SimpleName"></crmLabel>
          <crmLabel title="地址" :content="customerDetails.Address"></crmLabel>
          <crmLabel title="位置描述" :content="customerDetails.LocationDesc"></crmLabel>
          <crmLabel title="电话" :content="customerDetails.Telephone"></crmLabel>
          <crmLabel title="传真" :content="customerDetails.Fax"></crmLabel>
          <crmLabel title="管理公司" :content="customerDetails.ManagementCompany"></crmLabel>
          <crmLabel title="客户等级" :content="customerDetails.Level"></crmLabel>
          <crmLabel title="开发进度" :content="customerDetails.DevelopProgress"></crmLabel>
          <crmLabel title="客户行业分类" :content="customerDetails.IndustryCategory"></crmLabel>
          <crmLabel title="客户主要产品" :content="customerDetails.MainProduction"></crmLabel>
          <crmLabel title="客户兴趣爱好" :content="customerDetails.Hobbies"></crmLabel>
          <crmLabel title="客户账期" :content="customerDetails.AccountPeriod"></crmLabel>
          <crmLabel title="客户信用 " :content="customerDetails.CreditSituation"></crmLabel>
          <crmLabel title="合同约定 " :content="customerDetails.ContractAgreement"></crmLabel>
          <crmLabel title="客户规模 " :content="customerDetails.BusinessScale"></crmLabel>
          <crmLabel title="竞争情况" :content="customerDetails.CompetitorSituation"></crmLabel>
          <crmLabel title="竞争分析" :content="customerDetails.CompetitorAnalysis"></crmLabel>
          <crmLabel title="备注 " :content="customerDetails.Remark"></crmLabel>
          <div class="contactContainer">
            <div class="contactTitle van-hairline--bottom">
              <div class="createHeader flexRowLayout van-hairline--bottom">
                <div class="flexRowLayout" style="justify-content: flex-start;">
                  <img src="../../../assets/img/separate.png">
                  <span class="headerText">客户联系人</span>
                </div>
                <div class="headerCreateBtn" @click="goCreateContact">
                  <span class="icon iconfont icon-xinzeng2"></span>
                </div>
              </div>
            </div>
            <div
              class="noneContacts"
              v-show="!customerDetails||!customerDetails.Contacts||customerDetails.Contacts.length===0"
            >
              <span>没有联系人</span>
            </div>
            <div
              class="contactContent"
              v-for="(item,index) in customerDetails.Contacts"
              :key="index"
            >
              <crmLabel title="姓名" :content="item.Name"></crmLabel>
              <crmLabel title="电话">
                <div class="contactTelephone">
                  <div>{{!item.Telephone?'-':item.Telephone}}</div>
                  <div @click.stop="dialPhoneNumber(item.Telephone)" style="padding:0px 5px;">
                    <span class="icon iconfont icon-dianhua icon_iphone"></span>
                  </div>
                </div>
              </crmLabel>
              <crmLabel title="邮件" :content="item.Email"></crmLabel>
              <crmLabel title="部门" :content="item.Department"></crmLabel>
              <crmLabel title="职位" :content="item.Title"></crmLabel>
            </div>
          </div>
          <div class="contactContainer">
            <div class="contactTitle van-hairline--bottom">
              <div class="createHeader flexRowLayout van-hairline--bottom">
                <div class="flexRowLayout" style="justify-content: flex-start;">
                  <img src="../../../assets/img/separate.png">
                  <span class="headerText">客户归属</span>
                </div>
              </div>
            </div>
            <div class="contactContent" v-for="(item,index) in customerDetails.Owners" :key="index">
              <crmLabel
                :title="(item.DirectDept?item.DirectDept:'-')+'>'+(item.SalesArea?item.SalesArea:'-')"
                :content="item.Name"
              ></crmLabel>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="详细信息">
        <div class="vanTabContentContainer" :style="{ height: tabContentHeight + 'px' }">
          <crmLabel title="注册地址 " :content="customerDetails.RegisterAddress"></crmLabel>
          <crmLabel title="信用代码 " :content="customerDetails.CreditCode"></crmLabel>
          <crmLabel title="信用代码到期" :content="customerDetails.CreditCodeExpire"></crmLabel>
          <crmLabel title="生产许可证 " :content="customerDetails.ProduceLicense"></crmLabel>
          <crmLabel title="生产许可证到期 " :content="customerDetails.ProduceLicenseExpire"></crmLabel>
          <crmLabel title="经营许可证 " :content="customerDetails.BusinessLicense"></crmLabel>
          <crmLabel title="经营许可证到期 " :content="customerDetails.BusinessLicenseExpire"></crmLabel>
          <crmLabel title="注册资本 " :content="customerDetails.RegisteredCapital"></crmLabel>
          <crmLabel title="公司类型 " :content="customerDetails.CompanyType"></crmLabel>
          <crmLabel title="法人姓名" :content="customerDetails.LegalPerson "></crmLabel>
          <crmLabel title="法人身份证" :content="customerDetails.LegalPersonIdNumber "></crmLabel>
          <crmLabel title="法人住址 " :content="customerDetails.LegalPersonAddress"></crmLabel>
          <crmLabel title="开户银行 " :content="customerDetails.Bank "></crmLabel>
          <crmLabel title="银行账号 " :content="customerDetails.BankAccount"></crmLabel>
          <crmLabel title="信用额度 " :content="customerDetails.CreditLine"></crmLabel>
          <crmLabel title="自有产品结算方式 " :content="customerDetails.OwnerProductClose"></crmLabel>
          <crmLabel title="代理产品结算方式 " :content="customerDetails.AgencyProductClose"></crmLabel>
          <crmLabel title="公司网站 " :content="customerDetails.CompanySite"></crmLabel>
          <crmLabel title="经营地址 " :content="customerDetails.BusinessAddress"></crmLabel>
          <crmLabel title="经营场所面积 " :content="customerDetails.BusinessArea"></crmLabel>
          <crmLabel title="经营规模 " :content="customerDetails.BusinessScale"></crmLabel>
          <crmLabel title="技术情况 " :content="customerDetails.TechnicalSituation"></crmLabel>
          <crmLabel title="经营产品 " :content="customerDetails.BusinessProduction"></crmLabel>
          <crmLabel title="产品销售区域 " :content="customerDetails.ProductionSellArea "></crmLabel>
          <crmLabel title="经营我司产品 " :content="customerDetails.BusinessOwnerProduction"></crmLabel>
        </div>
      </van-tab>
      <van-tab title="客户动态">
        <div class="vanTabContentContainer" :style="{ height: tabContentHeight + 'px' }">
          <customerDynamic :customerId="customerId"></customerDynamic>
        </div>
      </van-tab>
      <van-tab title="相关资讯" disabled></van-tab>
    </van-tabs>
    <van-tabbar :zIndex="101">
      <van-tabbar-item class="bottomTabbarItem" @click="goCreateItem">
        <span slot="icon" class="icon iconfont icon-todo"></span>
        <span>创建事项</span>
      </van-tabbar-item>
      <van-tabbar-item class="bottomTabbarItem" @click="goVisitLocation">
        <span slot="icon" class="icon iconfont icon-yibiaopan"></span>
        <span>开始拜访</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style>
/* .van-tabs__content{
  position: absolute;
  top: 44px;
  bottom: 50px;
} */
</style>

<style scoped lang="less">
@import url(../../common.less);
#contentContainer {
  background-color: #f9f9f9;
  overflow-y: hidden;
}
.bottomTabbarItem {
  color: #3fcc8e;
}
.contactContent {
  margin: 4px 4px;
}
.contactContainer {
  margin: 8px 0px;
  .createHeader {
    height: 40px;
    background-color: #fff;
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
}
.noneContacts {
  padding: 10px 0px;
  text-align: center;
  & span {
    color: #757575;
    font-size: 12px;
  }
}
.contactTelephone {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.icon_iphone {
  color: #3fcc8e;
}
</style>

<script>
import CustomerDetails from "./customerDetails.ts";
export default CustomerDetails;
</script>
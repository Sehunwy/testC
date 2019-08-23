<template>
  <div>
    <el-form @submit.native.prevent :inline="true">
      <el-form-item label>
        <el-input
          v-model="keyword"
          placeholder="模糊查询"
          @keyup.enter.native="queryCustomer"
          clearable
          autofocus
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="queryCustomer">查询</el-button>
      <el-button type="success" @click="add">新增</el-button>
    </el-form>
    <div ref="form" v-show="isShowAddForm" class="form">
      <el-card>
        <div slot="header">
          <h1>新增客户</h1>
        </div>
        <el-form :model="editItem" label-width="100px" label-position="right">
          <el-row>
            <el-col :span="8">
              <el-form-item label="名称">
                <el-input v-model="editItem.Name" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="编码">
                <el-input v-model="editItem.Cd" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户简称">
                <el-input v-model="editItem.SimpleName" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="地址">
                <el-input v-model="editItem.Address" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标注地址">
                <el-input v-model="editItem.LocationDesc" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户等级">
                <el-input v-model="editItem.Level" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input v-model="editItem.Telephone" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="传真">
                <el-input v-model="editItem.Fax" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户行业分类">
                <el-input v-model="editItem.IndustryCategory" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户主要产品">
                <el-input v-model="editItem.MainProduction" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开发进度">
                <el-input v-model="editItem.DevelopProgress" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户账期">
                <el-input v-model="editItem.AccountPeriod" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户信用">
                <el-input v-model="editItem.CreditSituation" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="授信额度">
                <el-input v-model="editItem.CreditLine" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="合同约定">
                <el-input v-model="editItem.ContractAgreement" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="备注">
                <el-input v-model="editItem.Remark" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancelAdd">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <el-pagination
      :total="count"
      :current-page.sync="currentPage"
      :page-size="plimit"
      @current-change="page"
      layout="total,prev, pager, next"
    ></el-pagination>
    <el-table :data="dataList" v-loading="isbusy" max-height="600" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-tabs>
            <el-tab-pane label="客户联系人" name="first">客户联系人</el-tab-pane>
            <el-tab-pane label="收货信息" name="second">收货信息</el-tab-pane>
            <el-tab-pane label="客户详情" name="third">客户详情</el-tab-pane>
            <el-tab-pane label="经营信息" name="fourth">经营信息</el-tab-pane>
            <el-tab-pane label="其他" name="fifth">
              <span>{{ props.row }}</span>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="名称" prop="Name"></el-table-column>
      <el-table-column label="编码" prop="Cd"></el-table-column>
      <el-table-column label="简称" prop="SimpleName"></el-table-column>
      <!-- <el-table-column label="地址" prop="Address"></el-table-column> -->
      <!-- <el-table-column label="标注地址" prop="LocationDesc"></el-table-column> -->
      <el-table-column label="客户等级" prop="Level"></el-table-column>
      <el-table-column label="电话" prop="Telephone"></el-table-column>
      <el-table-column label="传真" prop="Fax"></el-table-column>
      <el-table-column label="管理公司" prop="ManagementCompany"></el-table-column>
      <el-table-column label="客户行业分类" prop="IndustryCategory"></el-table-column>
      <el-table-column label="客户主要产品" prop="MainProduction"></el-table-column>
      <el-table-column label="开发进度" prop="DevelopProgress"></el-table-column>
      <el-table-column label="客户账期" prop="AccountPeriod"></el-table-column>
      <el-table-column label="客户信用" prop="CreditSituation"></el-table-column>
      <el-table-column label="合同约定" prop="ContractAgreement"></el-table-column>
      <el-table-column label="客户规模" prop="BusinessScale"></el-table-column>
      <el-table-column label="竞品情况" prop="CompetitorSituation"></el-table-column>
      <el-table-column label="竞品分析" prop="CompetitorAnalysis"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
</style>

<script>
import Customer from "./customer.ts";
export default Customer;
</script>
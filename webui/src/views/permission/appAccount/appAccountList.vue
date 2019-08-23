<template>
  <div>
    <el-form @submit.native.prevent :inline="true">
      <el-form-item label>
        <el-input
          v-model="keyword"
          placeholder="模糊查询"
          @keyup.enter.native="queryAccountList"
          clearable
          autofocus
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="queryAccountList">查询</el-button>
      <el-button type="success" @click="add">新增</el-button>
    </el-form>
    <div ref="form" v-show="isShowAddForm" class="form">
      <el-card>
        <div slot="header">
          <h1>新增账户</h1>
        </div>
        <el-form
          :model="editItem"
          :rules="rules"
          ref="appAccountForm"
          label-width="100px"
          label-position="right"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="人员" prop="PersonId">
                <el-select
                  v-model="editItem.PersonId"
                  @change="selectPersonChanged"
                  filterable
                  placeholder="请选择"
                  size="medium"
                >
                  <el-option
                    v-for="item in personList"
                    :key="item.Id"
                    :label="item.Name"
                    :value="item.Id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话" prop="Telephone">
                <el-input v-model="editItem.Telephone" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="登录用户名" prop="SigninName">
                <el-input v-model="editItem.SigninName" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="密码" prop="Password">
                <el-input v-model="editItem.Password" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label>
            <el-button type="primary" @click="validate('appAccountForm')">保存</el-button>
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
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="姓名" prop="PersonName"></el-table-column>
      <el-table-column label="电话" prop="Telephone"></el-table-column>
      <el-table-column label="登录用户名" prop="SigninName"></el-table-column>
      <el-table-column label="登录设备" prop="SigninEquipment"></el-table-column>
      <el-table-column label="上次登录时间" prop="LastSigninTime"></el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleResetPassword(scope.$index, scope.row)"
          >重置密码</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
</style>

<script>
import AppAccountList from "./appAccountList.ts";
export default AppAccountList;
</script>
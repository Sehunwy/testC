<template>
  <div>
    <el-form @submit.native.prevent :inline="true">
      <el-form-item label>
        <el-input
          v-model="keyword"
          placeholder="模糊查询"
          @keyup.enter.native="queryEnterprise"
          clearable
          autofocus
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="queryEnterprise">查询</el-button>
      <el-button type="success" @click="add">新增</el-button>
    </el-form>
    <div ref="form" v-show="isShowAddForm" class="form">
      <el-card>
        <div slot="header">
          <h1>新增企业</h1>
        </div>
        <el-form :model="editItem" label-width="100px" label-position="right">
          <el-row>
            <el-col :span="8">
              <el-form-item label="名称">
                <el-input v-model="editItem.Name" placeholder="" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="编码">
                 <el-input v-model="editItem.Cd" placeholder="" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="控制码">
                 <el-input v-model="editItem.Ctrl" placeholder="" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="企业简称">
                <el-input v-model="editItem.SimpleName" placeholder="" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="地址">
                <el-input v-model="editItem.Address" placeholder="" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input v-model="editItem.Telephone" placeholder="" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="传真">
                <el-input v-model="editItem.Fax" placeholder="" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人">
                <el-input v-model="editItem.LegalPerson" placeholder="" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="">
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
    <el-table :data="data" v-loading="isbusy" max-height="600" style="width: 100%">
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <span>{{ props.row }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="#" type="index"></el-table-column>
      <!-- <el-table-column label="选择" type="selection"></el-table-column> -->
      <!-- <el-table-column label="主键" prop="Id"></el-table-column> -->
      <el-table-column label="名称" prop="Name"></el-table-column>
      <el-table-column label="编码" prop="Cd"></el-table-column>
      <el-table-column label="控制码" prop="Ctrl"></el-table-column>
      <el-table-column label="企业简称" prop="SimpleName"></el-table-column>
      <el-table-column label="地址" prop="Address"></el-table-column>
      <el-table-column label="电话" prop="Telephone"></el-table-column>
      <el-table-column label="传真" prop="Fax"></el-table-column>
      <el-table-column label="法人" prop="LegalPerson"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
</style>

<script>
import EnterpriseList from "./enterpriseList.ts";
export default EnterpriseList;
</script>
<template>
  <div>
    <el-form @submit.native.prevent :inline="true">
      <el-form-item label>
        <el-input
          v-model="keyword"
          placeholder="模糊查询"
          @keyup.enter.native="queryPerson"
          clearable
          autofocus
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="queryPerson">查询</el-button>
      <el-button type="success" @click="add">新增</el-button>
    </el-form>
    <div ref="form" v-show="isShowAddForm" class="form">
      <el-card>
        <div slot="header">
          <h1>新增人员</h1>
        </div>
        <el-form :model="editItem" label-width="100px" label-position="right">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input v-model="editItem.Name" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电话">
                <el-input v-model="editItem.Telephone" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱">
                <el-input v-model="editItem.Email" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="地址">
                <el-input v-model="editItem.Address" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别">
                <el-input v-model="editItem.Gender" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="部门">
                <el-select
                  v-model="editItem.DirectDeptId"
                  @change="selectDeptChanged"
                  filterable
                  placeholder="请选择"
                  size="medium"
                >
                  <el-option
                    v-for="item in deptList"
                    :key="item.Id"
                    :label="item.Name"
                    :value="item.Id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="职位">
                <el-input v-model="editItem.Title" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="销售人员">
                <el-checkbox
                  v-model="editItem.IsSalesPerson"
                  border
                  @change="isSalesPersonChanged"
                >是否为销售人员</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属片区">
                <el-select
                  v-model="editItem.SalesAreaId"
                  @change="selectSalesAreaChanged"
                  filterable
                  :disabled="!editItem.IsSalesPerson"
                  placeholder="请选择"
                  size="medium"
                >
                  <el-option
                    v-for="item in salesAreaList"
                    :key="item.Id"
                    :label="item.Name"
                    :value="item.Id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="可查看片区">
                <el-select
                  v-model="editItem.CanViewSaleAreas"
                  filterable
                  multiple
                  placeholder="请选择（可多选）"
                  size="medium"
                  style="width: 360px;"
                >
                  <el-option
                    v-for="item in salesAreaListAndAll"
                    :key="item.Id"
                    :label="item.Name"
                    :value="item.Id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="备注">
                <el-input v-model="editItem.Remark" placeholder clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="在职">
                <el-checkbox v-model="editItem.Incumbent" border>是否在职</el-checkbox>
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
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="姓名" prop="Name"></el-table-column>
      <el-table-column label="电话" prop="Telephone"></el-table-column>
      <el-table-column label="邮箱" prop="Email"></el-table-column>
      <!-- <el-table-column label="地址" prop="Address"></el-table-column>
      <el-table-column label="性别" prop="Gender"></el-table-column>-->
      <el-table-column label="是否在职" prop="Incumbent">
        <template slot-scope="scope">
          <span>{{ scope.row.Incumbent|formatIncumbent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="直属部门" prop="DirectDept"></el-table-column>
      <el-table-column label="职位" prop="Title"></el-table-column>
      <el-table-column label="所属片区" prop="SalesArea"></el-table-column>
      <el-table-column label="操作" min-width="90">
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
import Person from "./person.ts";
export default Person;
</script>
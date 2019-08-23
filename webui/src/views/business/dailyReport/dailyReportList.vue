<template>
  <div>
    <el-form @submit.native.prevent :inline="true">
      <el-form-item label>
        <el-input
          v-model="keyword"
          placeholder="模糊查询"
          @keyup.enter.native="queryDailyReportList"
          clearable
          autofocus
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="queryDailyReportList">查询</el-button>
    </el-form>
    <el-pagination
      :total="count"
      :current-page.sync="currentPage"
      :page-size="plimit"
      @current-change="page"
      layout="total,prev, pager, next"
    ></el-pagination>
    <el-table :data="dataList" v-loading="isbusy" max-height="600" style="width: 100%">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="创建时间" prop="CreateTime"></el-table-column>
      <el-table-column label="内容" prop="Content"></el-table-column>
      <el-table-column label="创建人" prop="PersonName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
</style>

<script>
import DailyReportList from "./dailyReportList.ts";
export default DailyReportList;
</script>
<template>
  <div>
    <el-form @submit.native.prevent :inline="true">
      <el-form-item label>
        <el-input
          v-model="keyword"
          placeholder="模糊查询"
          @keyup.enter.native="queryItemList"
          clearable
          autofocus
        ></el-input>
      </el-form-item>
      <el-button type="primary" @click="queryItemList">查询</el-button>
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
      <el-table-column label="创建人" prop="CreaterName"></el-table-column>
      <el-table-column label="事项名称" prop="Name"></el-table-column>
      <el-table-column label="客户名称" prop="CustomerName"></el-table-column>
      <el-table-column label="事项类型" prop="Type"></el-table-column>
      <el-table-column label="事项状态" prop="State"></el-table-column>
      <el-table-column label="事项等级" prop="Level"></el-table-column>
      <el-table-column label="分析" prop="Analyze"></el-table-column>
      <el-table-column label="下一步计划" prop="NextPlan"></el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="viewItemFlows(scope.$index, scope.row)"
          >查看事项流程</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="事项流程列表"
      :visible.sync="dialogTableVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table :data="itemFlowList" v-loading="viewItemFlowBusy" max-height="400">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="创建时间" prop="CreateTime"></el-table-column>
        <el-table-column label="创建人" prop="CreaterName"></el-table-column>
        <el-table-column label="描述" prop="Content"></el-table-column>
        <el-table-column label="分析" prop="Analyze"></el-table-column>
        <el-table-column label="下一步计划" prop="NextPlan"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeViewItemFlowDialog">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
</style>

<script>
import ItemList from "./itemList.ts";
export default ItemList;
</script>
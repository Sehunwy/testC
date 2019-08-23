<template>
  <el-container>
    <el-aside width="360px">
      <el-card class="box-card" style="min-height:680px">
        <div slot="header" class="clearfix">
          <span style="line-height:28px">人员列表</span>
          <el-input
            v-model="searchPerson"
            style="width:200px;float: right;"
            size="mini"
            placeholder="输入关键字搜索"
            clearable
          />
        </div>
        <el-table
          ref="singleTable"
          :data="personList.filter(data => !searchPerson || data.Name.toLowerCase().includes(searchPerson.toLowerCase()))"
          highlight-current-row
          @current-change="onSelectPerson"
          max-height="700"
          style="width: 100%"
        >
          <el-table-column property="Name" label="姓名"></el-table-column>
          <el-table-column property="Incumbent" label="是否在职">
            <template slot-scope="scope">
              <span>{{ scope.row.Incumbent|formatIncumbent }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-aside>
    <el-main>
      <el-card class="box-card" style="min-height:600px">
        <div slot="header" class="clearfix">
          <span style="line-height:28px">客户列表</span>
          <el-button
            style="float: right;"
            @click="openBindCustomerDialog"
            type="success"
            size="mini"
          >绑定客户</el-button>
        </div>
        <div>
          <el-input
            v-model="searchBindClient"
            size="mini"
            style="width:240px;"
            placeholder="输入关键字搜索"
            clearable
          />
          <span style="margin-left:10px;">共有{{personCustomList.length}}家客户</span>
        </div>
        <div>
          <el-table
            :data="personCustomList.filter(data => !searchBindClient || data.Name.toLowerCase().includes(searchBindClient.toLowerCase()))"
            v-loading="isbusy"
            max-height="600"
            style="width: 100%"
          >
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="名称" prop="Name"></el-table-column>
            <el-table-column label="简称" prop="SimpleName"></el-table-column>
            <el-table-column label="客户等级" prop="Level"></el-table-column>
            <el-table-column label="地址" prop="Address"></el-table-column>
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          title="绑定客户"
          :visible.sync="dialogTableVisible"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <div>
            <el-input
              v-model="searchUnBindClient"
              style="width:240px;"
              size="mini"
              placeholder="输入关键字搜索"
              clearable
            />
          </div>
          <el-table
            :data="unBindCustomList.filter(data => !searchUnBindClient || data.Name.toLowerCase().includes(searchUnBindClient.toLowerCase()))"
            @selection-change="onSelectedCustomerChange"
            max-height="400"
          >
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="名称" prop="Name"></el-table-column>
            <el-table-column label="编码" prop="Cd"></el-table-column>
            <el-table-column label="控制码" prop="Ctrl"></el-table-column>
            <el-table-column label="客户简称" prop="SimpleName"></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeBindCustomerDialog">取 消</el-button>
            <el-button type="primary" @click="bindCustomer">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped>
</style>

<script>
import RelPersonCustomer from "./relPersonCustomer.ts";
export default RelPersonCustomer;
</script>
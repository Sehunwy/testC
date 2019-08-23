<template>
  <el-container>
    <el-aside width="680px">
      <el-card class="box-card" style="min-height:600px">
        <div slot="header" class="clearfix">
          <span style="line-height:28px">数据字典项</span>
          <el-form @submit.native.prevent :inline="true" style="float: right;">
            <el-form-item label>
              <el-input
                v-model="keyword"
                placeholder="模糊查询"
                @keyup.enter.native="queryDatas"
                clearable
                autofocus
                size="mini"
                style="width:180px;"
              ></el-input>
            </el-form-item>
            <el-button type="primary" size="mini" @click="queryDatas">查询</el-button>
            <el-button type="success" size="mini" @click="createDictionary">新增字典项</el-button>
          </el-form>
        </div>
        <el-table
          ref="singleTable"
          :data="dataList"
          highlight-current-row
          v-loading="isbusy"
          @current-change="onSelectChanged"
          max-height="600"
          style="width: 100%"
        >
          <el-table-column property="Name" label="名称"></el-table-column>
          <el-table-column property="Cd" label="编码"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="新增或编辑字典项"
          :visible.sync="dialogDictionaryItemVisible"
          :show-close="false"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <el-form
            :model="editData"
            ref="dictionaryItemForm"
            :rules="rules"
            label-width="100px"
            label-position="right"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="名称" prop="Name">
                  <el-input v-model="editData.Name" placeholder clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="编码" prop="Cd">
                  <el-input v-model="editData.Cd" placeholder clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeDictionaryItemDialog">取 消</el-button>
            <el-button type="primary" @click="validate('dictionaryItemForm')">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </el-aside>
    <el-main>
      <el-card class="box-card" style="min-height:600px">
        <div slot="header" class="clearfix">
          <span style="line-height:28px">默认值</span>
          <el-form @submit.native.prevent :inline="true" style="float: right;">
            <el-button type="success" size="mini" @click="createDictionaryValue">新增默认值</el-button>
            <el-button type="success" size="mini" @click="saveDictionaryValue">保存</el-button>
          </el-form>
        </div>
        <div>
          <div
              v-for="(dvalue,index) in currentDataValues"
              :key="index"
              style="margin-bottom:8px;"
            >
              <el-row>
                <el-col :span="8">
                  <el-input size="mini" v-model="currentDataValues[index]" placeholder clearable></el-input>
                </el-col>
                <el-col :span="8">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="confirmDeleteDictionaryValue(index)"
                    style="margin-left:8px;"
                  >删除</el-button>
                </el-col>
              </el-row>
            </div>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped>
</style>

<script>
import DictionaryTemplate from "./dictionaryTemplate.ts";
export default DictionaryTemplate;
</script>
<template>
  <el-container>
    <el-aside width="360px">
      <el-card class="box-card" style="min-height:600px">
        <div slot="header" class="clearfix">
          <span style="line-height:28px">销售片区</span>
          <el-button @click="createRootData" type="success" style="float: right;" size="mini">新增根节点</el-button>
        </div>
        <el-tree
          :data="treeDatas"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
          :expand-on-click-node="false"
          @current-change="selectChanged"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click.stop="() => append(data)">新增</el-button>
              <el-button type="text" size="mini" @click.stop="() => confirmRemove(data)">删除</el-button>
            </span>
          </span>
        </el-tree>
      </el-card>
    </el-aside>
    <el-main>
      <el-card class="box-card" style="min-height:600px">
        <div slot="header" class="clearfix">
          <span style="line-height:28px">详细信息</span>
        </div>
        <div class="form">
          <el-card>
            <el-form
              :model="currentData"
              ref="salesAreaDetailForm"
              :rules="rules"
              label-width="100px"
              label-position="right"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="上级片区" prop="ParentName">
                    <el-input v-model="currentData.ParentName" placeholder :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="片区名称" prop="Name">
                    <el-input v-model="currentData.Name" placeholder clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="片区编码" prop="Cd">
                    <el-input v-model="currentData.Cd" placeholder clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="控制码" prop="Ctrl">
                    <el-input v-model="currentData.Ctrl" placeholder clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="片区层级" prop="Level">
                    <el-input v-model="currentData.Level" placeholder :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="片区负责人">
                    <el-select v-model="currentData.AreaHeaders" filterable multiple placeholder="请选择（可多选）" size="medium" style="width: 360px;">
                      <el-option
                        v-for="item in personList"
                        :key="item.Id"
                        :label="item.Name"
                        :value="item.Id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="备注">
                    <el-input v-model="currentData.Remark" placeholder clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label>
                <el-button type="primary" @click="validate('salesAreaDetailForm')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

<script>
import SalesArea from "./salesArea.ts";
export default SalesArea;
</script>
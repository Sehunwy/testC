<template>
  <el-container>
    <el-aside width="360px">
      <el-card class="box-card" style="min-height:600px">
        <div slot="header" class="clearfix">
          <span style="line-height:28px">组织结构</span>
          <!-- <el-button style="float: right;" size="mini" icon="el-icon-edit" circle></el-button> -->
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
          <el-form
            :model="currentData"
            ref="organizationDetailForm"
            :rules="rules"
            label-width="100px"
            label-position="right"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item label="上级部门" prop="ParentName">
                  <el-input v-model="currentData.ParentName" placeholder :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="部门名称" prop="Name">
                  <el-input v-model="currentData.Name" placeholder clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="部门编码" prop="Cd">
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
                <el-form-item label="部门层级" prop="Level">
                  <el-input v-model="currentData.Level" placeholder :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="部门负责人">
                  <el-select
                    v-model="currentData.DeptHeaders"
                    filterable
                    multiple
                    placeholder="请选择（可多选）"
                    size="medium"
                    style="width: 360px;"
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
            </el-row>
            <!-- <el-row>
              <el-col :span="16">
                <el-form-item label="部门岗位">
                  <el-select
                    v-model="currentData.DeptTitles"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请配置部门岗位"
                  >
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input v-model="currentData.Remark" placeholder clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label>
              <el-button type="primary" @click="validate('organizationDetailForm')">保存</el-button>
            </el-form-item>
          </el-form>
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
import Organization from "./organization.ts";
export default Organization;
</script>
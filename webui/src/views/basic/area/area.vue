<template>
  <el-container>
    <el-aside width="420px">
      <el-card class="box-card" style="min-height:600px">
        <div slot="header" class="clearfix">
          <span style="line-height:28px">省市区</span>
          <el-button @click="createRootData" type="success" style="float: right;" size="mini">新增根节点</el-button>
        </div>
        <el-tree
          :data="treeDatas"
          v-loading="isbusy"
          show-checkbox
          node-key="id"
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
          <!-- <el-button style="float: right;" size="mini" icon="el-icon-edit" circle></el-button> -->
        </div>
        <div class="form">
          <el-card>
            <el-form
              :model="currentData"
              ref="areaDetailForm"
              :rules="rules"
              label-width="100px"
              label-position="right"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="父级编码" prop="ParentCd">
                    <el-input v-model="currentData.ParentCd" placeholder :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="名称" prop="Name">
                    <el-input v-model="currentData.Name" placeholder clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="编码" prop="Cd">
                    <el-input v-model="currentData.Cd" placeholder clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label>
                <el-button type="primary" @click="validate('areaDetailForm')">保存</el-button>
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
import Area from "./area.ts";
export default Area;
</script>
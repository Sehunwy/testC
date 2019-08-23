<template>
  <div>
    <el-row type="flex" justify="center" :gutter="20">
      <el-col style="margin-left:20px" :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>组织结构</span>
          </div>
          <el-tree
            :data="data5"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click="() => append(data)">新增</el-button>
                <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>详细信息</span>
          </div>
          <el-row class="fontDetailed">
            <el-col :span="3">
              <div>上级部门</div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-input></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="fontDetailed">
            <el-col :span="3">
              <div>部门名称</div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-input ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="fontDetailed">
            <el-col :span="3">
              <div>部门编码</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input ></el-input>
              </div>
            </el-col>
            <el-col style="padding-left:36px" :span="4">
              <div>控制码</div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-input ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="fontDetailed">
            <el-col :span="3">
              <div class="required">部门层级</div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-input></el-input>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.row-bg {
  margin-left: 20px;
}
.bg-purple {
  background-color: aqua;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  min-height: 400px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.fontDetailed {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 10px 0;
}


</style>

<script>
import OrganizationalStructure from "./organizationalStructure.ts";
export default OrganizationalStructure;
</script>
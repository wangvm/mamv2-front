<template>
  <el-container>
    <el-header>
      <el-button type="primary" @click="addProject">新建项目</el-button
      >
    </el-header>
    <el-main>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="项目名称"></el-table-column>
        <el-table-column prop="leaderName" label="项目负责人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="项目状态"></el-table-column>
      </el-table>
    </el-main>
    <el-footer>Footer</el-footer>
    <el-dialog
      title="创建项目"
      :visible.sync="dialogVisible"
      width="25%"
    >
      <el-form :model="projectForm" label-width="70px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" prop="leaderName">
          <el-input v-model="projectForm.leaderName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="projectForm.createTime"></el-input>
        </el-form-item>
        <el-form-item label="项目状态" prop="status">
          <el-input v-model="projectForm.status"></el-input>
        </el-form-item>
        <el-form-item class="form-button">
          <el-button type="primary" @click="submitForm('projectForm')">提交</el-button>
          <el-button @click="resetForm('projectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "project",
  data() {
    return {
      ...mapState('common',['username', 'account']),
      dialogVisible: false,
      projectForm: {
        name: "",
        leader: "",
        leaderName: "",
        createTime: "",
        status: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
        },
      ],
    };
  },
  methods: {
    addProject(){
      this.dialogVisible = true;
      this.leader = this.account;
      this.leaderName = this.username;
      this.createTime = new Date();
      this.status = '创建中'
    },
  },
};
</script>

<style lang="less" scoped>
</style>
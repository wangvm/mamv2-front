<template>
  <el-container>
    <el-header>
      <el-button type="primary" @click="addProject">新建项目</el-button>
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
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="1"
      >
      </el-pagination>
    </div>
    <!-- 添加项目表单 -->
    <el-dialog title="创建项目" :visible.sync="dialogVisible" width="25%">
      <el-form :model="projectForm" :rules="projectRules" ref="projectForm" label-width="100px">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="projectForm.name"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" prop="leaderName">
          <el-input :value="projectForm.leaderName" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input
            :value="new Date(projectForm.createTime).toLocaleString()"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="项目状态" prop="status">
          <el-input :value="projectForm.status" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('projectForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('projectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import $api from "@/network/api";

export default {
  name: "project",
  data() {
    return {
      // 当前分页页数
      currentPage: 1,
      // 控制添加项目浮窗显示
      dialogVisible: false,
      // 添加项目表单数据
      projectForm: {
        name: "",
        leader: "",
        leaderName: "",
        createTime: "",
        status: "",
      },
      // 添加项目的验证规则
      projectRules: {
        name: [
          { required: true, message: "请输入项目名称" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
      // 项目列表数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
        },
      ],
    };
  },
  computed: {
    ...mapState("common", ["username", "account"]),
    // 创建时间的时间戳转化为时间
    createTime() {
      return new Date(this.projectForm.createTime).toLocaleString();
    },
  },
  methods: {
    // 打开添加项目浮窗，初始化数据
    addProject() {
      this.dialogVisible = true;
      this.projectForm.leader = this.account;
      this.projectForm.leaderName = this.username;
      this.projectForm.createTime = new Date().getTime();
      this.projectForm.status = "创建中";
    },
    // 控制分页切换逻辑
    handleCurrentChange() {
      // todo 请求后端拿去数据

      this.currentPage += 1;
    },
    // 验证规则并提交创建项目数据
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $api.queryProjectList();
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    // 重置
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
}
</style>
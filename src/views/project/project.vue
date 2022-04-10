<template>
  <el-container>
    <BaseHeader >
      <template v-slot:right>
        <el-button type="primary" @click="addProject" >新建项目</el-button>
      </template>
    </BaseHeader>
    <el-main>
      <el-table :data="tableData" stripe :style="{width:100+'%'}">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="项目名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" v-show="scope.row.isEdit" autofocus=true size='mini'></el-input>
            <span v-show="!scope.row.isEdit">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="leaderName" label="项目负责人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="项目状态"></el-table-column>
        <el-table-column label="" min-width="100%">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">{{scope.row.isEdit?'保存':'编辑'}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="enterProject(scope.row)">进入项目</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="5"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-footer>
    <!-- 添加项目表单 -->
    <el-dialog title="创建项目" :visible.sync="dialogVisible" width="400px">
      <el-form
        :model="projectForm"
        :rules="projectRules"
        ref="projectForm"
        label-width="100px"
      >
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
          <el-button type="primary" @click="submitForm('projectForm')">提交</el-button>
          <el-button @click="resetForm('projectForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import $api from "@/network/api";
import { message } from "@/assets/js/message";
import BaseHeader from "@/components/BaseHeader.vue";

export default {
  name: "project",
  components:{
    BaseHeader
  },
  data() {
    return {
      // 是否显示操作按钮
      isDisplay: "none",
      // 当前分页页数
      currentPage: 1,
      // 查询的总数
      total: 0,
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
      tableData: [],
    };
  },
  computed: {
    ...mapState("common", ["username", "account", "currentProjectPage"]),
    // 创建时间的时间戳转化为时间
    createTime() {
      return new Date(this.projectForm.createTime).toLocaleString();
    },
  },
  methods: {
    handleEdit(row){
      if(row.isEdit){
        this.updateProjectName(row.id, row.name)
      }
      row.isEdit = !row.isEdit;
    },
    async updateProjectName(id, name){
      // 保存数据到后端
      let res = await $api.updateProjectName(id, name)
      if(res.code === 200){
        this.getProjectData();
      }else{
        message.error(res.message)
      }
    },
    async handleDelete(index, row){
      let res = await $api.deleteProject(row.id)
      if(res.code === 200){
        this.getProjectData();
      }else{
        message.error(res.message)
      }
    },
    async enterProject(row){
      // 保存currentProject数据和当前页数currentPage
      this.$store.commit("common/updateProjectInfo", {currentPage:this.currentPage, id:row.id, name:row.name})
      this.$router.push("/manage/task");
    },
    // 打开添加项目浮窗，初始化数据
    // TODO 添加权限验证
    addProject() {
      this.dialogVisible = true;
      this.projectForm.leader = this.account;
      this.projectForm.leaderName = this.username;
      this.projectForm.createTime = new Date().getTime();
      this.projectForm.status = "创建中";
    },
    // 控制分页切换逻辑
    handleCurrentChange() {
      this.getProjectData();
      this.$store.commit("storedProjectPage",this.currentPage);
    },
    // 验证规则并提交创建项目数据
    // 添加权限验证
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            let res = await $api.addProject(this.projectForm);
            if (res.code === 200) {
              this.dialogVisible = false;
              this.projectForm = {
                name: "",
                leader: "",
                leaderName: "",
                createTime: "",
                status: "",
              };
              this.getProjectData();
            } else {
              message.error(res.message);
            }
          } catch (e) {
            this.$catch = e;
          }
        } else {
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 从后端获取数据
    async getProjectData(
      status = 0,
      order = "createTime",
      isAsc = 0,
      pageSize = 5
    ) {
      try {
        let res = await $api.queryProjectList(
          status,
          order,
          isAsc,
          this.currentPage,
          pageSize
        );
        if (res.code === 200) {
          // 展示之前做处理，添加index和status
          let start = (this.currentPage - 1) * pageSize + 1;
          res.data.records.map((record) => {
            // 插入index
            record.index = start++;
            // 插入status
            if (record.finishedTask === record.taskCount && record.finishedTask > 0) {
              record.status = "已完成";
            } else {
              record.status = "进行中";
            }
            record.isEdit = false;
            // 转换时间戳
            record.createTime = new Date(record.createTime).toLocaleString();
            return record;
          });
          this.tableData = res.data.records;
          this.total = res.data.total;
        } else {
          message.error(res.message);
        }
      } catch (e) {
        message.error(e);
      }
    },
  },
  mounted: async function () {
    this.currentPage = this.currentProjectPage;
    this.getProjectData();
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
}
</style>
<template>
  <div>
    <BaseHeader>
      <template v-slot:left>
        <el-button type="primary" @click="back">返回</el-button>
      </template>
      <template v-slot:right>
        <el-button type="primary" @click="addTask">新建任务</el-button>
      </template>
    </BaseHeader>
    <el-main>
      <el-table :data="tableData" stripe :style="{ width: 100 + '%' }">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="任务名称">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              v-show="scope.row.isEdit"
              autofocus="true"
              size="mini"
            ></el-input>
            <span v-show="!scope.row.isEdit">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="catalogerName" label="编目员"></el-table-column>
        <el-table-column prop="auditorName" label="审核员"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="项目状态"></el-table-column>
        <el-table-column label="" min-width="100%">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">{{
              scope.row.isEdit ? "保存" : "编辑"
            }}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button size="mini" type="primary" @click="enterTask(scope.row)"
              >进入任务</el-button
            >
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
    <el-dialog title="创建任务" :visible.sync="dialogVisible" width="500px" destroy-on-close>
      <el-form
        :model="taskForm"
        :rules="taskRules"
        ref="taskForm"
        label-width="100px"
        :style="{width: 400 + 'px'}"
      >
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="taskForm.name"></el-input>
        </el-form-item>
        <el-form-item label="归属项目" prop="projectName">
          <el-input :value="taskForm.projectName" disabled></el-input>
        </el-form-item>
        <el-form-item label="编目员" prop="catalogerName">
          <el-autocomplete
            v-model="taskForm.catalogerName"
            :fetch-suggestions="queryCatalogers"
            placeholder="查询编目员"
            @select="handleSelectCataloger"
            :style="{width: 300 + 'px'}"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="审核员" prop="auditorName">
          <el-autocomplete
            v-model="taskForm.auditorName"
            :fetch-suggestions="queryAuditors"
            placeholder="查询审核员"
            @select="handleSelectAuditor"
            :style="{width: 300 + 'px'}"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="视频">
          <el-autocomplete
            v-model="videoInfo.fileName"
            :fetch-suggestions="queryVideo"
            placeholder="搜索视频"
            @select="handleSelectVideo"
            :style="{width: 300 + 'px'}"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input
            :value="new Date(taskForm.createTime).toLocaleString()"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="项目状态" prop="status">
          <el-input :value="taskForm.status" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('taskForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('taskForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import $api from "@/network/api";
import { message } from "@/assets/js/message";
import BaseHeader from "@/components/BaseHeader.vue";
import { mapState, mapActions} from "vuex";
export default {
  name: "task",
  components: {
    BaseHeader,
  },
  data() {
    return {
      // 是否显示操作按钮
      isDisplay: "none",
      // 当前分页页数
      currentPage: 1,
      // 查询的总数
      total: 0,
      // 控制添加任务浮窗显示
      dialogVisible: false,
      // 添加任务表单数据
      taskForm: {
        name: "",
        project: null,
        projectName: "",
        cataloger: null,
        catalogerName: "",
        auditor: null,
        auditorName: "",
        createTime: "",
        status: "",
      },
      videoInfo: {
        fileName:"",
        aspectRatio:"",
        duration:0,
        frameRate:0,
        address:"",
        audioChannel:0
      },
      // 添加任务表单验证规则
      taskRules: {
        name: [
          { required: true, message: "请输入任务名称" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        catalogerName: [{ required: true, message: "请指定编目员" }],
        auditorName: [{ required: true, message: "请指定编目员" }],
      },
      // 任务列表数据
      tableData: [],
    };
  },
  computed: {
    // 创建时间的时间戳转化为时间
    ...mapState("common", ["currentProject", "currentTaskPage"]),
    createTime() {
      return new Date(this.taskForm.createTime).toLocaleString();
    },
  },
  methods: {
    ...mapActions("common", ["getVideoInfoAction"]),
    // back返回项目管理页面
    back() {
      this.$router.push("/manage/project");
    },
    // @see: https://element.eleme.cn/#/zh-CN/component/input#yuan-cheng-sou-suo
    // 从服务器查询编目员
    async queryCatalogers(queryString, cb) {
      try {
        if (queryString) {
          let res = await $api.queryCatalogerByName(queryString);
          if (res.code === 200 && res.data.length !== 0) {
            res.data.map((record) => {
              record.value = record.username + "(" + record.account + ")";
            });
            cb(res.data);
          } else {
            message.error(res.message);
          }
        }
      } catch (e) {
        message.error(e.message);
      }
    },
    // 从服务器查询审核员
    async queryAuditors(queryString, cb) {
      try {
        if (queryString) {
          let res = await $api.queryAuditorByName(queryString);
          if (res.code === 200 && res.data.length !== 0) {
            res.data.map((record) => {
              record.value = record.username + "(" + record.account + ")";
            });
            cb(res.data);
          } else {
            message.error(res.message);
          }
        }
      } catch (e) {
        message.error(e.message);
      }
    },
    // 搜索视频
    async queryVideo(queryString, cb){
      try{
        if(queryString){
          let res = await $api.searchVideoByName(queryString);
          if (res.code === 200 && res.data.length !== 0) {
            res.data.map((record) => {
              record.value = record.fileName;
            });
            console.log(res)
            cb(res.data);
          } else {
            message.error(res.data.length===0?"未搜索到视频":res.message);
          }
        }
      } catch (e) {
        message.error(e.message);
      }
    },
    handleSelectCataloger(item) {
      // 选择编目员操作
      this.taskForm.cataloger = parseInt(item.account);
      this.taskForm.catalogerName = item.username;
    },
    handleSelectAuditor(item) {
      // 选择审核员操作
      this.taskForm.auditor = parseInt(item.account);
      this.taskForm.auditorName = item.username;
    },
    handleSelectVideo(item) {
      // 选择视频操作
      console.log("item",item)
      this.videoInfo = item;
      console.log("videoInfo", this.videoInfo);
    },
    // 验证规则并提交创建项目数据
    // 添加权限验证
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.taskForm.status = 0;
            let res = await $api.addTask({taskInfo:this.taskForm, videoInfo:this.videoInfo});
            if (res.code === 200) {
              this.dialogVisible = false;
              this.taskForm = {
                name: "",
                project: null,
                projectName: "",
                cataloger: null,
                catalogerName: "",
                auditor: null,
                auditorName: "",
                createTime: "",
                status: "",
              };
              this.videoInfo = {
                fileName:"",
                aspectRatio:"",
                duration:0,
                frameRate:0,
                address:"",
                audioChannel:0
              };
              this.getTaskData();
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
    // 更新操作
    handleEdit(row) {
      if (row.isEdit) {
        // 删除不必要的信息，如deleted，index，转换status
        let {deleted, isEdit, index,...record} = row
        switch (record.status) {
          case "创建":
            record.status = 0;
            break;
          case "编目中":
            record.status = 1;
            break;
          case "审核中":
            record.status = 2;
            break;
          case "完成":
            record.status = 3;
            break;
          default:
            record.status = "error";
            break;
        }
        record.createTime = new Date(row.createTime).getTime();
        this.updateTaskInfo(record);
      }
      row.isEdit = !row.isEdit;
    },
    async updateTaskInfo(record) {
      // 保存数据到后端
      let res = await $api.updateTaskInfo(record);
      if (res.code === 200) {
        this.getTaskData();
      } else {
        message.error(res.message);
      }
    },
    // 删除操作
    async handleDelete(row) {
      let res = await $api.deleteTask(row.id);
      if (res.code === 200) {
        this.getTaskData();
      } else {
        message.error(res.message);
      }
    },
    // 进入编目操作
    async enterTask(row) {
      // 等待编目界面完成
      // 获取并视频信息
      this.getVideoInfoAction(row.id)
      // 保存当前任务信息
      this.$store.commit("common/storedTaskInfo", {
        currentPage: this.currentPage,
        id: row.id,
        name: row.name,
      });
      this.$router.push("/catalog/edit");
    },
    // 打开添加项目浮窗，初始化数据
    // TODO 添加权限验证
    addTask() {
      this.dialogVisible = true;
      this.taskForm.project = this.currentProject.id;
      this.taskForm.projectName = this.currentProject.name;
      this.taskForm.createTime = new Date().getTime();
      this.taskForm.status = "创建中";
    },
    // 控制分页切换逻辑
    handleCurrentChange() {
      this.getTaskData();
      this.$store.commit("storedTaskPage",this.currentPage);
    },
    // 从后端获取数据
    async getTaskData() {
      try {
        let res = await $api.queryTaskByProject(this.currentProject.id);
        if (res.code === 200) {
          // 展示之前做处理，添加index和status
          if (res.data === null) return;
          let start = (this.currentPage - 1) * 5 + 1;
          res.data.records.map((record) => {
            // 插入index
            record.index = start++;
            // 插入status
            switch (record.status) {
              case 0:
                record.status = "创建";
                break;
              case 1:
                record.status = "编目中";
                break;
              case 2:
                record.status = "审核中";
                break;
              case 3:
                record.status = "完成";
                break;
              default:
                record.status = "error";
                break;
            }
            record.isEdit = false;
            // 转换时间戳
            record.createTime = new Date(record.createTime).toLocaleString();
            return record;
          });
          this.tableData = res.data.records ? res.data.records : [];
          this.total = res.data.total;
        } else {
          message.error(res.message);
        }
      } catch (e) {
        message.error(e.message);
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted: async function () {
    this.currentPage = this.currentTaskPage;
    this.getTaskData();
  },
};
</script>

<style>
.pagination {
  text-align: center;
}
</style>
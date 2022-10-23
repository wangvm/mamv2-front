<template>
  <div>
    <BaseHeader>
      <template v-slot:right>
        <el-button type="primary" @click="addTask" :disabled="!manageMode"
          >新建任务</el-button
        >
      </template>
    </BaseHeader>
    <el-main>
      <el-table :data="tableData" stripe :style="{ width: 100 + '%' }">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="taskName" label="任务名称">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.taskName"
              v-show="scope.row.isEdit"
              autofocus
              size="mini"
            ></el-input>
            <span v-show="!scope.row.isEdit">{{ scope.row.taskName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cataloger.username"
          label="编目员"
        ></el-table-column>
        <el-table-column
          prop="auditor.username"
          label="审核员"
        ></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="status" label="项目状态"></el-table-column>
        <el-table-column label="" min-width="100%">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
              v-show="manageMode"
              >{{ scope.row.isEdit ? "保存" : "编辑" }}</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-show="manageMode"
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
    <el-dialog
      title="创建任务"
      :visible.sync="dialogVisible"
      width="500px"
      destroy-on-close
    >
      <el-form
        :model="taskForm"
        :rules="taskRules"
        ref="taskForm"
        label-width="100px"
        :style="{ width: 400 + 'px' }"
      >
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="taskForm.taskName"></el-input>
        </el-form-item>
        <el-form-item label="编目员" prop="catalogerName">
          <el-autocomplete
            v-model="taskForm.catalogerName"
            :fetch-suggestions="queryCatalogers"
            placeholder="查询编目员"
            @select="handleSelectCataloger"
            :style="{ width: 300 + 'px' }"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="审核员" prop="auditorName">
          <el-autocomplete
            v-model="taskForm.auditorName"
            :fetch-suggestions="queryAuditors"
            placeholder="查询审核员"
            @select="handleSelectAuditor"
            :style="{ width: 300 + 'px' }"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="视频">
          <el-autocomplete
            v-model="videoInfo.fileName"
            :fetch-suggestions="queryVideo"
            placeholder="搜索视频"
            @select="handleSelectVideo"
            :style="{ width: 300 + 'px' }"
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
import API from "@/network/api";
import { message } from "@/assets/js/message";
import BaseHeader from "@/components/BaseHeader.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import LoadSelect from "@/components/LoadSelect.vue";

export default {
  name: "task",
  components: {
    BaseHeader,
  },
  data() {
    return {
      selected: "",
      page: 1,
      testOptions: [],
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
        taskName: "",
        catalogerId: null,
        catalogerName: "",
        auditorId: null,
        auditorName: "",
        createTime: "",
        videoInfoId: null,
        status: "",
      },
      videoInfo: {
        fileName: "",
        aspectRatio: "",
        duration: 0,
        frameRate: 0,
        address: "",
        audioChannel: 0,
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
    ...mapState("common", ["currentTaskPage", "authority", "account"]),
    createTime() {
      return new Date(this.taskForm.createTime).toLocaleString();
    },
    manageMode() {
      return this.authority === "ROLE_ADMIN";
    },
  },
  methods: {
    ...mapMutations("common", ["setVideoInfo", "storedTaskInfo"]),
    getData() {
      // 输出页数
      console.log(this.page);
      // 访问后端接口API
      return new Promise((resolve) => {
        // 访问后端接口API
        this.requestAPI({ page: this.page }).then((res) => {
          this.testOptions = [...this.testOptions, ...res.result];
          this.page = res.page;
          resolve();
        });
      });
    },
    requestAPI({ page = 1, size = 10 } = {}) {
      return new Promise((resolve) => {
        let responseData = [];
        // 假设总共的数据有50条
        let total = 50;
        for (let index = 1; index <= size; index++) {
          // serial：处于第几个元素，就显示多少序号
          let serial = index + (page - 1) * size;
          if (serial <= 50) {
            responseData.push({
              label: serial,
              value: serial,
            });
          }
        }
        page += 1;
        // 模拟异步请求，500ms之后返回接口的数据
        setTimeout(() => {
          resolve({
            total,
            page,
            size,
            result: responseData,
          });
        }, 500);
      });
    },
    // 从服务器查询编目员
    async queryCatalogers(queryString, cb) {
      if (queryString) {
        let res = await API.queryCatalogerByName(queryString);
        if (res.code === 200 && res.data.length !== 0) {
          res.data.map((record) => {
            record.value = record.username + "(" + record.account + ")";
          });
          cb(res.data);
        } else {
          message.error(res.message);
        }
      }
    },
    // 从服务器查询审核员
    async queryAuditors(queryString, cb) {
      if (queryString) {
        let res = await API.queryAuditorByName(queryString);
        if (res.code === 200 && res.data.length !== 0) {
          res.data.map((record) => {
            record.value = record.username + "(" + record.account + ")";
          });
          cb(res.data);
        } else {
          message.error(res.message);
        }
      }
    },
    // 搜索视频
    async queryVideo(queryString, cb) {
      if (queryString) {
        let res = await API.searchVideoByName(queryString);
        if (res.code === 200 && res.data.length !== 0) {
          res.data.map((record) => {
            record.value = record.fileName;
          });
          cb(res.data);
        } else {
          this.$throw(res);
          message.error(res.data.length === 0 ? "未搜索到视频" : res.message);
        }
      }
    },
    handleSelectCataloger(item) {
      // 选择编目员操作
      this.taskForm.catalogerId = parseInt(item.userId);
      this.taskForm.catalogerName = item.username;
    },
    handleSelectAuditor(item) {
      // 选择审核员操作
      this.taskForm.auditorId = parseInt(item.userId);
      this.taskForm.auditorName = item.username;
    },
    handleSelectVideo(item) {
      this.taskForm.videoInfoId = item.id;
      // 选择视频操作
      this.videoInfo = item;
    },
    // 验证规则并提交创建项目数据
    // 添加权限验证
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await API.addTask(this.taskForm);
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
              fileName: "",
              aspectRatio: "",
              duration: 0,
              frameRate: 0,
              address: "",
              audioChannel: 0,
            };
            this.getTaskData();
          } else {
            this.$throw(res);
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
        let { deleted, isEdit, index, ...record } = row;
        record.createTime = new Date(row.createTime).getTime();
        this.updateTaskInfo(record);
      }
      row.isEdit = !row.isEdit;
    },
    async updateTaskInfo(record) {
      // 保存数据到后端
      let res = await API.updateTaskInfo(record);
      if (res.code === 200) {
        this.getTaskData();
      } else {
        this.$throw(res);
      }
    },
    // 删除操作
    async handleDelete(row) {
      let res = await API.deleteTask(row.taskId);
      if (res.code === 200) {
        this.getTaskData();
      } else {
        this.$throw(res);
      }
    },
    // 进入编目操作
    async enterTask(row) {
      // 等待编目界面完成
      // 获取并视频信息
      // 修改接口实现获取视频信息
      let res = await API.getVideoInfo(row.id);
      if (res.code === 200) {
        this.setVideoInfo(res.data);
      } else {
        this.$throw(res);
      }
      // 保存当前任务信息
      this.storedTaskInfo({
        currentPage: this.currentPage,
        id: row.id,
        name: row.name,
        status: row.status,
      });
      this.$router.push({ path: "/catalog/edit", query: { task: row.id } });
    },
    // 控制分页切换逻辑
    handleCurrentChange() {
      this.getTaskData();
      this.$store.commit("storedTaskPage", this.currentPage);
    },
    // 打开添加项目浮窗，初始化数据
    addTask() {
      this.dialogVisible = true;
      this.taskForm.createTime = new Date().getTime();
      this.taskForm.status = "编目中";
    },

    // 从后端获取数据
    async getTaskData() {
      let res;
      if (this.manageMode) {
        res = await API.queryTask(this.currentPage, 5);
      } else {
        res = await API.queryTaskByUser(this.account);
      }
      if (res.code === 200) {
        // 展示之前做处理，添加index和status
        if (res.data === null) return;
        let start = (this.currentPage - 1) * 5 + 1;
        res.data.records.map((record) => {
          // 插入index
          record.index = start++;
          record.isEdit = false;
          // 转换时间戳
          record.createTime = new Date(record.createTime).toLocaleString();
          return record;
        });
        this.tableData = res.data.records ? res.data.records : [];
        this.total = res.data.total;
      } else {
        this.$throw(res);
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
  beforeRouteLeave(to, from, next) {
    if (to.name === "editCatalog") {
      this.getProgramData(to.query.task);
    }
    next();
  },
};
</script>

<style>
.pagination {
  text-align: center;
}
</style>
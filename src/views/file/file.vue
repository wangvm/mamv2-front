<template>
  <el-container>
    <BaseHeader>
      <template v-slot:right>
        <el-button type="primary" @click="dialogVisible = true"
          >上传文件</el-button
        >
      </template>
    </BaseHeader>
    <el-main>
      <el-table :data="tableData" stripe :style="{ width: 100 + '%' }">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="fileName" label="文件名"></el-table-column>
        <el-table-column
          prop="time"
          label="时长(时:分:秒:帧)"
        ></el-table-column>
        <el-table-column prop="frameRate" label="帧率"></el-table-column>
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
    <!-- 上传文件 -->
    <el-dialog :visible.sync="dialogVisible" width="450px" destroy-on-close>
      <el-upload
        class="upload-demo"
        action="#"
        drag
        accept="video/mp4"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :http-request="handleUpload"
        with-credentials
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传mp4文件，且不超过500M
        </div>
      </el-upload>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import Api from "@/network/api";
import { message } from "@/assets/js/message";
import BaseHeader from "@/components/BaseHeader.vue";
import Config from "@/config/common.config";
import timeFormat from "@/utils/timeFormat";

export default {
  name: "file",
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
      // 控制上传文件浮窗显示
      dialogVisible: false,
      // 文件列表数据
      tableData: [],
      // 上传文件url
      uploadAction: "http://mams.cuz.edu.cn/api" + "/file/upload/video",
      fileList: [],
      uploadHeader: { "Content-Type": "video/mp4" },
      uploadUrl: "",
      uploadFileAddress: "",
    };
  },
  computed: {
    ...mapState("common", ["username", "account", "currentUserPage"]),
    // 创建时间的时间戳转化为时间
    createTime() {
      return new Date(this.userForm.createTime).toLocaleString();
    },
  },
  methods: {
    // 上传前获取预上传链接
    async beforeUpload(file) {
      let res = await Api.getPreSignedObjectUrl(file.name);
      if (res.code === 200) {
        this.uploadUrl = res.data.url;
        this.uploadFileAddress = res.data.address;
      } else {
        message.error(res.message);
      }
    },
    // 上传逻辑实现
    async handleUpload(data) {
      let res = await Api.uploadAction(this.uploadUrl, data.file);
      if (res.status === 200) {
        let res = await Api.saveVideoInfo(
          data.file.name,
          this.uploadFileAddress
        );
        if (res.code === 200) {
          this.getVideoList();
        } else {
          this.$throw(res);
        }
      } else {
        this.$throw(res);
      }
    },
    handleExceed(files, fileList) {
      fileList.pop();
    },
    async handleDelete(row) {
      // 删除视频
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 控制分页切换逻辑
    handleCurrentChange() {
      this.getVideoList();
    },
    // 从后端获取数据
    async getVideoList(pageSize = 5) {
      let res = await Api.getVideoList(pageSize, this.currentPage);
      if (res.code === 200) {
        // 展示之前做处理，添加index和status
        let start = (this.currentPage - 1) * pageSize + 1;
        res.data.records.map((record) => {
          // 插入index
          record.index = start++;
          record.time = timeFormat(record.duration / 1000, record.frameRate);
          return record;
        });
        this.tableData = res.data.records;
        this.total = res.data.total;
      } else {
        this.$throw(res);
      }
    },
  },
  mounted: async function () {
    this.currentPage = this.currentUserPage;
    this.getVideoList();
  },
};
</script>

<style>
</style>
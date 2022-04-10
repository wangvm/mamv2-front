<template>
  <el-container>
    <BaseHeader >
      <template v-slot:right>
        <el-button type="primary" @click="dialogVisible = true">上传文件</el-button>
      </template>
    </BaseHeader>
    <el-main>
      <el-table :data="tableData" stripe :style="{width:100+'%'}">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="fileName" label="文件名"></el-table-column>
        <el-table-column prop="time" label="时长(时:分:秒:帧)"></el-table-column>
        <el-table-column prop="frameRate" label="帧率"></el-table-column>
        <!-- <el-table-column label="" min-width="100%">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
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
        drag
        multiple
        :action="uploadAction"
        :on-error="handleError"
        :limit="5"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-success="handleSuccess"
        with-credentials
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过500M</div>
      </el-upload>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import Api from "@/network/api";
import { message } from "@/assets/js/message";
import BaseHeader from "@/components/BaseHeader.vue";
import Config from "@/config/common.config"
import timeFormat from "@/utils/timeFormat"

export default {
  name: "file",
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
      // 控制上传文件浮窗显示
      dialogVisible: false,
      // 文件列表数据
      tableData: [],
      // 上传文件url
      uploadAction: Config.uploadUrl,
      fileList:[]
    };
  },
  computed: {
    ...mapState("common", ["username", "account","currentUserPage"]),
    // 创建时间的时间戳转化为时间
    createTime() {
      return new Date(this.userForm.createTime).toLocaleString();
    },
  },
  methods: {
    handleSuccess(){
      this.getVideoList();
    },
    handleError(err, file, fileList){
      message.error(err.message);
    },
    handleExceed(files) {
      if (files.length > 5) {
        message.error('最多允许上传5个文件');
        return false;
      }
    },
    async handleDelete(row){
      let res = await Api.deleteUser(row.id, row.address)
      if(res.code === 200){
        this.getVideoList();
      }else{
        message.error(res.message)
      }
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
      try {
        let res = await Api.getVideoList(pageSize, this.currentPage);
        if (res.code === 200) {
          // 展示之前做处理，添加index和status
          let start = (this.currentPage - 1) * pageSize + 1;
          res.data.content.map((record) => {
            // 插入index
            record.index = start++;
            record.time = timeFormat(record.duration, record.frameRate);
            return record;
          });
          this.tableData = res.data.content;
          this.total = res.data.totalElements;
        } else {
          message.error(res.message);
        }
      } catch (e) {
        message.error(e);
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
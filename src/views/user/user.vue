<template>
   <el-container>
    <BaseHeader >
      <template v-slot:right>
        <el-button type="primary" @click="addUser" >添加用户</el-button>
      </template>
    </BaseHeader>
    <el-main>
      <!-- TODO 加上密码修改选项 -->
      <el-table :data="tableData" stripe :style="{width:100+'%'}">
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="username" label="用户名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.username" v-show="scope.row.isEdit" size='mini'></el-input>
            <span v-show="!scope.row.isEdit">{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="role" label="权限">
          <template slot-scope="scope">
            <el-select v-model="scope.row.role" placeholder="请选择" v-show="scope.row.isEdit">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span v-show="!scope.row.isEdit">{{scope.row.role}}</span>
          </template>
        </el-table-column>
        <el-table-column label="" min-width="100%">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">{{scope.row.isEdit?'保存':'编辑'}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="18%">
      <el-form
        :model="userForm"
        :rules="userFormRules"
        ref="userForm"
        label-width="100px"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input
            :value="new Date(userForm.createTime).toLocaleString()"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import Api from "@/network/api";
import { message } from "@/assets/js/message";
import BaseHeader from "@/components/BaseHeader.vue";

export default {
  name: "user",
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
      userForm: {
        account: "",
        username: "",
        password: "",
        createTime: "",
        role: "",
      },
      options:[
        {value:"ROLE_ADMIN",label:"管理员"},
        {value:"ROLE_CATALOGER",label:"编目员"},
        {value:"ROLE_AUDITOR",label:"审核员"},
      ],
      // 添加项目的验证规则
      userFormRules: {
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
    ...mapState("common", ["username", "account","currentUserPage"]),
    // 创建时间的时间戳转化为时间
    createTime() {
      return new Date(this.userForm.createTime).toLocaleString();
    },
  },
  methods: {
    handleEdit(row){
      if(row.isEdit){
        // 删除不必要的信息，如deleted，index，转换role内容为ROLE_XXX
        let {deleted, index, isEdit, ...record} = row;
        switch(record.role){
          case "管理员": record.role = "ROLE_ADMIN";break;
          case "审核员": record.role = "ROLE_AUDITOR";break;
          case "编目员": record.role = "ROLE_CATALOGER";break;
          default:break;
        }
        record.createTime = new Date(row.createTime).getTime();
        this.updateUserInfo(record)
      }
      row.isEdit = !row.isEdit;
    },
    async updateUserInfo(row){
      // 保存数据到后端
      let res = await Api.updateUserInfo(row)
      if(res.code === 200){
        this.getUserList();
      }else{
        message.error(res.message)
      }
    },
    async handleDelete(row){
      let res = await Api.deleteUser(row.account)
      if(res.code === 200){
        this.getUserList();
      }else{
        message.error(res.message)
      }
    },
    // 打开添加项目浮窗，初始化数据
    // TODO 添加权限验证
    addUser() {
      this.dialogVisible = true;
      this.userForm.createTime = new Date().getTime();
    },
    // 验证规则并提交创建项目数据
    // 添加权限验证
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.userForm.password = this.userForm.account;
            let res = await Api.addUser(this.userForm);
            if (res.code === 200) {
              this.dialogVisible = false;
              this.userForm={
                account: "",
                username: "",
                password: "",
                createTime: null,
                role: "",
              };
              this.getUserList();
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
    // 控制分页切换逻辑
    handleCurrentChange() {
      // TODO 请求后端拿去数据
      this.getUserList();
      this.$store.commit("storedUserPage",this.currentPage);
    },
    // 从后端获取数据
    async getUserList(
      status = 0,
      order = "account",
      isAsc = 1,
      pageSize = 5
    ) {
      try {
        let res = await Api.queryUserList(
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
            // 插入转换role
            switch(record.role){
                case "ROLE_ADMIN": record.role = "管理员";break;
                case "ROLE_AUDITOR": record.role = "审核员";break;
                case "ROLE_CATALOGER": record.role = "编目员";break;
                default:break;
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
    this.currentPage = this.currentUserPage;
    this.getUserList();
  },
};
</script>

<style>

</style>
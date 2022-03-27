<template>
  <el-container class="home">
    <commonHeader title="媒资编目系统"/>
    <el-row>
      <el-form class="login-card">
        <h3>用户登录</h3>
        <el-form-item>
          <el-input v-model="account" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
import { debounce } from "lodash-es";
import commonHeader from "../components/commonHeader.vue";
// import $api from "@/network/api";

export default {
  name: "home",
  components: {
    commonHeader,
  },
  data() {
    return {
      account: "",
      password: "",
    };
  },
  computed: {
    ...mapState("common", ["authority"]),
  },
  methods: {
    ...mapActions("common", ["loginAction"]),
    // 登录防抖函数
    loginSubmit: debounce(function () {
      const { account, password } = this;
      if (!account) return this.$message.error("账号不能为空");
      if (!password) return this.$message.error("密码不能为空");
      this.login();
    }, 300),
    // 登录逻辑
    async login() {
      let regNum = /^\d*$/;
      const { account, password } = this;
      const params = { account, password };
      if (regNum.test(account)) {
        await this.loginAction(params);
        if (this.authority) this.$router.push("/manage");
      } else {
        this.$message.error("请输入正确的账号");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
  font-size: 15px;
  height: 100vh;
  // font-family: "SimSun", "微软雅黑", "Arial Narrow";

  // 登录框样式
  .login-card {
    line-height: 80px;
    margin: 100px auto;
    width: 400px;
  }
}
</style>
<template>
  <el-container class="home">
    <BaseHeader>
      <template v-slot:left>
        <p>媒资编目系统</p>
      </template>
    </BaseHeader>
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
import { mapActions, mapMutations, mapState } from "vuex";
import { debounce } from "lodash-es";
import BaseHeader from "@/components/BaseHeader.vue";
import API from "@/network/api";
import { message } from "@/assets/js/message";

// import API from "@/network/api";

export default {
  name: "home",
  components: {
    BaseHeader,
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
    ...mapMutations("common", ["updateLoginData"]),
    // 登录防抖函数
    loginSubmit: debounce(function () {
      const { account, password } = this;
      if (!account) return this.$message.error("账号不能为空");
      if (!password) return this.$message.error("密码不能为空");
      this.login();
    }, 300),
    // 登录逻辑
    // TODO 修改全部请求逻辑
    async login() {
      let regNum = /^\d*$/;
      if (regNum.test(this.account)) {
        let res = await API.login(this.account, this.password);
        console.log(this.$router.push);
        if (res.code === 200) {
          this.updateLoginData(res.data);
          this.$router.push("/manage");
        }else{
          this.$throw(res);
        }
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
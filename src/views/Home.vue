<template>
  <el-container class="home">
    <el-header class="home-header"><p>媒资编目系统</p></el-header>
    <el-main class="home-main">
      <div>
        <p>用户登录</p>
        <div class="login-input">
          <label>账号：</label>
          <el-input v-model="username" placeholder="请输入登录账户"></el-input>
        </div>
        <div class="login-input">
          <label>密码：</label>
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
          ></el-input>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  components: {},
};
</script>

<style lang="less" scoped>
.home {
  color: #333;
  font-size: 15px;
  // font-family: "SimSun", "微软雅黑", "Arial Narrow";

  .el-header {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    cursor: default;
    background: #366adbcc;
    font-size: 20px;
    font-weight: bold;
    user-select: none;
    letter-spacing: 10px;

    p {
      width: 20%;
      text-align: left;
      margin: 15px;
    }
  }

  .el-main {
    height: 100%;
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
    font-size: 20px;

    .login-input {
      display: flex;
    }
  }
}
</style>
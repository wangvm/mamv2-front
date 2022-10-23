<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#CFD8DC"
    text-color="#000000"
    active-text-color="#d13013"
    router
  >
    <el-menu-item index="/manage/task">
      <i class="el-icon-menu"></i>
      <span slot="title">任务管理</span>
    </el-menu-item>
    <el-menu-item index="/manage/user" v-show="menuControl">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/manage/file" v-show="menuControl">
      <i class="el-icon-files"></i>
      <span slot="title">文件管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ManageMenu",
  computed: {
    ...mapState("common", ["authority"]),
    menuControl() {
      return this.authority === "ROLE_ADMIN" ? true : false;
    },
  },
  methods: {
   
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  border-right: none;

  span {
    font-size: 18px;
  }
}
</style>
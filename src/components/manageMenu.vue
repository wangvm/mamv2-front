<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#CFD8DC"
    text-color="#000000"
    active-text-color="#d13013"
  >
    <!-- <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu> -->
    <el-menu-item index="project">
      <i class="el-icon-menu"></i>
      <span slot="title">项目管理</span>
    </el-menu-item>
    <el-menu-item index="user" v-show="menuControl">
      <i class="el-icon-user"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="file" v-show="menuControl">
      <i class="el-icon-files"></i>
      <span slot="title">文件管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "manageMenu",
  computed: {
    ...mapState("common", ["authority"]),
    menuControl() {
      return this.authority === "ROLE_ADMIN" ? true : false;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
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
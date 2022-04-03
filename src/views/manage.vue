<template>
  <el-container class="manage">
    <BaseHeader class="base-header">
      <template v-slot:left>
        <p>媒资管理系统—管理界面</p>
      </template>
      <template v-slot:right>
        <el-button type="primary" size="mini" @click="logout">退出</el-button>
      </template>
    </BaseHeader>
    <el-container>
      <el-aside><manageMenu /></el-aside>
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue";
import manageMenu from "@/components/manageMenu.vue";
import $api from "@/network/api";

export default {
  name: "manage",
  components: {
    BaseHeader,
    manageMenu,
  },
  methods: {
    async logout() {
      try {
        const res = await $api.logout();
        if (res.code === 200) this.$router.push("/");
      } catch (e) {
        this.$catch = e;
      }
    },
  },
};
</script>

<style>
.manage {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  height: 100vh;
}

.el-aside {
  background-color: #cfd8dc;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.base-header{
  background: #bac2c5;
}
</style>
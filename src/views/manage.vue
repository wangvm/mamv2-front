<template>
  <el-container class="manage">
    <BaseHeader class="base-header">
      <template v-slot:left>
        <p v-if="authority==='ROLE_ADMIN'">媒资管理系统—管理界面</p>
        <p v-else>媒资管理系统</p>
      </template>
      <template v-slot:right>
        <el-button type="primary" size="mini" @click="logout">退出</el-button>
      </template>
    </BaseHeader>
    <el-container>
      <el-aside><ManageMenu /></el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue";
import ManageMenu from "@/components/ManageMenu.vue";
import API from "@/network/api";
import { mapState, mapMutations } from "vuex";

export default {
  name: "manage",
  data() {
    return {
      ...mapState("common", ["authority"]),
    };
  },
  components: {
    BaseHeader,
    ManageMenu,
  },
  methods: {
    async logout() {
      const res = await API.logout();
      if (res.code === 200) this.$router.push("/");
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
.base-header {
  background: #bac2c5;
}
</style>
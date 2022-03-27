<template>
  <el-container class="manage">
    <commonHeader>
      <template v-slot:left>
        <p>媒资管理系统—管理界面</p>
      </template>
      <template v-slot:right>
        <el-button type="primary" size="mini" @click="logout">退出</el-button>
      </template>
    </commonHeader>
    <el-container>
      <el-aside><manageMenu /></el-aside>
      <el-main>
        <project></project>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import commonHeader from "@/components/commonHeader.vue";
import manageMenu from "@/components/manageMenu.vue";
import project from "@/views/project/project.vue";
import $api from "@/network/api";

export default {
  name: "manage",
  components: {
    commonHeader,
    manageMenu,
    project,
  },
  methods: {
    async logout() {
      try {
        const res = await $api.logout();
        if (res.code === 200) this.$router.push("/");
      } catch (e) {
        this.$catch = e;
      }
      // if (res.data.code === "200")
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
</style>
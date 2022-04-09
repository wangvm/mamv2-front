<template>
  <el-card class="edit">
    <div slot="header" class="clearfix">
      <el-page-header class="edit-header" @back="goBack"></el-page-header>
    </div>
    <router-view></router-view>
  </el-card>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "catalog",
  computed: {
    // ...mapState("common", [ "currentTask"]),
  },
  methods: {
    ...mapMutations("common", ["setTitleStats"]),
    goBack() {
      this.$router.push("/manage/task")
    },
  },
};
</script>

<style scoped lang="less">
.edit {
  .clearfix {
    .edit-header {
      user-select: none;
      cursor: default;
    }
  }
}
</style>

<template>
  <el-header class="header">
    <slot name="left"></slot>
    <slot name="right"></slot>
  </el-header>
</template>

<script>
export default {
  name: "commonHeader",
  props: ["title"],
};
</script>

<style lang="less" scoped>
/* 顶栏样式 */
.header {
  display: flex;
  align-items: center;
  background: #90A4AE;
  font-size: 20px;
  color: #333;
  // font-family: "SimSun", "微软雅黑", "Arial Narrow";
  font-weight: bold;
  user-select: none;
  letter-spacing: 10px;
  height: 7%;
  justify-content: space-between;
}
</style>
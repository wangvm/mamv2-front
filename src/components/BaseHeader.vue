<template>
  <header class="header" :style="{ height }">
    <div>
      <slot name="left"></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    height: {
      type: String,
      default: "60px",
    },
  },
};
</script>

<style lang="less" scoped>
/* 顶栏样式 */
.header {
  display: flex;
  justify-content: space-between;
  box-shadow: 6px 6px 12px #e3e3e3, -6px -6px 12px #fff;

  align-items: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 10px;
  padding: 0 25px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
</style>
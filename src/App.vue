<template>
  <div id="app" class="app">
    <keep-alive>
      <transition name="el-fade-in">
        <router-view />
      </transition>
    </keep-alive>
  </div>
</template>

<style lang="less">
@import "~@/assets/css/common.less";
.el-dialog .el-dialog__body{
      display: flex;
      justify-content: center;
      align-items: center;
}
.app{
  background: #eef0f3;
  min-width: 1200px;
  width: 100%;
}
</style>

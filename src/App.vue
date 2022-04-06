<template>
  <div id="app" :style="{'min-width':1800+'px'}">
    <keep-alive>
      <transition name="el-fade-in">
        <router-view />
      </transition>
    </keep-alive>
  </div>
</template>

<style lang="less">
@import "~@/assets/css/common.less";

</style>

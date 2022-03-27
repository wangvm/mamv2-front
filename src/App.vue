<template>
  <div id="app">
    <keep-alive>
      <transition name="el-fade-in">
        <router-view />
      </transition>
    </keep-alive>
  </div>
</template>

<style lang="less">
// @import "~@/assets/css/common.less";
body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,
div {
  margin: 0;
  padding: 0;
  border: 0;
}
body {
  margin: 0px;
  background: #fff;
  color: #333;
  font-size: 12px;
  // font-family: "SimSun", "微软雅黑", "Arial Narrow";
}

ul, ol {
  list-style-type: none;
}
select, input, img, select {
  vertical-align: middle;
}

a {
  text-decoration: none;
}

a:hover, a:active, a:focus {
  text-decoration: none;
}

</style>

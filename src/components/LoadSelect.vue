<!-- load-select.vue -->
<template>
  <el-select
    :value="value"
    v-loadmore="loadMore"
    @focus="focus"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="option in data"
      :label="option[dictLabel]"
      :value="option[dictValue]"
      :key="option.value"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: "LoadSelect",
  props: {
    value: {
      type: String,
      default: "",
    },
    // 列表数据
    data: {
      type: Array,
      default: () => [],
    },
    dictLabel: {
      type: String,
      default: "label",
    },
    dictValue: {
      type: String,
      default: "value",
    },
    // 调用页数的接口
    request: {
      type: Function,
      default: () => {},
    },
    page: {
      type: [Number, String],
      default: 1,
    },
  },
  data() {
    return {};
  },
  methods: {
    // 请求下一页的数据
    loadMore() {
      // 如果 intercept 属性为 true 则不请求数据
      if (this.loadMore.intercept) {
        return;
      }
      this.loadMore.intercept = true;
      this.request({ page: this.page + 1 }).then(() => {
        // 接口响应之后才把 intercept 设置为 false
        this.loadMore.intercept = false;
      });
    },
    // 选中下拉框没有数据时，自动请求第一页的数据
    focus() {
      if (!this.data.length) {
        this.request({ page: 1 });
      }
    },
  },
};
</script>
import $api from "@/network/api";
// 引用loadsh
import _ from "lodash"

export default {
  // 用户登录
  async loginAction({ commit }, params) {
    try {
      const { account, password } = params;
      let res = await $api.login(account, password);
      if (res.code === 200) {
        commit("updateLoginData", res.data);
      } else {
        commit("updateLoginData", {});
      }
    } catch (e) {
      this.$catch = e;
    }
  },

  //获取截图并更新
  updateScreenshotList({ commit, state }, val) {
    let imageList = _.cloneDeep(state.screenshotList);
    imageList.push({
      title: "",
      src: val
    })
    commit('setScreenshotList', imageList);
  }
};

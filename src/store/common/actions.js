import $api from "@/network/api";

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
};

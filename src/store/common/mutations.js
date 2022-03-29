export default {
  // 更新登录信息
  updateLoginData(state, data) {
    state.account = data.account;
    state.authority = data.role;
    state.username = data.username;
  },
};

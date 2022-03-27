export default {
  // 更新登录信息
  updateLoginData(state, data) {
    console.log(state, data);
    state.account = data.account;
    state.authority = data.authority;
    state.username = data.username;
  },
};

export default {
  // 更新登录信息
  updateLoginData(state, data) {
    state.account = data.account;
    state.authority = data.role;
    state.username = data.username;
  },
  updateProjectInfo(state, currentPage, currentProject) {
    state.currentPage = currentPage;
    state.currentProject = currentProject;
  },
  storedTaskInfo(state, id, name) {
    state.currentTask = { id, name };
  },
};

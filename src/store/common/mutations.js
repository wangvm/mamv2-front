export default {
  // 更新登录信息
  updateLoginData(state, data) {
    state.account = data.account;
    state.authority = data.role;
    state.username = data.username;
  },
  updateProjectInfo(state, payload) {
    state.currentProjectPage = payload.currentPage;
    state.currentProject.id = payload.id;
    state.currentProject.name = payload.name;
  },
  storedTaskInfo(state, payload) {
    state.currentTaskPage = payload.currentPage;
    state.currentTask.id = payload.id;
    state.currentTask.name = payload.name;
  },
};

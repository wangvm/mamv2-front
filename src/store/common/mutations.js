export default {
  // 更新登录信息
  updateLoginData(state, data) {
    state.account = data.account;
    state.authority = data.role;
    state.username = data.username;
  },
  storedProjectPage(state,payload){
    state.currentProjectPage = payload;
  },
  updateProjectInfo(state, payload) {
    state.currentProjectPage = payload.currentPage;
    state.currentProject.id = payload.id;
    state.currentProject.name = payload.name;
  },
  storedTaskPage(state,payload){
    state.currentTaskPage = payload;
  },
  storedTaskInfo(state, payload) {
    state.currentTaskPage = payload.currentPage;
    state.currentTask.id = payload.id;
    state.currentTask.name = payload.name;
  },
  storedUserPage(state, payload) {
    state.currentUserPage = payload;
  },

  // 与视频播放相关
  setVideoSrc(state, val) {
    state.videoSrc = val;
  },
  setScreenshotList(state, val) {
    state.screenshotList = val;
  },
  
  // 设置入点时间
  setLoginTime(state, val) {
    state.entryPoint = val;
  },
  // 设置时长
  setLogTime(state, val) {
    state.logTime = val;
  }
};

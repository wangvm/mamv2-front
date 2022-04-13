export default {
  // 更新登录信息
  updateLoginData(state, data) {
    state.account = data.account;
    state.authority = data.role;
    state.username = data.username;
  },
  storedProjectPage(state, payload) {
    state.currentProjectPage = payload;
  },
  updateProjectInfo(state, payload) {
    state.currentProjectPage = payload.currentPage;
    state.currentProject.id = payload.id;
    state.currentProject.name = payload.name;
  },
  storedTaskPage(state, payload) {
    state.currentTaskPage = payload;
  },
  storedTaskInfo(state, payload) {
    state.currentTaskPage = payload.currentPage;
    state.currentTask.id = payload.id;
    state.currentTask.name = payload.name;
    state.currentTask.status = payload.status;
  },
  storedUserPage(state, payload) {
    state.currentUserPage = payload;
  },

  // 与视频播放相关
  setScreenshotList(state, val) {
    state.screenshotList = val;
  },
  setVideoInfo(state, payload) {
    state.videoInfo = payload;
  },

  // 设置入点时间
  setStartPoint(state, val) {
    state.programData.startPoint.value = "" + val;
  },
  setOutPoint(state, val) {
    state.programData.outPoint.value = "" + val;
  },
  setFragmentStartPoint(state, val) {
    state.fragmentData.startPoint.value = "" + val;
  },
  setFragmentOutPoint(state, val) {
    state.fragmentData.outPoint.value = "" + val;
  },
  setScenesStartPoint(state, val) {
    state.scenesData.startPoint.value = "" + val;
  },
  setScenesOutPoint(state, val) {
    state.scenesData.outPoint.value = "" + val;
  },

  // 设置时长
  setLogTime(state, val) {
    state.logTime = val;
  },

  // 编目数据提交

  setProgramData(state, programData) {
    state.programData = programData;
  },
  setFragmentData(state, fragmentData) {
    state.fragmentData = fragmentData;
  },
  setScenesData(state, scenesData) {
    state.scenesData = scenesData;
  },
};

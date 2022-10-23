import request from "@/network/request";

export default {
  login: (account, password) => request("/login", { account, password }, "POST"), //ok
  logout: () => request("/logout"),
  // 任务接口
  queryTask: (current = 1, pageSize = 5) => request("/task/list", { current, pageSize }),
  queryTaskByUser: (current = 1, pageSize = 5, account) => request("/task/list", { current, pageSize, account }),
  updateTaskInfo: (taskData) => request("/task/update", taskData, "POST"),
  deleteTask: (taskId) => request("/task/delete/" + taskId),
  addTask: (taskData) => request("/task/add", taskData, "POST"),
  queryCatalogerByName: (name) => request("/user/cataloger", { username: name }),
  queryAuditorByName: (name) => request("/user/auditor", { username: name }),

  // 用户接口
  addUser: (user) => request("/user/add", user, "POST"),
  deleteUser: (account) => request("/user/delete", { account }, "POST"),
  updateUserInfo: (user) => request("/user/update", user, "POST"),
  queryUserList: (status = 0, order = "account", isAsc = 1, current = 1, pageSize = 5) =>
    request("/user/list", { current, pageSize }),
  queryUserByName: (username, current, pageSize) => request("/user/list", { username, current, pageSize }),
  // 文件接口

  uploadVideo: (file) => request("/file/upload/video", file, "POST"),
  uploadKeyFrame: (file) => request("file/upload/keyframe", file, "POST"),
  getVideoList: (pageSize = 5, pageIndex = 1) => request("/file/videoList", { pageSize, pageIndex }),
  searchVideoByName: (filename, pageSize = 5, pageIndex = 1) =>
    request("/file/search", { filename, pageSize, pageIndex }),
  keyFrameCut: (cutTime, videoUrl) => request("/file/keyframe", { cutTime, videoUrl }),
  // 编目接口
  addFragmentRecord: (fragmentData) => request("/catalog/add/fragment", fragmentData, "POST"),
  addScenesRecord: (scenesData) => request("/catalog/add/scenes", scenesData, "POST"),
  deleteCatalogRecord: (record, catalogId) => request("/catalog/delete/" + record, { catalogId: catalogId }),
  deleteBulkScenes: (scenesIds) => request("/catalog/delete/bulk/scenes", scenesIds, "POST"),
  getCatalogRecord: (record, catalogId) => request("/catalog/get/" + record, { catalogId: catalogId }),
  getProgramRecord: (catalogId, taskId) => request("/catalog/get/program", { catalogId: catalogId, taskId: taskId }),
  getMenu: (taskId) => request("/catalog/get/menu", { taskId }),
  getVideoInfo: (taskId) => request("/file/videoInfo", { taskId }),
  updateProgramRecord: (programData) => request("/catalog/update/program", programData, "POST"),
  updateFragmentRecord: (fragmentData) => request("/catalog/update/fragment", fragmentData, "POST"),
  updateScenesRecord: (scenesData) => request("/catalog/update/scenes", scenesData, "POST"),
  // 提交和审核接口
  submitAudit: (taskId) => request("/task/submit", { taskId }),
  rebackCatalog: (taskId) => request("/task/reback", { taskId }),
  passCatalog: (taskId) => request("/task/pass", { taskId }),
};

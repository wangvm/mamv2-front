import request from "@/network/request";

export default {
  login: (account, password) => request("/login", { account, password }, "POST"), //ok
  logout: () => request("/logout"),
  // 项目接口
  addProject: (projectData) => request("/project/add", projectData, "POST"),
  deleteProject: (id) => request("/project/delete", { id }, "POST"),
  updateProjectName: (id, name) => request("/project/update/name", { id, name }, "POST"),
  updateTaskNumber: (projectId) => request("/project/task/add", projectId),
  finishedTask: (projectId) => request("/project/task/finished", projectId),
  queryProjectList: (status = 0, order = "account", isAsc = 1, current = 1, pageSize = 5) =>
    request("/project/query", { status, order, isAsc, current, pageSize }),
  queryProjectListByUser: (current = 1, pageSize = 5) => request("/project/query/user", { current, pageSize }),
  queryProjectByName: (name) => request("/project/query/name", { name }),
  // 任务接口
  queryTaskByProject: (id, current = 1, pageSize = 5) =>
    request("/task/query/project", { projectId: id, current, pageSize }),
  updateTaskInfo: (taskData) => request("/task/update", taskData, "POST"),
  deleteTask: (taskId) => request("/task/delete", { id: taskId }, "POST"),
  addTask: (taskData) => request("/task/add", taskData, "POST"),
  queryCatalogerByName: (name) => request("/user/query/cataloger", { username: name }),
  queryAuditorByName: (name) => request("/user/query/auditor", { username: name }),

  // 用户接口
  addUser: (user) => request("/user/add", user, "POST"),
  deleteUser: (account) => request("/user/delete", { account }, "POST"),
  updateUserInfo: (user) => request("/user/update", user, "POST"),
  queryUserList: (status = 0, order = "account", isAsc = 1, current = 1, pageSize = 5) =>
    request("/user/query/list", { status, order, isAsc, current, pageSize }),
  queryUserByName: (username, current, pageSize) => request("/user/query/name", { username, current, pageSize }),
  // 文件接口

  // uploadVideo: (file) => request("/file/upload/video", file, "POST"),
  uploadKeyFrame: (file) => request("file/upload/keyframe", file, "POST"),
  getVideoList: (pageSize = 5, pageIndex = 1) => request("/file/videoList", { pageSize, pageIndex }),
  searchVideoByName: (filename, pageSize = 5, pageIndex = 1) =>
    request("/file/search", { filename, pageSize, pageIndex }),

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
};

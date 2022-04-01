import request from "@/network/request";

const $api = {
  login: (account, password) => request("/login", { account, password }, "POST"), //ok
  logout: () => request("/logout"),
  // 项目接口
  addProject: (projectData) => request("/project/add", projectData, "POST"),
  deleteProject: (id, name) => request("/project/delete", { id, name }, "POST"),
  updateLeader: (id, leader, leaderName) => request("/project/update/leader", { id, leader, leaderName }, "POST"),
  updateProjectName: (id, name) => request("/project/update/leader", { id, name }, "POST"),
  updateTaskNumber: (projectId) => request("/project/task/add", projectId),
  finishedTask: (projectId) => request("/project/task/finished", projectId),
  queryProjectList: (status = 0, order = "account", isAsc = 1, current = 1, pageSize = 10) =>
    request("/project/query", { status, order, isAsc, current, pageSize }),
  queryProjectListByUser: (current = 1, pageSize = 10) => request("/project/query/user", { current, pageSize }),
  queryProjectByName: (name) => request("/project/query/name", { name }),
};
export default $api;

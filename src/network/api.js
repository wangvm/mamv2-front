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
  queryProjectList: (status = 0, order = "account", isAsc = 1, current = 1, pageSize = 10) =>
    request("/project/query", { status, order, isAsc, current, pageSize }),
  queryProjectListByUser: (current = 1, pageSize = 10) => request("/project/query/user", { current, pageSize }),
  queryProjectByName: (name) => request("/project/query/name", { name }),
  // 任务接口
  queryTaskByProject:(id)=>request("/task/query/project", {projectId:id}),
  updateTaskInfo:(taskData)=>request("/task/update", {task:taskData},"POST"),
  deleteTask:(taskId)=>request("/task/delete", {id:taskId},"POST"),
  addTask:(taskData)=>request("/task/add", taskData,"POST"),
  queryCatalogerByName:(name)=>request("/user/query/cataloger",{username:name}),
  queryAuditorByName:(name)=>request("/user/query/auditor",{username:name}),

  // 
};

export default {
  authority: "",
  account: "",
  username: "",
  // 项目管理状态保持
  currentProjectPage: 1,
  currentProject: {
    id: null,
    name: "",
  },
  // 任务管理状态保持
  currentTaskPage: 1,
  currentTask: {
    id: null,
    name: "",
  },
  // 用户数据
  currentUserPage: 1,

  // 视频播放组件
  videoSrc: "http://192.168.111.128/vod/test.mp4",
  screenshotList: [],
  videoInfo:{
    fileName:"",
    aspectRatio:"",
    duration: 0,
    frameRate: 0,
    address: "",
    audioChannel: 0,
  },

  // 视频数据
  // 当前入点
  entryPoint: null,
  // 当前出点
  outPoint: null,
  // 打点时长
  logTime: null,
};

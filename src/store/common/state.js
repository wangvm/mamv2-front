export default {
  authority: "",
  account: "",
  username: "",

  // 任务管理状态保持
  currentTaskPage: 1,
  currentTask: {
    taskId: null,
    taskName: "",
    status: "",
  },
  // 用户数据
  currentUserPage: 1,

  // 视频播放组件
  screenshotList: [],
  videoInfo: {
    fileName: "",
    aspectRatio: "",
    duration: 770120,
    frameRate: 25,
    address: "http://192.168.111.128/vod/test.mp4",
    audioChannel: 0,
  },

  // 视频数据
  // 打点时长
  logTime: null,

  // 编目数据
  programData: {
    menu: {
      id: 1,
      menuId: null,
      catalogId: null,
      content: "",
      level: "",
      parentId: null,
    },
    taskId: 4,
    title: "",
    description: "",
    debutDate: "",
    programType: "",
    creator: "",
    contributor: "",
    programForm: "",
    column: "",
    color: "",
    system: "",
    audioChannel: "",
    aspectRatio: "",
    subtitleForm: "",
    startPoint: "",
    outPoint: "",
    keyFrames: [],
    sourceProvider: "",
    sourceAcquiringMethod: "",
  },
  // 片段层数据
  fragmentData: {
    menu: {
      id: 1,
      menuId: null,
      catalogId: null,
      content: "",
      level: "",
      parentId: null,
    },
    taskId: 1,
    title: "",
    description: "",
    creator: "",
    contributor: "",
    subtitleForm: "",
    startPoint: "",
    outPoint: "",
    sourceAcquiringMethod: "",
    sourceProvider: "",
    keyFrames: [],
  },
  // 场景层数据
  scenesData: {
    id: "",
    menu: {
      id: 1,
      menuId: null,
      catalogId: null,
      content: "",
      level: "",
      parentId: null,
    },
    taskId: 1,
    title: "",
    description: "",
    subtitleForm: "",
    startPoint: "",
    outPoint: "",
    keyFrames: [],
  },
  comment: {
    value: ""
  },
};

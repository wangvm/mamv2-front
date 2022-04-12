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
    status:"",
  },
  // 用户数据
  currentUserPage: 1,

  // 视频播放组件
  screenshotList: [],
  videoInfo: {
    fileName:"",
    aspectRatio:"",
    duration: 0,
    frameRate: 0,
    address: "http://192.168.111.128/vod/test.mp4",
    audioChannel: 0,
  },

  // 视频数据
  // 当前入点
  entryPoint: null,
  // 当前出点
  outPoint: null,
  // 打点时长
  logTime: null,


  // 编目数据
  programData: {
    menu: {
      id: 1,
      content: "",
      level: "",
      check: 0,
      parent: null,
    },
    taskId: 4,
    title: {
      value: "",
      check: 0,
    },
    description: {
      value: "",
      check: 0,
    },
    debutDate: {
      value: "",
      check: 0,
    },
    programType: {
      value: "",
      check: 0,
    },
    creator: {
      value: "",
      check: 0,
    },
    contributor: {
      value: "",
      check: 0,
    },
    column: {
      value: "",
      check: 0,
    },
    color: {
      value: "",
      check: 0,
    },
    system: {
      value: "",
      check: 0,
    },
    audioChannel: {
      value: "1",
      check: 0,
    },
    aspectRatio: {
      value: "0x0",
    },
    startPoint: {
      value: "",
      check: 0,
    },
    outPoint: {
      value: "",
      check: 0,
    },
    sourceAcquiringMethod: {
      value: "",
      check: 0,
    },
    sourceProvider: {
      value: "",
      check: 0,
    },
  },
  // 片段层数据
  fragmentData: {
    menu: {
      id: 0,
      content: "",
      level: "",
      check: 0,
      parent: 1,
    },
    taskId: 1,
    title: {
      value: "",
      check: 0,
    },
    description: {
      value: "",
      check: 0,
    },
    creator: {
      value: "",
      check: 0,
    },
    contributor: {
      value: "",
      check: 0,
    },
    subtitleForm: {
      value: "",
      check: 0,
    },
    startPoint: {
      value: "",
      check: 0,
    },
    outPoint: {
      value: "",
      check: 0,
    },
    sourceAcquiringMethod: {
      value: "",
      check: 0,
    },
    sourceProvider: {
      value: "",
      check: 0,
    },
  },
  // 场景层数据
  scenesData: {
    id: "",
    menu: {
      id: 0,
      content: "",
      level: "",
      check: 0,
      parent: null,
    },
    taskId: 1,
    title: {
      value: "",
      check: 0,
    },
    description: {
      value: "",
      check: 0,
    },
    subtitleForm: {
      value: "",
      check: 0,
    },
    startPoint: {
      value: "",
      check: 0,
    },
    outPoint: {
      value: "",
      check: 0,
    },
  },
};

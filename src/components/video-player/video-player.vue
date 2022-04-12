<!--videoInfo: {-->
<!--url: require('@/assets/video/test.mp4'),-->
<!--frameRate: 25-->
<!--}-->
<template>
  <el-card shadow="hover" v-loading.fullscreen.lock="loading">
    <div
      class="videoPlayer"
      contenteditable="true"
      @keydown="videoPlayerKeyEvent"
      onselectstart="return false;"
    >
      <!--     video 播放器       -->
      <div class="video_content">
        <!--http://10.1.71.155/static/video/test.mp4-->
        <!--@/assets/video/test.mp4-->
        <!-- TODO 还需要调试修改 -->
        <video
          class="player"
          ref="player"
          :src="videoInfo.address"
          width="100%"
          height="100%"
          preload="auto"
          @canplaythrough="videoEvent('canplaythrough')"
          @playing="videoEvent('playing')"
          @pause="videoEvent('pause')"
          @ended="videoEvent('end')"
          @mouseover="videoEvent('mouseover')"
          @mouseout="videoEvent('mouseout')"
        ></video>
      </div>
      <!-- 操作按钮 -->
      <div class="video_btn">
        <!--     i：按钮封装       -->
        <i
          v-show="!ifPlay"
          class="playerBtn el-icon-video-play"
          title="播放(空格)"
          type="play-circle"
          @click="playerBtnEvent('play')"
        />
        <i
          v-show="ifPlay"
          class="playerBtn el-icon-video-pause"
          title="暂停(空格)"
          type="pause-circle"
          @click="playerBtnEvent('pause')"
        />
        <i
          class="playerBtn el-icon-refresh-left"
          title="停止(Enter)"
          type="undo"
          @click="playerBtnEvent('stop')"
        />
        <div class="time-box">
          <span class="time" title="时:分:秒:帧" ref="time">00:00:00:00</span>
        </div>
        <i
          class="playerBtn el-icon-arrow-left"
          title="上一帧(方向左)"
          type="step-backward"
          @click="playerBtnEvent('back')"
        />
        <i
          class="playerBtn el-icon-arrow-right"
          title="下一帧(方向右)"
          type="step-forward"
          @click="playerBtnEvent('forward')"
        />
        <i
          class="playerBtn el-icon-sort-down"
          title="入点"
          type="login"
          @click="logEvent('login')"
        />
        <i
          class="playerBtn el-icon-sort-up"
          title="出点"
          type="logout"
          @click="logEvent('logout')"
        />
        <i
          class="playerBtn el-icon-sort"
          title="清除入点和出点"
          type="close"
          @click="logEvent('logRemove')"
        />
        <i
          class="playerBtn el-icon-caret-bottom"
          title="跳转至入点"
          type="vertical-align-bottom"
          @click="logEvent('toLogin')"
        />
        <i
          class="playerBtn el-icon-caret-top"
          title="跳转至出点"
          type="vertical-align-top"
          @click="logEvent('toLogout')"
        />
        <!--     input：调节声音大小       -->
        <i
          class="playerBtn el-icon-scissors"
          title="截取关键帧图片"
          type="customer-service"
          @click="screenshot(time)"
        />
        <input
          type="range"
          min="0"
          max="100"
          value="100"
          ref="range"
          @mousedown="volumeEvent('mouseDown')"
          @mousemove="volumeEvent('mouseMove')"
          @mouseup="volumeEvent('mouseUp')"
        />
        <!--     progress 进度条封装       -->
        <div class="progress">
          <progress
            ref="progress"
            class="progress_content"
            value="0"
            :max="getPlayerDuration"
            v-if="ifLoad"
            @mousedown="progressMouseDown"
            @mousemove="progressMouseMove"
            @mouseup="progressMouseUp"
            @click="progressClick"
            @mouseenter="progressMouseEnter"
            @mouseleave="progressMouseLeave"
          ></progress>
          <span class="login" ref="login"></span>
          <span class="logout" ref="logout"></span>
          <img class="video_preview" ref="preview" src="" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import API from "@/network/api";

export default {
  name: "videoPlayer",
  data() {
    return {
      loading: false, //加载中
      player: null, //视频播放器
      playerPreview: null, //视频进度条预览
      ifLoad: false, //视频是否加载完成
      ifPlay: false, //播放暂停切换
      timer: null, //播放器定时器
      ifPreviewMouseDown: false, //进度条实时变化
      ifPreview: false, //进度条预览图
      ifVolumeMouseDown: false, //音量实时变化
      loginTime: null, //入点时间string类型
      logoutTime: null, //出点时间string类型
      start: null, //入点数值number，用来算时长
    };
  },
  props: {
    videoInfo: Object,
    logReset: Boolean,
  },
  created() {},
  mounted() {
    this.player = this.$refs.player;
    this.playerPreview = this.$refs.playerPreview;
    this.player.addEventListener("keydown", this.videoPlayerKeyEvent);
  },
  destroyed() {
    //离开页面假如视频再播放，销毁定时器
    clearInterval(this.timer);
    this.timer = null;
    document.removeEventListener("keydown", this.videoPlayerKeyEvent);
  },
  watch: {
    logReset: "updateVideoLog",
  },
  computed: {
    getPlayerDuration() {
      return this.player.duration;
    },
    ...mapState("common", ["currentTask"]),
  },
  methods: {
    ...mapActions("common", ["updateScreenshotList"]),
    ...mapMutations("common", ["setLoginTime", "setLogTime"]),
    updateVideoLog() {
      //当父组件保存或者取消时，将入点和出点重置
      if (this.logReset === false) {
        this.logEvent("logRemove");
      }
    },
    videoPlayerKeyEvent(event) {
      let myVid = this.player;
      if (event.key === " " && this.ifPlay === false) {
        this.playerBtnEvent("play");
      } else if (event.key === " " && this.ifPlay === true) {
        this.playerBtnEvent("pause");
      } else if (event.key === "Enter") {
        this.playerBtnEvent("stop");
      } else if (event.key === "ArrowLeft") {
        this.playerBtnEvent("back");
      } else if (event.key === "ArrowRight") {
        this.playerBtnEvent("forward");
      } else if (event.key === "ArrowUp") {
        this.$refs.range.value++;
        myVid.volume = this.$refs.range.value / 100;
      } else if (event.key === "ArrowDown") {
        this.$refs.range.value--;
        myVid.volume = this.$refs.range.value / 100;
      }
    },
    //warning 设置定时器让播放器静音播放1s解决刷新进页面第一次播放前1s卡顿的问题
    videoEvent(status) {
      switch (status) {
        case "canplaythrough":
          //视频加载完成
          this.ifLoad = true;
          break;
        case "playing":
          //判断播放器正在播放
          if (this.ifLoad) {
            this.timer = setInterval(() => {
              this.$refs.time.innerText = timeFormat(
                this.player.currentTime,
                this.videoInfo.frameRate
              );
              this.$refs.progress.value = this.player.currentTime;
            }, this.videoInfo.frameRate);
          }
          break;
        case "pause":
          //播放器暂停
          clearInterval(this.timer);
          this.timer = null;
          this.$refs.time.innerText = timeFormat(
            this.player.currentTime,
            this.videoInfo.frameRate
          );
          break;
        case "end":
          //视频播放完成
          this.ifPlay = false;
          this.player.currentTime = 0;
          this.$refs.progress.value = this.player.currentTime;
          this.$refs.time.innerText = timeFormat(
            this.player.currentTime,
            this.videoInfo.frameRate
          );
          break;
      }
    },
    playerBtnEvent(status) {
      //播放器 播放，暂停，停止
      switch (status) {
        case "play":
          this.ifPlay = true;
          this.player.play();
          break;
        case "pause":
          this.ifPlay = false;
          this.player.pause();
          break;
        case "stop":
          this.player.currentTime = 0;
          this.ifPlay = false;
          this.player.pause();
          this.$refs.progress.value = this.player.currentTime;
          this.$refs.time.innerText = timeFormat(
            this.player.currentTime,
            this.videoInfo.frameRate
          );
          break;
        case "back":
          this.player.currentTime -= 1 / this.videoInfo.frameRate;
          this.$refs.progress.value = this.player.currentTime;
          this.$refs.time.innerText = timeFormat(
            this.player.currentTime,
            this.videoInfo.frameRate
          );
          break;
        case "forward":
          this.player.currentTime += 1 / this.videoInfo.frameRate;
          this.$refs.progress.value = this.player.currentTime;
          this.$refs.time.innerText = timeFormat(
            this.player.currentTime,
            this.videoInfo.frameRate
          );
          break;
      }
    },
    logEvent(status) {
      let logIndex = (this.player.currentTime / this.player.duration) * 100;
      let logTime = timeFormat(
        this.player.currentTime,
        this.videoInfo.frameRate
      );
      switch (status) {
        case "login":
          ifLoginSmall(
            this.$refs.login,
            this.$refs.logout,
            true,
            logIndex,
            logTime
          );
          this.start = this.player.currentTime;
          this.loginTime = logTime;
          if (this.logReset === true) this.setLoginTime(this.loginTime);
          break;
        case "logout":
          // eslint-disable-next-line no-case-declarations
          let time = timeFormat(this.player.currentTime - this.start, this.videoInfo.frameRate);
          if (this.logReset === true) this.setLogTime(time);
          ifLoginSmall(
            this.$refs.login,
            this.$refs.logout,
            false,
            logIndex,
            logTime
          );
          break;
        case "logRemove":
          this.$refs.login.style.left = 0;
          this.$refs.logout.style.right = 0;
          break;
        case "toLogin":
          // eslint-disable-next-line no-case-declarations
          let left = isNaN(parseFloat(this.$refs.login.style.left))
            ? 0
            : parseFloat(this.$refs.login.style.left);
          this.player.currentTime = (this.player.duration * left) / 100;
          this.$refs.progress.value = this.player.currentTime;
          this.$refs.time.innerText = timeFormat(
            this.player.currentTime,
            this.videoInfo.frameRate
          );
          this.player.pause();
          this.ifPlay = false;
          break;
        case "toLogout":
          // eslint-disable-next-line no-case-declarations
          let right = isNaN(parseFloat(this.$refs.logout.style.right))
            ? 0
            : parseFloat(this.$refs.logout.style.right);
          this.player.currentTime =
            this.player.duration - (this.player.duration * right) / 100;
          this.$refs.progress.value = this.player.currentTime;
          this.$refs.time.innerText = timeFormat(
            this.player.currentTime,
            this.videoInfo.frameRate
          );
          this.player.pause();
          this.ifPlay = false;
          break;
      }

      function ifLoginSmall(login, logout, ifLogin, value, logTime) {
        let leftLog = isNaN(parseFloat(login.style.left))
          ? 0
          : parseFloat(login.style.left);
        let rightLog = isNaN(parseFloat(logout.style.right))
          ? 0
          : parseFloat(logout.style.right);
        if (ifLogin) {
          if (value <= 100 - rightLog) {
            login.style.left = value + "%";
          } else {
            login.style.left = value + "%";
            logout.style.right = 100 - value + "%";
          }
        } else {
          if (value > leftLog) {
            logout.style.right = 100 - value + "%";
          } else {
            login.style.left = value + "%";
            logout.style.right = 100 - value + "%";
          }
        }
      }
    },
    progressClick(event) {
      this.player.currentTime =
        (this.player.duration * event.offsetX) /
        this.$refs.progress.offsetWidth;
      this.$refs.progress.value = this.player.currentTime;
      this.$refs.time.innerText = timeFormat(
        this.player.currentTime,
        this.videoInfo.frameRate
      );
    },
    progressMouseEnter() {
      this.ifPreview = true;
      this.$refs.preview.style.display = "block";
    },
    progressMouseDown() {
      this.ifPreviewMouseDown = true;
    },
    progressMouseMove(event) {
      if (this.ifPreviewMouseDown) {
        this.player.currentTime =
          (this.player.duration * event.offsetX) /
          this.$refs.progress.offsetWidth;
        this.$refs.progress.value = this.player.currentTime;
        this.$refs.time.innerText = timeFormat(
          this.player.currentTime,
          this.videoInfo.frameRate
        );
      }
      if (this.ifPreview) {
        let canvas = document.createElement("canvas"); // 创建一个画布
        canvas.width = 100;
        canvas.height = 50;
        if (!this.playerPreview) return;
        this.playerPreview.currentTime =
          (this.player.duration * event.offsetX) /
          this.$refs.progress.offsetWidth;
        canvas
          .getContext("2d")
          .drawImage(this.playerPreview, 0, 0, canvas.width, canvas.height); // getContext:设置画布环境；drawImage:画画
        this.$refs.preview.src = canvas.toDataURL("image/png"); // 获取图片的url
        this.$refs.preview.style.left = event.offsetX - 50 + "px";
      }
    },
    progressMouseUp() {
      this.ifPreviewMouseDown = false;
    },
    progressMouseLeave() {
      this.ifPreview = false;
      this.$refs.preview.style.display = "none";
    },
    // 截图操作
    async screenshot() {
      this.playerBtnEvent("pause");
      this.loading = true;
      // TODO 改成本地截图上传
      try {
        let res = await API.getscreenshotList(
          this.player.currentTime,
          this.currentTask.id
        );
        if (res.code === 200) {
          this.updateScreenshotList(res.data);
        }
        this.loading = false;
      } catch (e) {
        this.$emit(e);
        this.loading = false;
      }
    },
    //改变播放视频声音大小
    volumeEvent(status) {
      let myVid = this.player;
      let value = this.$refs.range.value;
      switch (status) {
        case "volumeClick":
          if (!myVid.muted) {
            myVid.muted = true;
            this.$refs.range.value = 0;
          } else {
            myVid.muted = false;
            this.$refs.range.value = 100;
          }
          break;
        case "mouseDown":
          this.ifVolumeMouseDown = true;
          break;
        case "mouseMove":
          if (this.ifVolumeMouseDown) {
            myVid.volume = value / 100;
          }
          break;
        case "mouseUp":
          this.ifVolumeMouseDown = false;
          break;
      }
    },
    // btnClick() {
    //     //入点，出点时间
    //     let left = isNaN(parseFloat(this.$refs.login.style.left)) ? 0 : parseFloat(this.$refs.login.style.left)
    //     let right = isNaN(parseFloat(this.$refs.logout.style.right)) ? 0 : parseFloat(this.$refs.logout.style.right)
    //     console.log('入点时间', this.player.duration * left / 100)
    //     console.log(timeFormat(this.player.duration * left / 100, this.videoInfo.frameRate))
    //     console.log('出点时间', this.player.duration - this.player.duration * right / 100)
    //     console.log(timeFormat(this.player.duration - this.player.duration * right / 100, this.videoInfo.frameRate))
    // }
  },
};

//时分秒帧转换
function timeFormat(time, frameRate) {
  let timeStr = "";
  let stringFormat = (i) => {
    //if i<10 return '0'+i else return i
    return i < 10 ? `0${i}` : `${i}`;
  };
  let stringFrame = (i) => {
    let res = parseInt(i * frameRate);
    return res < 10 ? `0${res}` : `${res}`;
  };
  let minuteTime = 0;
  let secondTime = 0;
  let hourTime = 0;
  let setTime = parseInt(time);
  let setFrame = time - parseInt(time);
  if (setTime < 60) {
    timeStr = `00:00:${stringFormat(setTime)}:${stringFrame(setFrame)}`;
  } else if (setTime >= 60 && setTime < 3600) {
    minuteTime = parseInt(setTime / 60);
    secondTime = parseInt(setTime % 60);
    timeStr = `00:${stringFormat(minuteTime)}:${stringFormat(
      secondTime
    )}:${stringFrame(setFrame)}`;
  } else if (setTime >= 3600) {
    let _time = parseInt(setTime % 3600);
    hourTime = parseInt(setTime / 3600);
    minuteTime = parseInt(_time / 60);
    secondTime = parseInt(_time % 60);
    timeStr = `${stringFormat(hourTime)}:${stringFormat(
      minuteTime
    )}:${stringFormat(secondTime)}:${stringFrame(setFrame)}`;
  }
  return timeStr;
}
</script>

<style scoped lang="less">
.videoPlayer {
  @icon-color: rgba(0, 0, 0, 1);
  @font-size: 20px;
  @line-height: 20px;
  width: 100%;
  height: 100%;
  min-width: 500px;
  /*更改1：给整个div标签外套入一个卡片样式，以下的样式先注释*/
  /*box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);*/
  /*padding: 10px;*/
  /*position: relative;*/
  /*outline: none;*/
  /*cursor: default;*/
  /*background-color: white;*/

  .video_btn {
    .playerBtn {
      color: @icon-color;
      font-size: @font-size;
      line-height: @line-height;
      padding: 8px;
      user-select: none;
      cursor: pointer;
    }

    input[type="range"] {
      width: 100px;
      border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    }

    input[type="range"]::-webkit-slider-runnable-track {
      height: 10px;
      border-radius: 10px; /*将轨道设为圆角的*/
      box-shadow: 0 1px 1px #def3f8, inset 0 0.125em 0.125em #0d1112; /*轨道内置阴影效果*/
    }

    input[type="range"]:focus {
      outline: none;
    }

    input[type="range"]::-webkit-slider-thumb {
      /*-webkit-appearance: none;*/
      height: 25px;
      width: 25px;
      margin-top: -5px; /*使滑块超出轨道部分的偏移量相等*/
      background: #ffffff;
      border-radius: 50%; /*外观设置为圆形*/
      border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
      box-shadow: 0 0.125em 0.125em #3b4547; /*添加底部阴影*/
    }

    .time-box {
      //给原有的span秒数标签嵌套进一个内敛块样式（可调节宽高的内联样式），解决原有后面的元素快会根据秒数宽度改变的小bug
      height: auto;
      width: 8rem;
      display: inline-block;
    }

    .time {
      //background-color: #f56c6c;
      color: @icon-color;
      font-size: @font-size;
      font-weight: lighter;
      line-height: @line-height;
      padding: 5px;
    }

    .progress {
      position: relative;

      progress {
        width: 100%;
        height: 15px;
        background-color: #fff;
      }

      /* 表示总长度背景色 */

      progress::-webkit-progress-bar {
        background-color: #eee;
      }

      /* 表示已完成进度背景色 */

      progress::-webkit-progress-value {
        background: lightsalmon;
      }

      .login,
      .logout {
        height: 16px;
        width: 2px;
        background: black;
      }

      .login {
        position: absolute;
        left: 0;
      }

      .logout {
        position: absolute;
        right: 0;
      }

      .login::after {
        content: "入点";
        width: 30px;
        text-align: center;
        font-size: 1px;
        position: absolute;
        top: -15px;
        left: -14px;
      }

      .logout::after {
        content: "出点";
        width: 30px;
        text-align: center;
        font-size: 1px;
        position: absolute;
        top: 15px;
        left: -14px;
      }

      .video_preview {
        width: 100px;
        height: 50px;
        position: absolute;
        top: -50px;
        left: -50px;
        display: none;
      }
    }
  }
}
</style>
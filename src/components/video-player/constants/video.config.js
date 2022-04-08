
import timeFormat from "../utils/timeFormat";
import ifLoginSmall from '../utils/ifLoginSmall'

export const playBtnConfig = {
  play: {
    icon: 'el-icon-video-play',
    title: '播放(空格)',
    fn: (self) => {
      self.isPlay = true
      self.player.play()
      self.$emit('play')
    }
  },
  pause: {
    icon: 'el-icon-video-pause',
    title: '暂停(空格)',
    fn: (self) => {
      self.isPlay = false
      self.player.pause()
      self.$emit('pause')
    }
  },
  stop: {
    icon: 'el-icon-refresh-left',
    title: '停止(Enter)',
    fn: (self) => {
      self.isPlay = false
      self.player.currentTime = 0;
      self.player.pause();
      self.$refs.progress.value = self.player.currentTime;
      self.$refs.time.innerText = timeFormat(
        self.player.currentTime,
        self.frameRate
      );
      self.$emit('stop')
    }
  },
  backward: {
    icon: 'el-icon-arrow-left',
    title: '上一帧(方向左)',
    fn: (self) => {
      self.player.currentTime -= 1 / self.frameRate;
      self.$refs.progress.value = self.player.currentTime;
      self.$refs.time.innerText = timeFormat(
        self.player.currentTime,
        self.frameRate
      );
      self.$emit('backward')
    }
  },
  forward: {
    icon: 'el-icon-arrow-right',
    title: '下一帧(方向右)',
    fn: (self) => {
      self.player.currentTime += 1 / self.frameRate;
      self.$refs.progress.value = self.player.currentTime;
      self.$refs.time.innerText = timeFormat(
        self.player.currentTime,
        self.frameRate
      );
      self.$emit('forward')
    }
  },
  login: {
    icon: 'el-icon-sort-down',
    title: '入点',
    fn: (self) => {
      let logIndex = (self.player.currentTime / self.player.duration) * 100;
      ifLoginSmall(self.$refs.login, self.$refs.logout, true, logIndex);
      self.$emit('login')
    }
  },
  logout: {
    icon: 'el-icon-sort-up',
    title: '出点',
    fn: (self) => {
      let logIndex = (self.player.currentTime / self.player.duration) * 100;
      ifLoginSmall(self.$refs.login, self.$refs.logout, false, logIndex);
      self.$emit('logout')
    }
  },
  removeLog: {
    icon: 'el-icon-sort',
    title: '清除入点和出点',
    fn: (self) => {
      self.$refs.login.style.left = 0;
      self.$refs.logout.style.right = 0;
      self.$emit('removeLog')
    }
  },
  jumpLogin: {
    icon: 'el-icon-caret-bottom',
    title: '跳转至入点',
    fn: (self) => {
      let left = isNaN(parseFloat(self.$refs.login.style.left))
        ? 0
        : parseFloat(self.$refs.login.style.left);
      self.player.currentTime = (self.player.duration * left) / 100;
      self.$refs.progress.value = self.player.currentTime;
      self.$refs.time.innerText = timeFormat(
        self.player.currentTime,
        self.frameRate
      );
      self.player.pause();
      self.$emit('jumpLogin')
    }
  },
  jumpLogout: {
    icon: 'playerBtn el-icon-caret-top',
    title: '跳转至出点',
    fn: (self) => {
      let right = isNaN(parseFloat(self.$refs.logout.style.right))
        ? 0
        : parseFloat(self.$refs.logout.style.right);
      self.player.currentTime =
        self.player.duration - (self.player.duration * right) / 100;
      self.$refs.progress.value = self.player.currentTime;
      self.$refs.time.innerText = timeFormat(
        self.player.currentTime,
        self.frameRate
      );
      self.player.pause();
      self.$emit('jumpLogout')
    }
  }
}


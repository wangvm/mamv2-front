import API from "@/network/api";
// 引用loadsh
import _ from "lodash";

export default {
  // 用户登录
  async loginAction({ commit }, params) {
    try {
      const { account, password } = params;
      let res = await API.login(account, password);
      if (res.code === 200) {
        commit("updateLoginData", res.data);
      } else {
        commit("updateLoginData", {});
      }
    } catch (e) {
      this.$throw  = e;
    }
  },

  async getVideoInfoAction({ commit }, taskId) {
    try {
      // 修改接口实现获取视频信息
      let res = await API.getVideoInfo(taskId);
      if (res.code === 200) {
        // TODO 暂时测试，使用测试数据，正式需要使用一下操作
        // commit("setVideoInfo", res.data)
      } else {
        commit("setVideoInfo", {});
      }
    } catch (e) {
      this.$catch = e;
    }
  },
  async getProgramData({ commit }, catalogId) {
    try {
      let res = await API.getCatalogRecord("program", catalogId);
      if (res.code === 200) {
        commit("setProgramData", res.data);
      } else {
        commit("setProgramData", {});
      }
    } catch (e) {
      this.$catch = e;
    }
  },

  async getFragmentData({ commit }, catalogId) {
    try {
      let res = await API.getCatalogRecord("fragment", catalogId);
      if (res.code === 200) {
        commit("setFragmentData", res.data);
      } else {
        commit("setFragmentData", {});
      }
    } catch (e) {
      this.$catch = e;
    }
  },

  async getScenesData({ commit }, catalogId) {
    try {
      let res = await API.getCatalogRecord("scenes", catalogId);
      if (res.code === 200) {
        commit("setScenesData", res.data);
      } else {
        commit("setScenesData", {});
      }
    } catch (e) {
      this.$catch = e;
    }
  },
  //获取截图并更新
  updateScreenshotList({ commit, state }, val) {
    let imageList = _.cloneDeep(state.screenshotList);
    imageList.push({
      title: "",
      src: val,
    });
    commit("setScreenshotList", imageList);
  },
};

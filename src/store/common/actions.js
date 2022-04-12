import API from "@/network/api";
// 引用loadsh
import _ from "lodash";

export default {
  async getFragmentData({ commit }, catalogId) {
    let res = await API.getCatalogRecord("fragment", catalogId);
    if (res.code === 200) {
      commit("setFragmentData", res.data);
    } else {
      commit("setFragmentData", {});
    }
  },

  async getScenesData({ commit }, catalogId) {
    let res = await API.getCatalogRecord("scenes", catalogId);
    if (res.code === 200) {
      commit("setScenesData", res.data);
    } else {
      commit("setScenesData", {});
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

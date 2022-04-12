<template>
  <div class="home">
    <!-- 右上角操作按钮 -->
    <div class="onload">
      <el-button type="success" size="small" @click="saveCatalog()"
        >保存</el-button
      >
      <el-button type="primary" size="small" @click="commitAudit()"
        >提交审核</el-button
      >
    </div>
    <div class="home-left">
      <!-- 封装的播放器 -->
      <div class="home-video">
        <videoPlayer :video-info="videoInfo" :logReset="logRemove" />
      </div>
      <!-- 编目条目菜单 -->
      <!-- 使用Tree树形控件实现 -->
      <div class="home-list">
        <el-tree
          :data="menuData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          @node-click="handleMenuClick"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.content }}</span>
            <span>
              <span :style="{ 'margin-right': 10 + 'px' }">{{
                data.level
              }}</span>
              <el-button
                type="primary"
                size="mini"
                @click="() => append(node, data)"
                >添加</el-button
              >
              <el-button
                type="danger"
                size="mini"
                :disabled="data.level === '节目层'"
                @click="() => remove(node, data)"
                >删除</el-button
              >
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <!-- 编写三个Component，然后通过v-if和v-else-if实现切换不同层级的编目内容 -->
    <div class="home-right">
      <template v-if="currentLevel === '节目层'">
        <Program ref="program"></Program>
      </template>
      <template v-else-if="currentLevel === '片段层'">
        <Fragment ref="fragment"></Fragment
      ></template>
      <template v-else-if="currentLevel === '场景层'">
        <Scenes ref="scenes"></Scenes
      ></template>
    </div>
  </div>
</template>

<script>
import Scenes from "@/components/catalog-layer/scenes";
import Fragment from "@/components/catalog-layer/fragment";
import Program from "@/components/catalog-layer/program.vue";
/*
 * 目前处于点击左侧显示右侧对应信息
 * */
import videoPlayer from "@/components/video-player/video-player";
import { mapState, mapMutations, mapActions } from "vuex";
import API from "@/network/api";
import { message } from "@/assets/js/message";
import menuConverter from "@/utils/menuConverter";

// 引用loadsh
import _ from "lodash";
import catalogVue from "../catalog.vue";

export default {
  name: "catalog-edit",
  data() {
    return {
      // 当前选中的层次
      currentLevel: "节目层",
      //重置时间帧入点和出点
      logRemove: false,
      menuData: null,
      // 当前用于新建menu的id
      menuId: 0,
      currentMenuInfo: null,
      // 片段层数据的map存储，从服务获取以后保存到这个里面，避免重复请求
      // key为数据的id,值是整个fragmentData
      fragmentMap: null,
      scenesMap: null,
    };
  },
  created() {
    this.getMenuData();
  },

  components: {
    Scenes,
    Fragment,
    videoPlayer,
    Program,
  },
  watch: {
    screenshotList: "updateFormImageList",
    loginTime: "setEntryPoint",
    logTime: "setDuration",
  },
  computed: {
    ...mapState("common", [
      "currentTask",
      "videoSrc",
      "videoInfo",
      "screenshotList",
      "entryPoint",
      "outPoint",
      "logTime",
      "programData",
      "fragmentData",
      "scenesData",
    ]),
  },
  methods: {
    ...mapMutations("common", [
      "setscreenshotList",
      "setTaskStatus",
      "setProgramData",
      "setFragmentData",
      "setScenesData",
    ]),
    // ==================== 菜单操作 =================================
    async handleMenuClick(data, node) {
      this.saveData();
      // 获取对应数据
      this.getCatalogRecord(data);
      this.currentLevel = data.level;
      // 进入时保存一个版本号（hash）
      // 获取编目信息，并保存到vc的data中
      // 该信息分为节目层、片段层、场景层
      // 不同层传递到不同的编目组件中，分别为programData、fragmentData、scenesData
      // 使用map保存编目数据，id为key，对应key的编目数据为value
    },
    async saveData(){
      let res = {};
      // 保存数据
      switch (this.currentLevel) {
        case "节目层":
          try {
            res = await API.updateProgramRecord(this.programData);
          } catch (e) {
            message.error(e.message);
          }
          break;
        case "片段层":
          try {
            res = await API.updateFragmentRecord(this.fragmentData);
          } catch (e) {
            message.error(e.message);
          }
          break;
        case "场景层":
          try {
            res = await API.updateScenesRecord(this.scenesData);
          } catch (e) {
            message.error(e.message);
          }
          break;
        default:
          break;
      }
    },
    async getCatalogRecord(data){
      let res;
      // 更改为第一次获取的时候从服务器拿，后面从map拿
      switch (data.level) {
        case "片段层":
          try {
            res = await API.getCatalogRecord("fragment", data.catalogId);
            if (res.code === 200) {
              this.setFragmentData(res.data)
            }
          } catch (e) {
            message.error(e.message);
          }
          break;
        case "场景层":
          try {
            res = await API.getCatalogRecord("scenes", data.catalogId);
            if (res.code === 200) {
              this.setScenesData(res.data);
            }
          } catch (e) {
            message.error(e.message);
          }
          break;
        default:
          break;
      }
    },
    // 添加一个节点
    append(node, data) {
      let currentLevel = null;
      switch (data.level) {
        case "节目层":
          currentLevel = "片段层";
          break;
        case "片段层":
          currentLevel = "场景层";
          break;
        case "场景层":
          currentLevel = "场景层";
          break;
        default:
          break;
      }
      let parentId = data.level === "场景层" ? data.parent : data.id;
      const newChild = {
        id: ++this.menuId,
        check: 0,
        content: currentLevel + " new" + this.menuId,
        level: currentLevel,
        parent: parentId,
        children: [],
      };
      // 添加一个编目数据记录，根据level添加不同数据
      this.addCatalogRecord(newChild, node, data);
    },
    async addCatalogRecord(newChild, node, data) {
      let res = null;
      // 暂时做简单实现，直接从服务器获取数据覆盖本地fragmentData和scenesData
      // 后续改成新建的时候通过对象构造器构造，然后保存到map中
      try {
        switch (newChild.level) {
          case "片段层":
            this.fragmentData.menu = newChild;
            this.fragmentData.taskId = this.currentTask.id;
            this.fragmentData.title.value = newChild.content;
            res = await API.addFragmentRecord(this.fragmentData);
            break;
          case "场景层":
            this.scenesData.menu = newChild;
            this.scenesData.taskId = this.currentTask.id;
            this.scenesData.title.value = newChild.content;
            res = await API.addScenesRecord(this.scenesData);
            break;
        }
        if (res.code === 200) {
          if (data.level === "场景层") {
            node.parent.data.children.push(newChild);
          } else {
            newChild.children = [];
            data.children.push(newChild);
          }
          newChild.catalogId = res.data.id;
        } else {
          message.error(res.message);
        }
      } catch (e) {
        message.error(e.message);
      }
    },
    // 删除菜单节点
    async remove(node, data) {
      if (data.level === "片段层") {
        let scenesIds = [];
        data.children.forEach((element) => {
          scenesIds.push(element.catalogId);
        });
        // 删除子节点
        try {
          await API.deleteBulkScenes(scenesIds);
        } catch (e) {
          message.error(e.message);
        }
      }
      try {
        let record = data.level === "片段层" ? "fragment" : "scenes";
        let res = await API.deleteCatalogRecord(record, data.catalogId);
        if (res.code === 200) {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.id === data.id);
          children.splice(index, 1);
        } else {
          message.error(res.message);
        }
      } catch (e) {
        message.error(e.message);
      }
    },

    // 初始化界面数据
    async getMenuData() {
      let taskId = this.currentTask.id;
      try {
        let res = await API.getMenu(taskId);
        if (res.code === 200) {
          let menuList = [];
          res.data.forEach((element) => {
            this.menuId =
              element.menu.id > this.menuId ? element.menu.id : this.menuId;
            menuList.push({
              catalogId: element.catalogId,
              ...element.menu,
            });
          });
          let menuTree = menuConverter(menuList);
          this.menuData = menuTree;
        } else {
          message.error(res.message);
        }
      } catch (e) {
        message.error(e.message);
      }
    },
    // =============================================
    saveCatalog() {},
    commitAudit() {},
  },
};
</script>

<style scoped lang="less">
.home {
  background: rgb(209, 209, 209);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 85.5vh;

  .home-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 43%;
    height: 100%;
    min-width: 635px;

    .home-video {
      background: rgb(235, 234, 234);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 635px;
    }

    .home-list {
      background: rgb(235, 234, 234);
      width: 635px;
      height: 45%;
      overflow-y: scroll;
    }
  }

  .home-right {
    width: 55%;
    height: 100%;
    min-width: 50%;

    .home-right-card {
      background: rgb(235, 234, 234);
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .right-card-btns {
        position: sticky;
        top: 0.8em;
        z-index: 5;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .exame-style {
        background-color: antiquewhite;
      }
      .right-card-screenshot {
        width: 100%;
        height: auto;
        .screenshot-list {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 1%;
          width: 100%;
          height: 26em;
          overflow-y: scroll;
          border-radius: 0.5em;
          box-sizing: border-box;
          padding: 1em 0 0 1em;
          border: 0.1em solid rgb(204, 206, 211);
          .list-items {
            width: 13em;
            height: 10em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            margin: 0.5em 1em 0 0;
            padding: 0.3em;
            border: 0.1em solid rgb(204, 206, 211);
            box-sizing: border-box;
            border-radius: 0.5em;
            .item-image {
              width: 80%;
              height: auto;
            }
            .item-delete {
              width: 100%;
              height: 10%;
              display: flex;
              justify-content: flex-end;
              img {
                height: 100%;
                width: auto;
                cursor: pointer;
              }
            }
          }
          .list-items:hover {
            background-color: rgb(235, 238, 245);
          }
        }
      }
    }
  }
  // 操作按钮样式 保留
  .onload {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 1em;
    right: 1em;
    width: 15em;
    height: 3em;
  }
  .custom-tree-node {
    flex: 1;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    padding-right: 8px;
  }
  .el-tree {
    height: 45px;
    margin: 10px;
  }
}
</style>
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
          @current-change="handleMenuChange"
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
              >
                添加
              </el-button>
              <el-button
                type="danger"
                size="mini"
                :disabled="data.level === '节目层'"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <!-- 编写三个Component，然后通过v-if和v-else-if实现切换不同层级的编目内容 -->
    <div class="home-right">
      <el-card class="home-right-card" shadow="hover">
        <el-form ref="form" :model="form" size="small" label-width="110px">
          <el-form-item class="right-card-btns">
            <el-button type="primary" v-show="editAndView" @click="saveClick"
              >保存</el-button
            >
            <el-button @click="cancelClick" v-show="editAndView"
              >取消</el-button
            >
          </el-form-item>
          <el-form-item
            label="正题名"
            :class="{ 'exame-style': form.title.exame === 'false' }"
          >
            <el-input
              v-model="form.title.value"
              v-show="this.editAndView"
            ></el-input>
            <span v-show="!this.editAndView">{{ form.title.value }}</span>
          </el-form-item>
          <el-form-item
            label="首播日期"
            :class="{ 'exame-style': form.premiereDate.exame === 'false' }"
          >
            <el-date-picker
              v-model="form.premiereDate.value"
              type="date"
              placeholder="选择日期"
              v-show="this.editAndView"
            >
            </el-date-picker>
            <span v-show="!this.editAndView">{{
              form.premiereDate.value
            }}</span>
          </el-form-item>
          <el-form-item
            label="节目类型"
            :class="{ 'exame-style': form.programType.exame === 'false' }"
          >
            <el-select
              v-model="form.programType.value"
              placeholder="请选择活动区域"
              v-show="this.editAndView"
            >
              <el-option label="新闻" value="新闻"></el-option>
              <el-option label="专题" value="专题"></el-option>
              <el-option label="综艺" value="综艺"></el-option>
              <el-option label="素材" value="素材"></el-option>
            </el-select>
            <span v-show="!this.editAndView">{{ form.programType.value }}</span>
          </el-form-item>
          <el-form-item
            label="内容描述"
            :class="{
              'exame-style': form.contentDescription.exame === 'false',
            }"
          >
            <el-input
              type="textarea"
              v-model="form.contentDescription.value"
              v-show="this.editAndView"
            ></el-input>
            <span v-show="!this.editAndView">{{
              form.contentDescription.value
            }}</span>
          </el-form-item>
          <el-form-item
            label="字幕形式"
            :class="{ 'exame-style': form.subtitleForm.exame === 'false' }"
          >
            <el-select
              v-model="form.subtitleForm.value"
              placeholder="请选择活动区域"
              v-show="this.editAndView"
            >
              <el-option label="无字幕" value="无字幕"></el-option>
              <el-option
                label="只有画面叠加字幕"
                value="只有画面叠加字幕"
              ></el-option>
              <el-option label="只有隐藏字幕" value="只有隐藏字幕"></el-option>
              <el-option
                label="既有画面叠加字幕也有隐藏字幕"
                value="既有画面叠加字幕也有隐藏字幕"
              ></el-option>
            </el-select>
            <span v-show="!this.editAndView">{{
              form.subtitleForm.value
            }}</span>
          </el-form-item>
          <el-form-item label="创建者名称">
            <el-input
              v-model="form.taskName"
              v-show="this.editAndView"
            ></el-input>
            <h3 v-show="!this.editAndView">{{ form.taskName }}</h3>
          </el-form-item>
          <el-form-item label="创建者类型">
            <el-input
              v-model="form.taskType.value"
              v-show="this.editAndView"
            ></el-input>
            <h3 v-show="!this.editAndView">{{ form.taskType.value }}</h3>
          </el-form-item>
          <el-form-item
            label="其他责任者"
            :class="{ 'exame-style': form.groupMembers.exame === 'false' }"
          >
            <el-input
              v-model="form.groupMembers.value"
              v-show="this.editAndView"
            ></el-input>
            <span v-show="!this.editAndView">{{
              form.groupMembers.value
            }}</span>
          </el-form-item>
          <el-form-item
            label="节目形态"
            :class="{ 'exame-style': form.programForm.exame === 'false' }"
          >
            <el-select
              v-show="this.editAndView"
              v-model="form.programForm.value"
              placeholder="请选择活动区域"
            >
              <el-option label="口播新闻" value="口播新闻"></el-option>
              <el-option label="会议新闻" value="会议新闻"></el-option>
              <el-option label="新闻综述" value="新闻综述"></el-option>
              <el-option label="消息/简讯" value="消息/简讯"></el-option>
              <el-option label="专题" value="专题"></el-option>
              <el-option
                label="人物专访/介绍"
                value="人物专访/介绍"
              ></el-option>
              <el-option label="谈话" value="谈话"></el-option>
              <el-option label="宣传预告" value="宣传预告"></el-option>
              <el-option label="连续报道" value="连续报道"></el-option>
              <el-option label="深度报道" value="深度报道"></el-option>
              <el-option label="特别报道" value="特别报道"></el-option>
              <el-option label="系列报道" value="系列报道"></el-option>
              <el-option label="现场报道" value="现场报道"></el-option>
              <el-option label="其它" value="其它"></el-option>
              <el-option label="广告" value="广告"></el-option>
            </el-select>
            <span v-show="!this.editAndView">{{ form.programForm.value }}</span>
          </el-form-item>
          <el-form-item
            label="栏目"
            :class="{ 'exame-style': form.column.exame === 'false' }"
          >
            <el-input
              v-model="form.column.value"
              v-show="this.editAndView"
            ></el-input>
            <span v-show="!this.editAndView">{{ form.column.value }}</span>
          </el-form-item>
          <el-form-item
            label="色彩"
            :class="{ 'exame-style': form.color.exame === 'false' }"
          >
            <el-radio-group
              v-model="form.color.value"
              v-show="this.editAndView"
            >
              <el-radio label="彩色" value="1"></el-radio>
              <el-radio label="黑白" value="2"></el-radio>
            </el-radio-group>
            <span v-show="!this.editAndView">{{ form.color.value }}</span>
          </el-form-item>
          <el-form-item
            label="制式"
            :class="{ 'exame-style': form.standard.exame === 'false' }"
          >
            <el-radio-group
              v-model="form.standard.value"
              v-show="this.editAndView"
            >
              <el-radio label="PAL" value="1"></el-radio>
              <el-radio label="NTSC" value="2"></el-radio>
              <el-radio label="SECAM" value="3"></el-radio>
            </el-radio-group>
            <span v-show="!this.editAndView">{{ form.standard.value }}</span>
          </el-form-item>
          <el-form-item
            label="声道格式"
            :class="{ 'exame-style': form.channelFormat.exame === 'false' }"
          >
            <el-radio-group
              v-model="form.channelFormat.value"
              v-show="this.editAndView"
            >
              <el-radio label="单声道" value="1"></el-radio>
              <el-radio label="双声道" value="2"></el-radio>
              <el-radio label="立体声" value="3"></el-radio>
            </el-radio-group>
            <span v-show="!this.editAndView">{{
              form.channelFormat.value
            }}</span>
          </el-form-item>
          <el-form-item
            label="画面宽高比"
            :class="{ 'exame-style': form.AspectRatio.exame === 'false' }"
          >
            <el-radio-group
              v-model="form.AspectRatio.value"
              v-show="this.editAndView"
            >
              <el-radio label="4:3" value="1"></el-radio>
              <el-radio label="16:9" value="2"></el-radio>
              <el-radio label="14:9" value="3"></el-radio>
            </el-radio-group>
            <span v-show="!this.editAndView">{{ form.AspectRatio.value }}</span>
          </el-form-item>
          <el-form-item
            label="入点"
            :class="{ 'exame-style': form.entryPoint.exame === 'false' }"
          >
            <span v-show="this.editAndView">{{ form.entryPoint.value }}</span>
            <span v-show="!this.editAndView">{{ form.entryPoint.value }}</span>
          </el-form-item>
          <el-form-item
            label="时长"
            :class="{ 'exame-style': form.duration.exame === 'false' }"
          >
            <span v-show="this.editAndView">{{ form.duration.value }}</span>
            <span v-show="!this.editAndView">{{ form.duration.value }}</span>
          </el-form-item>
          <el-form-item
            label="资料获取方式"
            :class="{ 'exame-style': form.AcquisitionMethod.exame === 'false' }"
          >
            <el-input
              v-model="form.AcquisitionMethod.value"
              v-show="this.editAndView"
            ></el-input>
            <span v-show="!this.editAndView">{{
              form.AcquisitionMethod.value
            }}</span>
          </el-form-item>
          <el-form-item
            label="资料提供者"
            :class="{ 'exame-style': form.provider.exame === 'false' }"
          >
            <el-input
              v-model="form.provider.value"
              v-show="this.editAndView"
            ></el-input>
            <span v-show="!this.editAndView">{{ form.provider.value }}</span>
          </el-form-item>
          <el-form-item
            label="图片截取"
            v-model="form.imageList.value"
            class="right-card-screenshot"
          >
            <div style="color: #f56c6c">
              {{ form.imageList.exame === "false" ? "不合格" : "" }}
            </div>
            <div class="screenshot-list" v-show="this.editAndView">
              <div
                class="list-items"
                v-for="item in form.imageList.value"
                :key="item.src"
              >
                <div class="item-delete">
                  <img
                    src="@/assets/images/close.png"
                    alt="图片加载失败"
                    @click="deleteClick(item.src)"
                  />
                </div>
                <img class="item-image" :src="item.src" alt="" />
                <el-input
                  placeholder="请输入内容"
                  v-model="item.title"
                  size="mini"
                  clearable
                >
                </el-input>
              </div>
            </div>
            <div class="screenshot-list" v-show="!this.editAndView">
              <div
                class="list-items"
                v-for="item in form.imageList.value"
                :key="item.src"
              >
                <img class="item-image" :src="item.src" alt="" />
                <span>{{ item.title === "" ? "请编辑" : item.title }}</span>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
/*
 * 目前处于点击左侧显示右侧对应信息
 * */
import videoPlayer from "@/components/video-player/video-player";
import { mapState, mapMutations } from "vuex";
import API from "@/network/api";
import { message } from "@/assets/js/message";
import menuConverter from "@/utils/menuConverter";

// 引用loadsh
import _ from "lodash";
import catalogVue from '../catalog.vue';

export default {
  name: "catalog-edit",
  data() {
    return {
      //重置时间帧入点和出点
      logRemove: false,
      // 限制只能编辑一个
      isEdit: false,
      // 查看与编辑模式切换
      editAndView: false,
      // 寻找保存的那一个item
      count: null,
      state: "",
      // 标记子元素id
      index: 10,
      //播放器
      hasChildren: true,

      form: {
        title: { value: "", exame: true },
        premiereDate: { value: "", exame: true },
        programType: { value: "", exame: true },
        contentDescription: { value: "", exame: true },
        subtitleForm: { value: "", exame: true },
        taskName: this.taskName,
        taskType: { value: "", exame: true },
        groupMembers: { value: "", exame: true },
        programForm: { value: "", exame: true },
        column: { value: "", exame: true },
        color: { value: "", exame: true },
        standard: { value: "", exame: true },
        channelFormat: { value: "", exame: true },
        AspectRatio: { value: "", exame: true },
        entryPoint: { value: "--提示：请点击视频入点按钮获取--", exame: true },
        duration: { value: "--提示：请点击视频出点按钮获取--", exame: true },
        AcquisitionMethod: { value: "", exame: true },
        provider: { value: "", exame: true },
        imageList: { value: [], exame: true },
      },
      menuData: null,
      // 当前用于新建menu的id
      menuId: 0,
      currentMenuInfo: null,
      // 节目层数据
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
        },
        aspectRatio: {
          value: "320x240",
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
      // 片段层数据的map存储，从服务获取以后保存到这个里面，避免重复请求
      // key为数据的id,值是整个fragmentData
      fragmentMap: null,
      // 片段层数据的map存储，从服务获取以后保存到这个里面，避免重复请求
      // key为数据的id,值是整个fragmentData
      scenesMap: null,
    };
  },
  created() {
    this.getMenuData();
  },
  components: {
    videoPlayer,
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
    ]),
  },
  methods: {
    ...mapMutations("common", ["setscreenshotList", "setTaskStatus"]),
    // =============================================================================
    handleMenuClick(data, node) {
      // 进入时保存一个版本号（hash）
      // 获取编目信息，并保存到vc的data中
      // 该信息分为节目层、片段层、场景层
      // 不同层传递到不同的编目组件中，分别为programData、fragmentData、scenesData
      // 使用map保存编目数据，id为key，对应key的编目数据为value
    },
    handleMenuChange(data, node) {
      // 离开时对比版本号（hash），确定是否需要更新
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
      try{
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
        if(res.code === 200){
          if (data.level === "场景层") {
            node.parent.data.children.push(newChild);
          } else {
            newChild.children = [];
            data.children.push(newChild);
          }
          newChild.catalogId = res.data.id;
        }else{
          message.error(res.message)
        }
      }catch(e){
        message.error(e.message)
      }
    },
    // 删除菜单节点
    async remove(node, data) {
      if(data.level === '片段层'){
        let scenesIds = [];
        data.children.forEach(element => {
          scenesIds.push(element.catalogId);
        });
        // 删除子节点
        try{
          await API.deleteBulkScenes(scenesIds);
        }catch(e){
          message.error(e.message);
        }
      }
      try{
        let record = data.level==="片段层"?"fragment":"scenes";
        let res = await API.deleteCatalogRecord(record, data.catalogId);
        if(res.code === 200){
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex((d) => d.id === data.id);
          children.splice(index, 1);
        }else{
          message.error(res.message);
        }
      }catch(e){
        message.error(e.message)
      }
      
    },

    // 初始化界面数据
    async getMenuData() {
      let taskId = this.currentTask.id;
      try {
        let res = await API.getMenu(taskId);
        if(res.code === 200){
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
        }else{
          message.error(res.message);
        }
      } catch (e) {
        message.error(e.message);
      }
    },
    
    // =============================================
    // 点击查看详情
    lookClick(row) {
      if (this.editAndView === true) {
        this.$message("请结束修改再进行查看");
      } else {
        this.form = row;
      }
    },
    // 写入入点时间
    setEntryPoint() {
      this.form.entryPoint.value = this.loginTime;
    },
    // 写入时长
    setDuration() {
      this.form.duration.value = this.logTime;
    },
    // 更新表单图片数据
    updateFormImageList() {
      this.form.imageList.value = _.cloneDeep(this.screenshotList);
    },
    deleteClick(val) {
      for (let i in this.form.imageList.value) {
        if (this.form.imageList.value[i].src === val) {
          this.form.imageList.value.splice(i, 1);
          this.setscreenshotList(this.form.imageList.value);
        }
      }
    },
    // 保存更改
    saveClick() {
      this.logRemove = false;
      if (this.state === "节目") {
        this.catalogList[0].title.value = this.form.title.value;
        this.catalogList[0].premiereDate.value = this.form.premiereDate.value;
        this.catalogList[0].programType.value = this.form.programType.value;
        this.catalogList[0].contentDescription.value =
          this.form.contentDescription.value;
        this.catalogList[0].subtitleForm.value = this.form.subtitleForm.value;
        this.catalogList[0].taskName = this.form.taskName;
        this.catalogList[0].taskType = this.form.taskType.value;
        this.catalogList[0].groupMembers.value = this.form.groupMembers.value;
        this.catalogList[0].programForm.value = this.form.programForm.value;
        this.catalogList[0].column.value = this.form.column.value;
        this.catalogList[0].color.value = this.form.color.value;
        this.catalogList[0].standard.value = this.form.standard.value;
        this.catalogList[0].channelFormat.value = this.form.channelFormat.value;
        this.catalogList[0].AspectRatio.value = this.form.AspectRatio.value;
        this.catalogList[0].entryPoint.value = this.form.entryPoint.value;
        this.catalogList[0].duration.value = this.form.duration.value;
        this.catalogList[0].AcquisitionMethod.value =
          this.form.AcquisitionMethod.value;
        this.catalogList[0].provider.value = this.form.provider.value;
        this.catalogList[0].edit = false;
        // this.state = "节目";
        this.catalogList[0].imageList.value = this.form.imageList.value;
      } else if (this.state === "片段") {
        for (let i in this.catalogList[0].children) {
          if (this.count === this.catalogList[0].children[i].id) {
            // this.state = "片段";
            this.catalogList[0].children[i].title.value = this.form.title.value;
            this.catalogList[0].children[i].premiereDate.value =
              this.form.premiereDate.value;
            this.catalogList[0].children[i].programType.value =
              this.form.programType.value;
            this.catalogList[0].children[i].contentDescription.value =
              this.form.contentDescription.value;
            this.catalogList[0].children[i].subtitleForm.value =
              this.form.subtitleForm.value;
            this.catalogList[0].children[i].taskName = this.form.taskName;
            this.catalogList[0].taskType = this.form.taskType.value;
            this.catalogList[0].children[i].groupMembers.value =
              this.form.groupMembers.value;
            this.catalogList[0].children[i].programForm.value =
              this.form.programForm.value;
            this.catalogList[0].children[i].column.value =
              this.form.column.value;
            this.catalogList[0].children[i].color.value = this.form.color.value;
            this.catalogList[0].children[i].standard.value =
              this.form.standard.value;
            this.catalogList[0].children[i].channelFormat.value =
              this.form.channelFormat.value;
            this.catalogList[0].children[i].AspectRatio.value =
              this.form.AspectRatio.value;
            this.catalogList[0].children[i].entryPoint.value =
              this.form.entryPoint.value;
            this.catalogList[0].children[i].duration.value =
              this.form.duration.value;
            this.catalogList[0].children[i].AcquisitionMethod.value =
              this.form.AcquisitionMethod.value;
            this.catalogList[0].children[i].provider.value =
              this.form.provider.value;
            this.catalogList[0].children[i].edit = false;
            this.catalogList[0].children[i].imageList.value =
              this.form.imageList.value;
          }
        }
      } else if (this.state === "场景") {
        for (let i in this.catalogList[0].children) {
          for (let j in this.catalogList[0].children[i].children) {
            if (this.count === this.catalogList[0].children[i].children[j].id) {
              // this.state = "片段";
              this.catalogList[0].children[i].children[j].title.value =
                this.form.title.value;
              this.catalogList[0].children[i].children[j].premiereDate.value =
                this.form.premiereDate.value;
              this.catalogList[0].children[i].children[j].programType.value =
                this.form.programType.value;
              this.catalogList[0].children[i].children[
                j
              ].contentDescription.value = this.form.contentDescription.value;
              this.catalogList[0].children[i].children[j].subtitleForm.value =
                this.form.subtitleForm.value;
              this.catalogList[0].children[i].children[j].taskName =
                this.form.taskName;
              this.catalogList[0].taskType = this.form.taskType.value;
              this.catalogList[0].children[i].children[j].groupMembers.value =
                this.form.groupMembers.value;
              this.catalogList[0].children[i].children[j].programForm.value =
                this.form.programForm.value;
              this.catalogList[0].children[i].children[j].column.value =
                this.form.column.value;
              this.catalogList[0].children[i].children[j].color.value =
                this.form.color.value;
              this.catalogList[0].children[i].children[j].standard.value =
                this.form.standard.value;
              this.catalogList[0].children[i].children[j].channelFormat.value =
                this.form.channelFormat.value;
              this.catalogList[0].children[i].children[j].AspectRatio.value =
                this.form.AspectRatio.value;
              this.catalogList[0].children[i].children[j].entryPoint.value =
                this.form.entryPoint.value;
              this.catalogList[0].children[i].children[j].duration.value =
                this.form.duration.value;
              this.catalogList[0].children[i].children[
                j
              ].AcquisitionMethod.value = this.form.AcquisitionMethod.value;
              this.catalogList[0].children[i].children[j].provider.value =
                this.form.provider.value;
              this.catalogList[0].children[i].children[j].edit = false;
              this.catalogList[0].children[i].children[j].imageList.value =
                this.form.imageList.value;
            }
          }
        }
      }
      this.count = null;
      this.editAndView = false;
      this.isEdit = false;
      this.setscreenshotList([]);
    },
    cancelClick() {
      this.logRemove = false;
      if (this.state === "节目") {
        this.catalogList[0].edit = false;
      } else if (this.state === "片段") {
        for (let i in this.catalogList[0].children) {
          if (this.count === this.catalogList[0].children[i].id) {
            this.catalogList[0].children[i].edit = false;
          }
        }
      } else if (this.state === "场景") {
        for (let i in this.catalogList[0].children) {
          for (let j in this.catalogList[0].children[i].children) {
            if (this.count === this.catalogList[0].children[i].children[j].id) {
              this.catalogList[0].children[i].edit = false;
            }
          }
        }
      }
      this.count = null;
      this.editAndView = false;
      this.isEdit = false;
    },
    // 添加子行
    addItem(row) {
      if (row.state === "节目") {
        // 后续将id写成添加项中的index
        this.catalogList[0].children.push({
          id: this.index,
          // 指定片段名
          title: { value: "片段", exame: true },
          premiereDate: { value: "", exame: true },
          programType: { value: "", exame: true },
          contentDescription: { value: "", exame: true },
          subtitleForm: { value: "", exame: true },
          taskName: "",
          taskType: { value: "", exame: true },
          groupMembers: { value: "", exame: true },
          programForm: { value: "", exame: true },
          column: { value: "", exame: true },
          color: { value: "", exame: true },
          standard: { value: "", exame: true },
          channelFormat: { value: "", exame: true },
          AspectRatio: { value: "", exame: true },
          entryPoint: { value: "", exame: true },
          duration: { value: "", exame: true },
          AcquisitionMethod: { value: "", exame: true },
          provider: { value: "", exame: true },
          imageList: { value: [], exame: true },
          children: [],
          state: "片段",
          edit: false,
        });
        this.index++;
      } else if (row.state === "片段") {
        for (let i in this.catalogList[0].children) {
          if (row.id === this.catalogList[0].children[i].id) {
            this.catalogList[0].children[i].children.push({
              id: this.index,
              // 指定片段名
              title: { value: "场景", exame: true },
              premiereDate: { value: "", exame: true },
              programType: { value: "", exame: true },
              contentDescription: { value: "", exame: true },
              subtitleForm: { value: "", exame: true },
              taskName: "",
              taskType: { value: "", exame: true },
              groupMembers: { value: "", exame: true },
              programForm: { value: "", exame: true },
              column: { value: "", exame: true },
              color: { value: "", exame: true },
              standard: { value: "", exame: true },
              channelFormat: { value: "", exame: true },
              AspectRatio: { value: "", exame: true },
              entryPoint: { value: "", exame: true },
              duration: { value: "", exame: true },
              AcquisitionMethod: { value: "", exame: true },
              provider: { value: "", exame: true },
              imageList: { value: [], exame: true },
              state: "场景",
              edit: false,
            });
            this.index++;
          }
        }
      }
    },
    // 删除行
    deleteItem(row) {
      if (row.state === "片段") {
        for (let i in this.catalogList[0].children) {
          if (row.id === this.catalogList[0].children[i].id) {
            this.catalogList[0].children.splice(i, 1);
          }
        }
      } else if (row.state === "场景") {
        for (let i in this.catalogList[0].children) {
          for (let j in this.catalogList[0].children[i].children)
            if (row.id === this.catalogList[0].children[i].children[j].id) {
              this.catalogList[0].children[i].children.splice(j, 1);
            }
        }
      }
    },
    // 编辑内容
    editItem(row) {
      this.logRemove = true;
      if (this.isEdit === false) {
        this.isEdit = true;
        row.edit = true;
        this.count = row.id;
        this.form = _.cloneDeep(row);
        this.state =
          row.state === "节目"
            ? "节目"
            : row.state === "片段"
            ? "片段"
            : "场景";
        this.editAndView = true;
        // this.setscreenshotList([]);
      } else {
        this.$message("请保存或取消上一编辑内容");
      }
    },
    // 上传至后端保存数据
    async saveCatalog() {
      this.$confirm("请再次确认编目内容是否已保存！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let uploadList = _.cloneDeep(this.catalogList);
          delete uploadList[0].id;
          delete uploadList[0].edit;
          delete uploadList[0].state;
          if (uploadList[0].children.length !== 0) {
            for (let i in uploadList[0].children) {
              delete uploadList[0].children[i].id;
              delete uploadList[0].children[i].edit;
              delete uploadList[0].children[i].state;
              if (uploadList[0].children[i].children.length !== 0) {
                for (let j in uploadList[0].children[i].children) {
                  delete uploadList[0].children[i].children[j].id;
                  delete uploadList[0].children[i].children[j].edit;
                  delete uploadList[0].children[i].children[j].state;
                }
              }
            }
          }
          uploadList[0].taskName = this.taskName;
          // console.log(uploadList[0]);
          try {
            API.updateCatalog(uploadList[0]);
            this.$router.push("/edit/task");
          } catch (e) {
            this.$message(e);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上传",
          });
        });
    },
    async commitAudit() {
      let res = await API.updateTask(this.taskName, 4);
      if (res.code === 200) {
        this.saveCatalog();
        // this.$router.push("/edit/task");
        this.setTaskStatus(4);
      }
    },
  },
};
</script>

<style scoped lang="less">
.home {
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: 635px;
    }

    .home-list {
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
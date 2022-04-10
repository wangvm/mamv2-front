<template>
  <div>
    <el-card class="home-right-card" shadow="hover">
      <el-input v-model="programData.title.value"></el-input>
      <el-form ref="form" :model="form" size="small" label-width="110px">
        <el-form-item class="right-card-btns">
          <el-button type="primary" v-show="editAndView" @click="saveClick">保存</el-button>
          <el-button @click="cancelClick" v-show="editAndView">取消</el-button>
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
          <span v-show="!this.editAndView">{{ form.premiereDate.value }}</span>
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
          <span v-show="!this.editAndView">{{ form.subtitleForm.value }}</span>
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
          <span v-show="!this.editAndView">{{ form.groupMembers.value }}</span>
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
            <el-option label="人物专访/介绍" value="人物专访/介绍"></el-option>
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
          <el-radio-group v-model="form.color.value" v-show="this.editAndView">
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
          <span v-show="!this.editAndView">{{ form.channelFormat.value }}</span>
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
</template>

<script>
import API from "@/network/api";
import _ from "lodash";
export default {
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
    }
  },
  mounted() {
    console.log(this.programData);
  },
  props:{
    programData: Object,
  },
  methods:{
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
  }
};
</script>

<style lang="less" scoped>
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
}
</style>
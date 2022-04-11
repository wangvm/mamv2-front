<template>
  <el-card class="home-right-card" shadow="hover">
    <div class="right-card-btn">
      <el-button type="primary" size="small" v-show="editAndView" @click="saveData">保存</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">
        正题名
      </el-col>
      <el-col :span="21">
        <el-input v-model="programData.title.value" size="medium"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">内容描述</el-col>
      <el-col :span="21">
        <el-input
          type="textarea"
          v-model="programData.description.value"
          v-show="this.editAndView"
        ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">首播日期</el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="programData.debutDate.value"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-col>
      <el-col :span="2" class="colLabel">节目类型</el-col>
      <el-col :span="6">
       <el-select
          v-model="programData.programType.value"
          placeholder="请选择节目类型">
          <el-option label="新闻" value="新闻"></el-option>
          <el-option label="专题" value="专题"></el-option>
          <el-option label="综艺" value="综艺"></el-option>
          <el-option label="素材" value="素材"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">字幕形式</el-col>
      <el-col :span="6">
        <el-select
          v-model="programData.subtitleForm.value"
          placeholder="请选择字幕形式"
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
      </el-col>
      <el-col :span="2" class="colLabel">节目形态</el-col>
      <el-col :span="6">
        <el-select
          v-show="this.editAndView"
          v-model="programData.programForm.value"
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
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">创建者名称</el-col>
      <el-col :span="21">
        <el-input v-model="programData.creator.value"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">其他责任者</el-col>
      <el-col :span="21">
        <el-input v-model="programData.contributor.value" />
      </el-col>
    </el-row>    
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">栏目</el-col>
      <el-col :span="6">
        <el-input v-model="programData.column.value" />
      </el-col>
      <el-col :span="2" class="colLabel">色彩</el-col>
      <el-col :span="6">
        <el-radio-group v-model="programData.color.value" class="colLabel">
          <el-radio label="彩色" value="1"></el-radio>
          <el-radio label="黑白" value="2"></el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">制式</el-col>
      <el-col :span="7">
        <el-radio-group v-model="programData.system.value" class="colLabel">
          <el-radio label="PAL" value="1"></el-radio>
          <el-radio label="NTSC" value="2"></el-radio>
          <el-radio label="SECAM" value="3"></el-radio>
        </el-radio-group>
      </el-col>
      <el-col :span="2" class="colLabel">声道格式</el-col>
      <el-col :span="8">
        <el-radio-group v-model="programData.audioChannel.value" class="colLabel">
          <el-radio label="单声道" value="1"></el-radio>
          <el-radio label="双声道" value="2"></el-radio>
          <el-radio label="立体声" value="3"></el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">画面宽高比</el-col>
      <el-col :span="7">
        <el-radio-group v-model="programData.aspectRatio.value" class="colLabel">
          <el-radio label="4:3" value="1"></el-radio>
          <el-radio label="16:9" value="2"></el-radio>
          <el-radio label="14:9" value="3"></el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">入点</el-col>
      <el-col :span="6">
        <el-input v-model="programData.startPoint.value" disabled/>
      </el-col>
      <el-col :span="2" class="colLabel">出点</el-col>
      <el-col :span="6">
        <el-input v-model="programData.outPoint.value" disabled/>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">资料获取方式</el-col>
      <el-col :span="6">
        <el-input v-model="programData.sourceAcquiringMethod.value"/>
      </el-col>
      <el-col :span="3" class="colLabel">资料提供者</el-col>
      <el-col :span="6">
        <el-input v-model="programData.sourceProvider.value"/>
      </el-col>
    </el-row> 
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">关键帧</el-col>
      <el-col :span="21" class="right-card-screenshot">
        <div style="color: #f56c6c">
          {{ programData.keyFrames.check === 1 ? "不合格" : "" }}
        </div>
        <div class="screenshot-list" v-show="this.editAndView">
          <div class="list-items" v-for="item in programData.keyFrames" :key="item.address">
            <div class="item-delete">
              <img
                src="@/assets/images/close.png"
                alt="图片加载失败"
                @click="deleteClick(item.src)"
              />
            </div>
            <img class="item-image" :src="item.src" alt="" />
            <el-input placeholder="请输入关键帧描述" v-model="item.description" size="mini" clearable></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import API from "@/network/api";
import _ from "lodash";
import { mapState,mapMutations } from 'vuex';
export default {
  data() {
    return {
      //重置时间帧入点和出点
      logRemove: false,
      // 限制只能编辑一个
      isEdit: false,
      // 查看与编辑模式切换
      editAndView: true,
      // 寻找保存的那一个item
      count: null,
      state: "",
      // 标记子元素id
      index: 10,
      //播放器
      hasChildren: true,
    }
  },
  computed:{
    ...mapState("common", [      
      "programData",
      "authority",
    ]),
    // 页面显示模式，编辑还是审核
    pageMode(){

      return true;
    },
  },
  methods:{
    ...mapMutations("common", ["setProgramData"]),
    // 保存更改
    saveData() {
      this.logRemove = false;
      this.setProgramData(this.programData);
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
.home-right {
  // width: 100%;
  height: 100%;
  min-width: 50%;

  .home-right-card {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .right-card-btn {
      position: sticky;
      top: 0.8em;
      z-index: 5;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 5px;
    }
    .exame-style {
      background-color: antiquewhite;
    }
    .right-card-screenshot {
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: right;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.colLabel{
  line-height: 36px;
  text-align: right;
  font-size: 14px;
}
</style>
<template>
  <div>
    <el-card class="home-right-card" shadow="hover">
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
export default {};
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
<template>
  <el-card class="home-right-card" shadow="hover">
    <div class="right-card-btn">
      <el-button type="primary" size="small" @click="saveData">保存</el-button>
    </div>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel"> 题名 </el-col>
      <el-col :span="20">
        <el-input v-model="fragmentData.title" size="medium"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">内容描述</el-col>
      <el-col :span="20">
        <el-input
          type="textarea"
          v-model="fragmentData.description"
        ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">字幕形式</el-col>
      <el-col :span="6">
        <el-select
          v-model="fragmentData.subtitleForm"
          placeholder="请选择字幕形式"
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
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">入点</el-col>
      <el-col :span="6">
        <div>
          <p class="colLabel" style="text-align: left">
            {{ startPoint }}
          </p>
        </div>
      </el-col>

      <el-col :span="2" class="colLabel">出点</el-col>
      <el-col :span="6">
        <div>
          <p class="colLabel" style="text-align: left">
            {{ outPoint }}
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">资料获取方式</el-col>
      <el-col :span="6">
        <el-input v-model="fragmentData.sourceAcquiringMethod" />
      </el-col>
      <el-col :span="3" class="colLabel">资料提供者</el-col>
      <el-col :span="6">
        <el-input v-model="fragmentData.sourceProvider" />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="3" class="colLabel">关键帧</el-col>
      <el-col :span="20" class="right-card-screenshot">
        <div class="screenshot-list">
          <div
            class="list-items"
            v-for="item in fragmentData.keyFrames"
            :key="item.address"
          >
            <div class="item-delete">
              <img
                src="@/assets/images/close.png"
                alt="图片加载失败"
                @click="deleteClick(item.address)"
              />
            </div>
            <img class="item-image" :src="item.address" alt="" />
            <el-input
              placeholder="请输入关键帧描述"
              v-model="item.description"
              size="mini"
              clearable
            ></el-input>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import API from "@/network/api";
import { message } from "@/assets/js/message";
import timeFormat from "@/utils/timeFormat";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("common", [
      "fragmentData",
      "authority",
      "currentTask",
      "videoInfo",
    ]),
    displaySwitch() {
      return (
        (this.currentTask.status === "审核中" &&
          this.authority === "ROLE_AUDITOR") ||
        (this.currentTask.status === "待修改" &&
          this.authority === "ROLE_CATALOGER")
      );
    },
    startPoint() {
      let time = timeFormat(
        this.fragmentData.startPoint,
        this.videoInfo.frameRate
      );
      return time;
    },
    outPoint() {
      let time = timeFormat(
        this.fragmentData.outPoint,
        this.videoInfo.frameRate
      );
      return time;
    },
  },
  methods: {
    // 保存更改
    async saveData() {
      this.logRemove = false;
      // 保存数据
      try {
        let res = await API.updateFragmentRecord(this.fragmentData);
        if (res.code !== 200) {
          message.error(res.message);
        }
      } catch (e) {
        message.error(e.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home-right {
  // width: 100%;
  height: 100%;
  min-width: 50%;
  .colLabel {
    line-height: 36px;
    text-align: right;
    font-size: 14px;
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
      margin: 0 35px 10px 0;
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
          height: 13em;
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
</style>
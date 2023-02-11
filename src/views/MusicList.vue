<template>
  <div class="main">
    <div class="title">默认列表</div>
    <ul class="btns">
      <li>
        <div class="iconfont icon-piliangcaozuo"></div>
        <span>批量操作</span>
      </li>
      <li @click="addMusicFile()">
        <div class="iconfont icon-SanMiAppoutlinei1"></div>
        <span>添加</span>
      </li>
    </ul>
    <div class="music-list">
      <div class="list-head">
        <div class="music-name">歌曲名</div>
        <div class="music-singer">歌手</div>
        <div class="music-from">专辑</div>
        <div class="music-time">时长</div>
      </div>
      <div class="list-body">
        <div
          class="list-body-item"
          v-for="(item, i) of musicFilesPath"
          :key="i"
          @mouseenter="handleEnter(item)"
          @mouseleave="handleLeave(item)"
          :class="{ activeMusic: item.id === currentMusic.id }"
        >
          <div class="music-name">
            <span :title="item.name">{{ item.name }}</span>
            <div
              class="music-btns"
              v-show="isShowMusicBtns && item.id === currentIndex"
            >
              <div class="iconfont icon-play" @click="handlePlay(item)"></div>
              <div
                class="iconfont icon-delete"
                @click="handleDelete(item)"
              ></div>
            </div>
          </div>
          <div class="music-singer" :title="item.singer">{{ item.singer }}</div>
          <div class="music-from">专辑名</div>
          <div class="music-time">{{ convertDuration(item.time) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, watchEffect } from "vue";
import { convertDuration } from "@/utils/helper.js";
import bus from "@/utils/eventBus.js";

let musicFilesPath = ref([]);
onMounted(async () => {
  musicFilesPath.value = await myApi.getMusic();
});
// 添加音乐获取到音乐文件并渲染出来
const addMusicFile = async () => {
  musicFilesPath.value = await myApi.addMusic();
};
let currentIndex = ref("");
let currentMusic = reactive({});
let isShowMusicBtns = ref(true);
// 鼠标移入
const handleEnter = (item) => {
  // console.log(item);
  currentIndex.value = item.id;
};
// 鼠标移出
const handleLeave = (item) => {
  currentIndex.value = "";
};

// 音乐播放
const handlePlay = (item) => {
  currentMusic = item;

  bus.emit("musicInfo", item);
};

// 音乐删除
const handleDelete = (item) => {
  // musicAudio.pause();
};
</script>

<style lang="less" scoped>
@import url(@/assets/gundongtiao.less);
.main {
  width: calc(100% - 200px);
  height: 100%;
  background-color: #fff;
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  -webkit-app-region: no-drag;
}
.title {
  font-size: 26px;
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
}
.btns {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  margin-top: 0;
  margin-bottom: 0;
  li {
    display: flex;
    justify-content: center;
    align-self: center;
    padding: 0 8px;
    border-radius: 5px;
    margin-right: 10px;
    background-color: #999;
    color: #fff;
    cursor: pointer;
    > div {
      width: 18px;
      height: 18px;
      font-size: 16px;
      margin-right: 3px;
    }
    > span {
      font-size: 12px !important;
    }
    &:hover {
      background-color: #27c448;
    }
  }
}
.music-list {
  height: calc(100% - 60px - 40px);
  // background-color: rgb(197, 52, 52);
  padding: 5px 10px;

  .music-item() {
    display: flex;
    .music-name {
      flex: 3;
      padding-left: 5px;
      display: flex;
      justify-content: space-between;
      span {
        max-width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
      }
      .music-btns {
        width: 20%;
        display: flex;
        margin-right: 20px;
        > div {
          margin-right: 5px;
          cursor: pointer;
        }
      }
    }
    .music-singer {
      flex: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }
    .music-from {
      flex: 2;
    }
    .music-time {
      flex: 1;
    }
  }
  .list-head {
    height: 40px;
    line-height: 40px;
    .music-item();
  }
  .list-body {
    height: calc(100% - 40px);
    overflow: auto;
    display: flex;
    flex-direction: column;
    .gundongtiao;
    .list-body-item {
      height: 30px;
      line-height: 30px;
      display: flex;
      flex-direction: row;
      .music-item();
      &.activeMusic,
      &:hover {
        background-color: #e3e3e3;
      }
    }
  }
}
</style>

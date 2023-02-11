<template>
  <div class="footer">
    <!-- 进度条 -->
    <div class="progress-container">
      <div class="progress" :style="{ width: progressWidth + '%' }"></div>
    </div>
    <div class="footer-container">
      <div class="music-left">
        <slot name="left">
          <div class="music-img" @click="gotoDetail()">
            <img src="../assets/music.png" alt="" />
          </div>
          <div class="music-info">
            <span>{{ currentMusic.name }}-{{ currentMusic.singer }}</span>
            <span>
              {{ convertDuration(currentTime) }} /
              {{
                currentMusic.time ? convertDuration(currentMusic.time) : "00:00"
              }}
            </span>
          </div>
        </slot>
      </div>
      <div class="music-center">
        <div class="iconfont icon-prev" @click="prevHandle"></div>
        <div class="iconfont icon-play-full" @click="toggleHandle"></div>
        <div class="iconfont icon-next" @click="nextHandle"></div>
      </div>
      <div class="music-right">
        <div class="iconfont icon-yinliang"></div>
        <div class="iconfont icon-liebiaoxunhuan"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import bus from "@/utils/eventBus.js";
import { convertDuration } from "@/utils/helper.js";

import { useRouter } from "vue-router";

const router = useRouter();
const gotoDetail = () => {
  router.replace("/detail");
};

let musicAudio = reactive(new Audio());

// 获取当前播放音乐信息
let currentMusic = reactive({});
bus.on("musicInfo", (data) => {
  // console.log(data);
  currentMusic = data;
  musicAudio.src = data.path;
  musicAudio.play();
});

// 获取当前播放进度
// 进度条宽度
let progressWidth = ref(0);
// 当前播放时间
let currentTime = ref(0);
musicAudio.ontimeupdate = (event) => {
  currentTime.value = musicAudio.currentTime;
  progressWidth.value = Math.floor(
    (musicAudio.currentTime / currentMusic.time) * 100
  );
  if (currentMusic.time - musicAudio.currentTime < 0.1) {
    progressWidth.value = 100;
  }
};

// 播放上一首歌曲
const prevHandle = () => {};
// 播放下一首歌曲
const nextHandle = () => {};
// 播放/暂停切换
const toggleHandle = () => {};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 80px;
  background-color: rgb(255, 255, 255);

  -webkit-app-region: no-drag;
}

.progress-container {
  height: 5px;
  width: 100%;
  background-color: #e3e3e3;
  .progress {
    // width: 20%;
    height: 100%;
    background-color: #27c448;
  }
}
.footer-container {
  height: calc(100% - 3px);
  display: flex;
  .music-left {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // background-color: rgb(212, 53, 53);
    padding-left: 10px;
  }
  .music-center {
    flex: 1;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-evenly;
    align-items: center;
    .iconfont {
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-self: center;
      cursor: pointer;
      &.icon-prev,
      &.icon-next {
        width: 40px;
        height: 40px;
      }
      &.icon-play-full {
        font-size: 42px;
        width: 50px;
        height: 50px;
        background-color: #27c448;
        border-radius: 50%;
      }
    }
  }
  .music-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
    .iconfont {
      width: 20px;
      height: 20px;
      font-size: 16px;
      cursor: pointer;
      // border: 1px solid #000;
    }
  }
}
.music-img {
  width: 50px;
  height: 50px;
  border: 1px solid #d3d3d3;
  margin-right: 5px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  &::before {
    content: "";
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.6) url(../assets/topArrow.png) center center
      no-repeat;
    border-radius: 3px;
    background-size: 65% 80%;
    position: absolute;
    top: -1px;
    left: -1px;
    opacity: 0;
  }
  &:hover::before {
    opacity: 0.8;
  }
}
.music-info {
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

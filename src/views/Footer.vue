<template>
  <div class="footer">
    <!-- 进度条 -->
    <div class="progress-container" @click="progressHandle">
      <div class="progress" :style="{ width: progressWidth + '%' }"></div>
    </div>
    <div class="footer-container">
      <div class="music-left">
        <slot name="left">
          <div class="music-img" @click="gotoDetail()">
            <img src="../assets/music.png" alt="" />
          </div>
          <div class="music-info">
            <span v-if="currentMusic.name"
              >{{ currentMusic.name }}-{{ currentMusic.singer }}</span
            >
            <span v-else></span>
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
        <div
          class="iconfont"
          :class="isPlay ? 'icon-pause-full' : 'icon-play-full'"
          @click="toggleHandle"
        ></div>
        <div class="iconfont icon-next" @click="nextHandle"></div>
      </div>
      <div class="music-right">
        <div
          class="iconfont icon-yinliang"
          title="调节音量"
          @mouseenter="handleEnter"
          @mouseleave="handleLeave"
        >
          <div class="volume" v-show="isShowVolume">
            <div
              class="iconfont icon-checkbox-minus-full"
              @click="handleVolume('sub')"
            ></div>
            <div>{{ audioVolume }}</div>
            <div
              class="iconfont icon-checkbox-plus-full"
              @click="handleVolume('add')"
            ></div>
          </div>
        </div>
        <div class="iconfont icon-liebiaoxunhuan"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRaw } from "vue";
import lyricsParse from "lyrics-parse";
import bus from "@/utils/eventBus.js";
import { convertDuration } from "@/utils/helper.js";

import { useRouter } from "vue-router";
// 路由跳转
const router = useRouter();
const gotoDetail = () => {
  router.replace("/detail");
};

let musicAudio = reactive(new Audio());

// 获取当前播放音乐信息
let currentMusic = reactive({});
bus.on("musicInfo", async (data) => {
  // console.log(data);
  currentMusic = data;
  musicAudio.src = data.path;
  const lyrics = await lyricsParse(currentMusic.name, currentMusic.singer);
  console.log(lyrics);
  musicAudio.play();
  isPlay.value = true;
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
    nextHandle();
  }
};

// 播放上一首歌曲
const prevHandle = async () => {
  currentMusic = await myApi.getPrevMusic(toRaw(currentMusic));
  musicAudio.src = currentMusic.path;
  musicAudio.play();

  bus.emit("preMusic", currentMusic);
};
// 播放下一首歌曲
const nextHandle = async () => {
  currentMusic = await myApi.getNextMusic(toRaw(currentMusic));
  musicAudio.src = currentMusic.path;
  musicAudio.play();

  bus.emit("nextMusic", currentMusic);
};

let isPlay = ref(false);
// 播放/暂停切换
const toggleHandle = async () => {
  isPlay.value = !isPlay.value;
  if (isPlay.value) {
    if (!musicAudio.src) {
      currentMusic = await myApi.getNextMusic(toRaw(currentMusic));
      musicAudio.src = currentMusic.path;
    }
    musicAudio.play();
  } else {
    musicAudio.pause();
  }
};

// 点击进度条进行跳转
const progressHandle = (e) => {
  e.stopPropagation();
  // console.log(e);
  // console.log(e.target.offsetWidth);
  let currPoint = e.pageX;
  let currWidth = e.target.offsetWidth;
  console.log(currPoint / currWidth);
  musicAudio.currentTime = (currPoint / currWidth) * musicAudio.duration;
  progressWidth.value = Math.floor(
    (musicAudio.currentTime / currentMusic.time) * 100
  );
};

let isShowVolume = ref(false);
// 鼠标移入/移出显示/隐藏音量控制
const handleEnter = () => {
  isShowVolume.value = true;
};
const handleLeave = () => {
  isShowVolume.value = false;
};

let audioVolume = ref("50%");
musicAudio.volume = Number(audioVolume.value.slice(0, -1) / 100);
// 控制音量加减---注意会出现精度问题
const handleVolume = (type) => {
  let volume = Number(musicAudio.volume.toFixed(2));
  if (volume < 0 || volume > 1) return;
  let volumeNum = Number(audioVolume.value.slice(0, -1));
  if (type === "sub") {
    musicAudio.volume = Number(((volume * 100 - 1) / 100).toFixed(2));
    audioVolume.value = volumeNum - 1 + "%";
  } else if (type === "add") {
    musicAudio.volume = Number(((volume * 100 + 1) / 100).toFixed(2));
    audioVolume.value = volumeNum + 1 + "%";
  }
};
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
  cursor: pointer;
  .progress {
    // width: 20%;
    height: 100%;
    background-color: #27c448;
    position: relative;
    &:hover::after {
      content: "";
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #f00;
      position: absolute;
      top: -50%;
      right: 0;
    }
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
      &.icon-pause-full,
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
      &.icon-yinliang {
        position: relative;
        .volume {
          position: absolute;
          top: -40px;
          left: -30px;
          display: flex;
          padding: 10px 5px;
          background-color: #fff;
          box-shadow: 0 0 5px #ccc;
          justify-content: space-evenly;
          align-items: center;
          width: 70px;
          height: 40px;
          > .iconfont {
            width: 18px;
            height: 19px;
          }
        }
      }
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

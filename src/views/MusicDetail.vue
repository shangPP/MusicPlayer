<template>
  <div class="container">
    <WindowHandles />
    <div class="music-detail">
      <div class="left">
        <div class="music-img">
          <img :src="currentMusic.music_img" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="music-info">
          <h3>{{ music_name }}</h3>
          <div class="music-singer">
            <span>歌手：</span>
            <span>{{ music_singer }}</span>
          </div>
          <div class="music-from">
            <span>专辑：</span>
            <span>{{ music_from }}</span>
          </div>
          <div class="music-lyrics">
            <ul
              class="lyrics-container"
              :style="{ top: '-' + lyricsTop + 'px' }"
              v-if="lyrics.length > 2"
            >
              <li
                v-for="(item, i) of lyrics"
                :key="i"
                :style="{
                  color: currenIndex == i ? '#f00' : '#000',
                  fontSize: currenIndex == i ? '24px' : '16px',
                }"
              >
                <span v-show="false">{{ splitEveryLineLyric(item)[0] }}</span>
                <span>{{ splitEveryLineLyric(item)[1] }}</span>
              </li>
            </ul>
            <div class="lyrics-no" v-else>暂无歌词</div>
          </div>
        </div>
      </div>
    </div>
    <Footer>
      <template #left>
        <div class="gotoBtn" @click="gotoHome()">
          <div class="iconfont icon-double-arrow-down-full"></div>
        </div>
      </template>
    </Footer>
  </div>
</template>

<script setup>
import { reactive, toRaw, watch, ref } from "vue";
import { useRouter } from "vue-router";
import WindowHandles from "../components/WindowHandles.vue";
import Footer from "./Footer.vue";
import bus from "@/utils/eventBus.js";
import { useMusicStore } from "@/stores/index.js";
import { splitEveryLineLyric, convertDuration } from "@/utils/helper.js";
const store = useMusicStore();

const router = useRouter();
// 路由
const gotoHome = () => {
  router.replace("/home");
};

// 获取当前播放音乐信息
let currentMusic = reactive(store.getCurrentMusic);
// console.log(currentMusic);

// 当前播放歌词索引
let currenIndex = ref(0);
// 歌曲名称
let music_name = ref(currentMusic.name);
// 歌曲歌手
let music_singer = ref(currentMusic.singer);
// 歌曲专辑
let music_from = ref(currentMusic.music_from);
// 歌词数组
let lyrics = reactive(currentMusic.lyrics.split("\r\n"));
let lyricsTop = ref(0);
bus.on("musicTime", (time) => {
  // currentTime.value = time;
  for (let i = 0; i < lyrics.length; i++) {
    let lyrTime = splitEveryLineLyric(lyrics[i])[0];
    let musicTime = convertDuration(time);
    if (lyrTime.includes(musicTime)) {
      lyricsTop.value = 40 * (i - 4);
      currenIndex.value = i;
    }
  }
});

watch(
  () => store.getCurrentMusic,
  (val) => {
    // console.log(val);
    currentMusic = val;
    let time = val.time;
    lyrics = (val.lyrics && val.lyrics.split("\r\n")) || "[]";
    music_name.value = val.name;
    music_singer.value = val.singer;
    music_from.value = val.music_from;
    for (let i = 0; i < lyrics.length; i++) {
      let lyrTime = splitEveryLineLyric(lyrics[i])[0];
      let musicTime = convertDuration(time);
      if (lyrTime.includes(musicTime)) {
        lyricsTop.value = 40 * (i - 4);
        currenIndex.value = i;
      }
    }
  }
  // { immediate: true }
);
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  // background-color: rgb(193, 34, 34);
}
.music-detail {
  height: calc(100% - 80px - 30px);
  margin-top: 30px;
  display: flex;
  > div {
    flex: 1;
    &.left {
      // background-color: rgb(99, 39, 39);
      display: flex;
      justify-content: center;
      align-items: center;
      .music-img {
        width: 300px;
        height: 300px;
        border: 5px solid #f00;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    &.right {
      // background-color: rgb(52, 182, 102);
      padding: 20px 10px;
      .music-info {
        height: 100%;
        // background-color: rgb(152, 26, 220);
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        h3 {
          font-size: 30px;
          margin: 10px 0;
        }
        .music-singer,
        .music-from {
          font-size: 24px;
          color: #666;
          height: 40px;
          line-height: 40px;
        }
        .music-lyrics {
          flex: 1;
          width: 90%;
          margin-top: 20px;
          // border: 1px solid #000;
          position: relative;
          overflow: hidden;
          .lyrics-container {
            position: absolute;
            left: 0;
            top: -200px;
            width: 100%;
            height: 500px;
            // border: 1px solid #f00;
            list-style: none;
            > li {
              height: 40px;
              line-height: 40px;
              text-align: center;
            }
          }
          .lyrics-no {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
          }
        }
      }
    }
  }
}

.gotoBtn {
  width: 50px;
  height: 50px;
  // border: 1px solid #d3d3d3;
  margin-right: 5px;
  border-radius: 3px;
  cursor: pointer;
  .iconfont {
    font-size: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

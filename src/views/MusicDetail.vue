<template>
  <div class="container">
    <WindowHandles />
    <div class="music-detail">
      <div class="left">
        <div class="music-img">
          <img src="../assets/music.png" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="music-info">
          <h3>一日都市</h3>
          <div class="music-singer">
            <span>歌手：</span>
            <span>hanser</span>
          </div>
          <div class="music-from">
            <span>专辑：</span>
            <span>专辑名</span>
          </div>
          <div class="music-lyric">歌词 歌词 歌词 歌词</div>
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
import { useRouter } from "vue-router";
import WindowHandles from "../components/WindowHandles.vue";
import Footer from "./Footer.vue";

const router = useRouter();

const gotoHome = () => {
  router.replace("/");
};
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
        .music-lyric {
          flex: 1;
          width: 80%;
          margin-top: 20px;
          border: 1px solid #000;
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

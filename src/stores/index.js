import { defineStore } from "pinia";
import { toRaw } from "vue";

export const useMusicStore = defineStore("music", {
  state: () => {
    return {
      currentMusic: JSON.parse(localStorage.getItem("currentMusic")) || {}, //当前音乐
      isPlay: false, // 是否在播放
      musicAudio: new Audio(), // 播放音乐
      keywords: "", // 搜索关键词
    };
  },
  getters: {
    // 获取当前播放音乐
    getCurrentMusic(state) {
      return state.currentMusic;
    },
    // 当前是否处于播放
    getPlayStatus(state) {
      return state.isPlay;
    },
    // audio对象
    getMusicAudio(state) {
      return state.musicAudio;
    },
    // 获取搜索关键词
    getSearchWords(state) {
      return state.keywords;
    },
  },
  actions: {
    // 保存当前播放音乐
    saveCurrentMusic() {
      // 存入缓存
      localStorage.setItem("currentMusic", JSON.stringify(this.currentMusic));
    },
    cleanCurrentMusic() {
      let allMusic = myApi.getTracks();
      if (allMusic.length == 0) {
        this.currentMusic = {};
        this.saveCurrentMusic();
      }
    },
    // 设置当前播放音乐
    setCurrMusic(currMusic) {
      // console.log(currMusic);
      this.currentMusic = currMusic;
      this.musicAudio.src = currMusic.path;
      this.saveCurrentMusic();
    },
    // 设置当前是否播放
    setTogglePlay(isPlay) {
      this.isPlay = isPlay;
      return this.getPlayStatus;
    },
    // 获取上一首音乐
    async getPrevMusic() {
      this.currentMusic = await myApi.getPrevMusic(toRaw(this.getCurrentMusic));
      this.musicAudio.src = this.currentMusic.path;
      this.isPlay = true;
      this.toggleMusic();
      this.saveCurrentMusic();
      return this.getCurrentMusic;
    },
    // 获取下一首音乐
    async getNextMusic() {
      this.currentMusic = await myApi.getNextMusic(toRaw(this.getCurrentMusic));
      this.musicAudio.src = this.currentMusic.path;
      this.isPlay = true;
      this.toggleMusic();
      this.saveCurrentMusic();
      return this.getCurrentMusic;
    },
    // 切换播放/暂停状态
    async toggleMusic() {
      if (this.isPlay) {
        if (!this.musicAudio.src) {
          this.currentMusic = await this.getNextMusic();
        }
        // this.currentMusic = this.getNextMusic()
        this.musicAudio.play();
      } else {
        this.musicAudio.pause();
      }
    },
    // 设置搜索关键词
    saveSearchWords(value) {
      this.keywords = value;
    },
  },
});

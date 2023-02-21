import { defineStore } from "pinia";
import { toRaw } from "vue";

export const useMusicStore = defineStore("music", {
  state: () => {
    return {
      currentMusic: JSON.parse(localStorage.getItem("currentMusic")) || {},
      isPlay: false,
      musicAudio: new Audio(),
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
  },
  actions: {
    // 保存当前播放音乐
    saveCurrentMusic() {
      // 存入缓存
      localStorage.setItem("currentMusic", JSON.stringify(this.currentMusic));
    },
    // 设置当前播放音乐
    setCurrMusic(currMusic) {
      this.currMusic = currMusic;
      this.saveCurrentMusic;
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
      // this.musicAudio.play()
      this.isPlay = true;
      this.toggleMusic();
      this.saveCurrentMusic;
      return this.getCurrentMusic;
    },
    // 获取下一首音乐
    async getNextMusic() {
      this.currentMusic = await myApi.getNextMusic(toRaw(this.getCurrentMusic));
      this.musicAudio.src = this.currentMusic.path;
      // this.musicAudio.play()
      this.isPlay = true;
      this.toggleMusic();
      this.saveCurrentMusic;
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
  },
});

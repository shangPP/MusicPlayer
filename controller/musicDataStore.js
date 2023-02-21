/**
 * 存储音乐文件
 */

const Store = require("electron-store");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
// const load = require('audio-loader'); //会阻止控制台打开
const { app } = require("electron");
const { search, getLyrics } = require("../src/api/index.js")
// import Store from 'electron-store'
// import { v4: uuidv4 } from 'uuid'
// import path from 'path'

// electron-store信息文件存储路径
console.log("userData", app.getPath("userData"));
class DataStore extends Store {
  constructor(settings) {
    super(settings);
    this.tracks = this.get("tracks") || []; //保存音乐文件信息
  }
  // 保存音乐
  saveTracks() {
    this.set("tracks", this.tracks);
    return this;
  }
  // 获取音乐
  getTracks() {
    return this.get("tracks") || [];
  }
  // 添加音乐
  async addTracks(tracks) {
    // 添加并去重（取出没有保存的）
    // 获取歌曲信息
    const tracksWithProps = tracks.map(async (track) => {
      //获取音频时长
      let { duration } = await load(track);
      // 文件名
      let fileName = path.basename(track);
      let index = fileName.lastIndexOf(".");
      let fileNameArr = fileName.slice(0, index).split(" - ");
      // 歌名
      let name = fileNameArr[0];
      let searchLists = await search(name);
      // console.log(searchLists);
      // searchLists = searchLists.slice(searchLists.indexOf("{"), -1)
      let lyrics, music_from, music_img, timelength;
      if (searchLists.data.lists.length > 0) {
        const { FileHash, AlbumID } = searchLists.data.lists[0];
        let res = await getLyrics(FileHash, AlbumID);
        // console.log(typeof res);
        let data = JSON.parse(res.slice(res.indexOf("{"), -2));
        // console.log("++++++", data)
        lyrics = data.data.lyrics;
        music_from = data.data.album_name;
        music_img = data.data.img;
        timelength = data.data.timelength;
        // console.log(lyrics, music_from, music_img, timelength);
        // 歌手
        let singer = fileNameArr[1];
        // 后缀类型
        let type = fileName.slice(index + 1);
        return {
          id: uuidv4(),
          path: track,
          name,
          singer,
          lyrics,
          music_from,
          music_img,
          timelength,
          time: duration,
          fileName: path.basename(track),
          type,
        };
      } else {
        // 歌手
        let singer = fileNameArr[1];
        // 后缀类型
        let type = fileName.slice(index + 1);
        return {
          id: uuidv4(),
          path: track,
          name,
          singer,
          lyrics,
          music_from,
          music_img,
          timelength,
          time: duration,
          fileName: path.basename(track),
          type,
        };
      }


    });
    // 去重
    return await Promise.all(tracksWithProps).then(async (arr) => {
      const tracksWithProps2 = await arr.filter((track) => {
        const currentTracksPath = this.getTracks().map((track) => track.path);
        return !currentTracksPath.includes(track.path);
      });
      this.tracks = [...this.tracks, ...tracksWithProps2];
      return this.saveTracks();
    });
  }
  // 删除音乐
  deleteTrack(deletedId) {
    this.tracks = this.tracks.filter((item) => item.id !== deletedId);
    return this.saveTracks();
  }
  // 获取上一首音乐
  getPrevTrack(track) {
    let tracks = this.getTracks();
    let index = tracks.findIndex((item) => item.id === track.id);
    if (index === 0) {
      return tracks[tracks.length - 1];
    } else {
      return tracks[index - 1];
    }
  }
  // 获取下一首音乐
  getNextTrack(track) {
    let tracks = this.getTracks();
    if (!track) return tracks[0];
    let index = tracks.findIndex((item) => item.id === track.id);
    if (index === tracks.length - 1) {
      return tracks[0];
    } else {
      return tracks[index + 1];
    }
  }
}

module.exports = DataStore;

/*
 * 包含n个接口请求函数的模块
 * 函数返回值: promise对象
 * */
// import ajax from "./ajax";
const { ajax, jsonp } = require("./ajax.js");
// const BASE_URL = 'http://localhost:4000'
// const BASE_URL = "/api";

// 根据关键词搜索歌曲
const reqSearch = (keyword) =>
  ajax(
    `https://songsearch.kugou.com/song_search_v2?keyword=${keyword}&page=1&pagesize=30`
  );
// 获取歌词
const reqGetLyrics = (hash, album_id) =>
  ajax(
    `https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery19108001866002482712_1600062977462&hash=${hash}&album_id=${album_id}&dfid=0R8DjY2N76ry107YTH4GPprM&mid=c873a389849646fbfa13f2a37e33ed7a`
  );

module.exports = {
  reqSearch,
  reqGetLyrics,
};
/**
 * 预加载脚本，作为主进程和渲染进程之间桥梁
 */
const { contextBridge, ipcRenderer } = require("electron");

// 最小化窗口
const minWindow = () => {
  ipcRenderer.send("window-min");
};
// 最大化窗口
const maxWindow = () => {
  ipcRenderer.send("window-max");
};
// 关闭窗口
const closeWindow = () => {
  ipcRenderer.send("window-close");
};
// 添加本地音乐
const addMusic = async (res) => {
  return await ipcRenderer.invoke("on-addMusic-event", res);
};
// 首次打开获取音乐
const getMusic = async (res) => {
  return await ipcRenderer.invoke("on-getMusic-event", res);
};
// 获取上一首音乐
const getPrevMusic = (currentMusic) => {
  return ipcRenderer.invoke("on-prevMusic-event", currentMusic);
};
// 获取下一首音乐
const getNextMusic = (currentMusic) => {
  return ipcRenderer.invoke("on-nextMusic-event", currentMusic);
};
// 删除音乐
const delMusic = (musicId) => {
  return ipcRenderer.invoke("on-delMusic-event", musicId);
};
// 搜索歌曲
const searchMusic = (keywords, page) => {
  return ipcRenderer.invoke("on-search-music", keywords, page);
};
// 播放搜索的歌曲
const playSearchMusic = (music) => {
  return ipcRenderer.invoke("on-play-search-music", music);
}

// 绑定到浏览器window上
contextBridge.exposeInMainWorld("myApi", {
  minWindow,
  maxWindow,
  closeWindow,
  addMusic,
  getMusic,
  getPrevMusic,
  getNextMusic,
  delMusic,
  searchMusic,
  playSearchMusic
});

const { ipcMain, dialog } = require("electron");

const { reqSearch, reqGetLyrics } = require("../src/api/index");

// 搜索歌曲
ipcMain.handle("on-search-music", async (event, keywords, page) => {
  // setTimeout(async () => {
  return await reqSearch(keywords, page);
  // }, 300)
});
// 播放搜索的歌曲
ipcMain.handle("on-play-search-music", async (event, data) => {
  return await reqGetLyrics(data.FileHash, data.AlbumID);
});

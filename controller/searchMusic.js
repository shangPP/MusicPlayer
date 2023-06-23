const { ipcMain, dialog } = require("electron");

const { reqSearch, reqGetLyrics } = require("../src/api/index");
const DataStore = require("./musicDataStore");

const myStore = new DataStore({ name: "Local Music Data" });

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
// 添加搜索的歌曲
ipcMain.handle("on-add-search-music", async (event, data) => {
  const res = await reqGetLyrics(data.FileHash, data.AlbumID);
  const result = JSON.parse(res.slice(res.indexOf("{"), -2));
  if (result.status == 1) {
    let musicTracks = await myStore.addSearchTrack(result.data);
    return musicTracks.getTracks();
  }
});

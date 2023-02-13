const { ipcMain } = require("electron");
const DataStore = require("./musicDataStore");

const myStore = new DataStore({ name: "Local Music Data" })

// 上一曲
ipcMain.handle("on-prevMusic-event", (e, arg) => {
  return myStore.getPrevTrack(arg)
})
// 下一曲
ipcMain.handle("on-nextMusic-event", (e, arg) => {
  return myStore.getNextTrack(arg)
})
// 删除
ipcMain.handle("on-delMusic-event", (e, musicId) => {
  return myStore.deleteTrack(musicId).getTracks()
})
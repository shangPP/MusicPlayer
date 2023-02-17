const { ipcMain } = require("electron");
const fs = require("fs")
const DataStore = require("./musicDataStore");

const myStore = new DataStore({ name: "Local Music Data" });

// 上一曲
ipcMain.handle("on-prevMusic-event", (e, arg) => {
  return myStore.getPrevTrack(arg);
});
// 下一曲
ipcMain.handle("on-nextMusic-event", (e, arg) => {
  return myStore.getNextTrack(arg);
  // let res = myStore.getNextTrack(arg);

  // let filesContent = fs.readFileSync(res.path).toString()
  // res.file = filesContent
  // // console.log(filesContent);
  // return res
});
// 删除
ipcMain.handle("on-delMusic-event", (e, musicId) => {
  return myStore.deleteTrack(musicId).getTracks();
});

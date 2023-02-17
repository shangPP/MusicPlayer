const { ipcMain, dialog } = require("electron");
const DataStore = require("./musicDataStore");

const myStore = new DataStore({ name: "Local Music Data" });

// 添加音乐
ipcMain.handle("on-addMusic-event", async (e) => {
  let res = await openFile();
  if (!res) return myStore.getTracks();
  let musicTracks = await myStore.addTracks(res);
  return musicTracks.getTracks();
});


// 打开文件窗口
const openFile = () => {
  const res = dialog.showOpenDialogSync({
    title: "添加音乐",
    buttonLabel: "添加",
    filters: [{ name: "音乐", extensions: ["mp3"] }],
    properties: ["openFile", "multiSelections"],
  });
  if (res) {
    return res;
  }
};
// 获取音乐
ipcMain.handle("on-getMusic-event", () => {
  return myStore.getTracks();
});

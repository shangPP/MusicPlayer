
const { ipcMain, dialog } = require("electron");
const DataStore = require("./musicDataStore");

const myStore = new DataStore({ name: "Local Music Data" })

ipcMain.handle("on-addMusic-event", async (e) => {
  let res = await openFile()
  if (!res) return myStore.getTracks();
  let musicTracks = await myStore.addTracks(res)
  return musicTracks.getTracks();
})

const openFile = () => {
  const res = dialog.showOpenDialogSync({
    title: "添加音乐",
    buttonLabel: "添加",
    filters: [
      { name: "音乐", extensions: ["mp3"] }
    ],
    properties: ["openFile", "multiSelections"]
  })
  if (res) {
    return res
  }
}

ipcMain.handle("on-getMusic-event", () => {
  return myStore.getTracks();
})



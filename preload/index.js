const { contextBridge, ipcRenderer } = require("electron")

// 最小化窗口
const minWindow = () => {
  ipcRenderer.invoke("window-min")
}
// 最大化窗口
const maxWindow = () => {
  ipcRenderer.invoke("window-max")
}
// 关闭窗口
const closeWindow = () => {
  ipcRenderer.invoke("window-close")
}
// 添加音乐
const addMusic = async (res) => {
  return await ipcRenderer.invoke("on-addMusic-event", res)
}
// 首次打开获取音乐
const getMusic = async (res) => {
  return await ipcRenderer.invoke("on-getMusic-event", res)
}



// 绑定到浏览器window上
contextBridge.exposeInMainWorld("myApi", {
  minWindow,
  maxWindow,
  closeWindow,
  addMusic,
  getMusic
})
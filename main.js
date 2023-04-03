/* eslint-disable no-undef */
// electron主进程
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const WinState = require("electron-win-state").default;

// 不设置菜单
Menu.setApplicationMenu(null);
// 屏蔽安全警告
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

require("./controller/addMusic");
require("./controller/controlMusic");

let win = null;

const createWindow = () => {
  // 设置默认状态
  const winState = new WinState({
    defaultHeight: 700,
    defaultWidth: 1000,
    electronStoreOptions: {
      name: "window-state-main",
    },
  });

  win = new BrowserWindow({
    // 自定义窗口状态
    ...winState.winOptions,
    minHeight: 700,
    minWidth: 1000,
    transparent: true,
    backgroundColor: "#00000000",
    frame: false,
    show: false,
    webPreferences: {
      // 定义预加载的js
      preload: path.resolve(__dirname, "./preload/index.js"),
      nodeIntegration: true, //可以使用nodeapi
      webSecurity: false,
    },
  });

  win.loadURL("http://127.0.0.1:5173/");

  // 打开调试工具
  win.webContents.openDevTools();

  winState.manage(win);

  // 等页面加载完毕后才打开窗口
  win.on("ready-to-show", () => {
    win.show();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // 如果没有任何浏览器窗口是打开的，则调用 createWindow() 方法
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭窗口
app.on("window-all-closed", () => {
  // 苹果 关闭常驻dock栏
  if (process.platform !== 'darwin') app.quit()
});

// 最小化
ipcMain.on("window-min", () => {
  win.minimize();
});
// 最大化
ipcMain.on("window-max", () => {
  if (!win.isMaximized()) {
    win.maximize();
  } else {
    win.setFullScreen(false);
    win.restore();
  }
});
// 关闭
ipcMain.on("window-close", () => {
  win.close();
});

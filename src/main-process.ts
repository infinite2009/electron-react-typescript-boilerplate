import { app, BrowserWindow, ipcMain } from 'electron';
import { getStartUpParams } from '@/utils';
import * as fs from 'fs';
import jsonfile from 'jsonfile';
import log from 'electron-log';


declare const ENVIRONMENT: String;

const IS_DEV = ENVIRONMENT == 'development';
const DEV_SERVER_URL = 'http://localhost:9000';
const HTML_FILE_PATH = 'index.html';

let win: BrowserWindow | null = null;

const startUpParams = getStartUpParams();

// 打包环境下，用 electron-log 的日志方法不改 console
if (!IS_DEV) {
  console = Object.assign(console, log.functions);
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  ipcMain.on('beforeunload', () => {
    loadComponentList(win);
  });

  if (IS_DEV) {
    win.loadURL(DEV_SERVER_URL).then(() => {});
    win.webContents.openDevTools();
  } else {
    win.loadFile(HTML_FILE_PATH).then(() => {});
  }

  // 加载第三方组件
  loadComponentList(win);

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function loadComponentList(win: Electron.BrowserWindow | null) {
  if (!win) {
    return;
  }
  // 如果启动时有路径参数
  if (startUpParams && startUpParams.path) {
    const { path: projectPath } = startUpParams;
    // 读取第三方组件工程目录下的配置文件
    const configFileName = 'nezha.config.json';
    const configFilePath = `${projectPath}/${configFileName}`;
    const projectConfig = jsonfile.readFileSync(configFilePath);
    // 只有拿到这个配置，知道项目叫什么名字，才能加载组件的js文件
    const umdJSFileName = 'index.umd.js';
    const umdJSFilePath = `${projectPath}/src/dist/${umdJSFileName}`;
    const scriptContent = fs.readFileSync(umdJSFilePath, { encoding: 'utf8' });
    const { webContents } = win;
    webContents
      .executeJavaScript(scriptContent)
      .then(() => {
        // 通知渲染进程，初始化组件
        webContents.send('main-process-messages', {
          projectConfig,
        });
      })
      .catch(err => {
        console.error('err: ', err);
      });
  }
}

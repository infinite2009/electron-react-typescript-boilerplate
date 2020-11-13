import { app, BrowserWindow } from 'electron';
import { getStartUpParams } from '@/utils';
import * as url from 'url';
import * as fs from 'fs';


declare const ENVIRONMENT: String;

const IS_DEV = ENVIRONMENT == 'development';
const DEV_SERVER_URL = 'http://localhost:9000';
const HTML_FILE_PATH = 'index.html';

let win: BrowserWindow | null = null;

const startUpParams = getStartUpParams();
console.log('startUpParams: ', startUpParams);

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (IS_DEV) {
    win.loadURL(DEV_SERVER_URL);
    // 如果启动时有路径参数
    if (startUpParams && startUpParams.path) {
      const { path: projectPath } = startUpParams;
      // 读取第三方组件工程目录下的配置文件
      const configFileName = 'nezha.config.js';
      const configFilePath = `${projectPath}/${configFileName}`;
      if (fs.existsSync(configFilePath)) {
        const projectConfig = require(`${projectPath}/${configFileName}`);
        // 只有拿到这个配置，知道项目叫什么名字，才能加载组件的js文件
        const umdJSFileName = 'index.umd.js';
        const umdJSFilePath = `${projectPath}/${umdJSFileName}`;
        win
          .loadURL(
            url.format({
              protocol: 'file',
              pathname: umdJSFilePath,
              slashes: true,
            })
          )
          .then(val => {
            console.log(val);
          });
      }
    }
  } else {
    win.loadFile(HTML_FILE_PATH);
  }

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

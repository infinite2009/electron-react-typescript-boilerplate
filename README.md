# 哪吒2.0——组件开发桌面工具

## 技术栈

![](./.github/project-logo-400.jpg) 


---
<br>
<br>
<br>

# 开始
```
npm install
```


# During development

<br>
<br>
因为开发这个桌面端需要支持渲染页面的热重载，所以先执行以下命令启动 webpack dev server:

```
npm run server
```
然后在另外一个中断开启主进程的server:
```
npm start
```


# 部署

会打包出一个app文件，但不带安装器，可以直接启动:
```
npm run pack
```
and the output will be in the ```./pack``` folder.

## 启动方法
open -a nezha-client.app --args path=[你的组件工程目录的绝对路径（别把中括号写进去！）]


### CSDN-move
CSDN的文章转为MD并全打包一键下载❗❓

兼容性：现代浏览器应该都行

### QuickStart
![](https://raw.githubusercontent.com/ame-yu/csdn-move/master/docs/img/demo.gif)

1. 登陆CSDN
2. 前往[https://blog-console-api.csdn.net/](https://blog-console-api.csdn.net/)


3. F12-> console 复制下面那句话，回车
```js
var s=document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='//cdn.jsdelivr.net/gh/ame-yu/csdn-move@latest/dist/index.js';
```
### Q&A
Q: 为什么要先blog-console-api.csdn.net

A: 为了可以使用登陆后的Cookie

Q: 可不可以下别人的博客

A: 因为阅读他人博客是服务端渲染，所以不支持

### 不妨考虑下使用Vue-blog
这个项目让用户像windows窗口一般浏览博客仓库。

也就是博客内容和博客客户端的分离。而且让读者能离线阅读你的文章。
> [更多详情](https://github.com/ame-yu/vue-blog)

### 作者
Ame-yu

👍 可以的话Star、Fork
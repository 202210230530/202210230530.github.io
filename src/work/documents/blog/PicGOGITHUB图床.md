---
title: 10分钟用PicGO+Github+VScode搭建自己的便捷图床
shortTitle: PicGO、GITHUB图床
icon: vscode
author: zzzzzxm
date: 2023-04-26 26:44:54
isOriginal: true
sticky: false
star: false
category:
  - 工作
  - 随笔
tag:
  - VSCODE
  - GITHUB
---

## 1.PicGO 下载

### 应用概述

**PicGo: 一个用于快速上传图片并获取图片 URL 链接的工具**

PicGo 本体支持如下图床：

- `七牛图床` v1.0
- `腾讯云 COS v4\v5 版本` v1.1 & v1.5.0
- `又拍云` v1.2.0
- `GitHub` v1.5.0
- `SM.MS V2` v2.3.0-beta.0
- `阿里云 OSS` v1.6.0
- `Imgur` v1.6.0

### 特色功能

- 支持拖拽图片上传
- 支持快捷键上传剪贴板里第一张图片
- Windows 和 macOS 支持右键图片文件通过菜单上传
- 上传图片后自动复制链接到剪贴板
- 支持自定义复制到剪贴板的链接格式
- 支持修改快捷键，默认快速上传快捷键：`command+shift+p`（macOS）| `control+shift+p`（Windows\\Linux)
- 支持插件系统，已有插件支持 Gitee、青云等第三方图床
  - 更多第三方插件以及使用了 PicGo 底层的应用可以在 [Awesome-PicGo (opens new window)](https://github.com/PicGo/Awesome-PicGo) 找到。欢迎贡献！
- 支持通过发送 HTTP 请求调用 PicGo 上传

### 下载安装

```card
title: PicGO
desc: 点击卡片跳转到PicGO下载链接
logo: https://pic.molunerfinn.com/picgo/docs/logo-150.png
link: https://picgo.github.io/PicGo-Doc/zh/guide/#picgo-is-here
color: #096DD9
```

## 2.GITHUB token 生成

### GitHub 图床

```json
{
  "repo": "", // 仓库名，格式是username/reponame
  "token": "", // github token
  "path": "", // 自定义存储路径，比如img/
  "customUrl": "", // 自定义域名，注意要加http://或者https://
  "branch": "" // 分支名，默认是main
}
```

**1.** 首先你得有一个 GitHub 账号。注册 GitHub 就不用我多言。

**2.** 新建一个仓库

![](https://pic.molunerfinn.com/picgo/docs/create_new_repo.png)

记下你取的仓库名。

**3.** 生成一个 token 用于 PicGo 操作你的仓库：

访问：https://github.com/settings/tokens

然后点击`Generate new token`。

![](https://pic.molunerfinn.com/picgo/docs/generate_new_token.png)

把 repo 的勾打上即可。然后翻到页面最底部，点击`Generate token`的绿色按钮生成 token。

![](https://pic.molunerfinn.com/picgo/docs/20180508210435.png)

\*\*注意：\*\*这个 token 生成后只会显示一次！你要把这个 token 复制一下存到其他地方以备以后要用。

![](https://pic.molunerfinn.com/picgo/docs/copy_token.png)

**4.** 配置 PicGo

\*\*注意：\*\*仓库名的格式是`用户名/仓库`，比如我创建了一个叫做`test`的仓库，在 PicGo 里我要设定的仓库名就是`Molunerfinn/test`。一般我们选择`main`分支即可。然后记得点击确定以生效，然后可以点击`设为默认图床`来确保上传的图床是 GitHub。

![](https://pic.molunerfinn.com/picgo/docs/setup_github.png)

至此配置完毕，已经可以使用了。当你上传的时候，你会发现你的仓库里也会增加新的图片了：

![](https://pic.molunerfinn.com/picgo/docs/success.png)

:::: tip 上传测试
::: center
![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/avatar.jpg)
:::

::::

## 3.集成到 VSCode

为了更好的**摸鱼**，哥们需要在 `VSCODE` 写 `Markdown` 时可以快速插入图片转为 `Markdown` 图片语法,研究了一手，发现了**VSCode**的**PicGo**插件，那么搞起来吧！

### 下载插件

插件市场搜索 PicGO:point_down:

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230428112847.png)

### 填写配置

**打开 VSCode 用户配置，搜索 PicGo**,填写相应的图床配置，下面是我的参考:point_down:

:::center
![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230428114651.png)

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/1682654252306.png)
:::

### `Markdown`插入图片，**启动！！**

快捷键:point_down:

**您可以根据需要更改以下所有快捷方式.**

| OS           | 从剪贴板上传图像 | 从资源管理器上传图像 | 从输入框上传图片 |
| ------------ | ---------------- | -------------------- | ---------------- |
| Windows/Unix | Ctrl + Alt + U   | Ctrl + Alt + E       | Ctrl + Alt + O   |
| OsX          | Cmd + Opt + U    | Cmd + Opt + E        | Cmd + Opt + O    |

### **来吧，展示**:movie_camera:

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230428121104.png)

:point_up:上图上传的过程 **嘎嘎快**

:::: info 实用场景
我使用`VScode`写博客需要上传图片时最方便的操作：

- **微信截图**
- **快捷键 `Ctrl + Alt + U`**
- **搞定:thumbsup:**

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/pic%E5%B1%95%E7%A4%BA.gif)
::::

:::center

**又能愉快的摸鱼了！开心~**  
![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230410153030.png =200x200)
:::

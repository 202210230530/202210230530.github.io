---
title: 本地 git 账号关联远程 github/gitlab | git 本地如何配置多平台账号
shortTitle: GIT多账号管理
icon: git
author: zzzzzxm
date: 2023-05-04 04:36:20
isOriginal: true
sticky: false
star: false
category:
  - 工作
  - 随笔
tag:
  - GIT
  - GITHUB
---

### 一、问题产生背景

工作用的公司 gitlab 账号，自己平常学习用的 github 账号，又只有一个电脑，公司账号当然不能用于 github，所以需要分别配置两套密钥，分别用于自己搞事情研究和公司搬砖使用。

### 二、本地 git 账号关联远程 github ｜ gitlab

我们必须将本地账号关联了远程账户，才能把本地代码提交到远程仓库上。

道理都一样，我们以 GitHub 为例：

**1、本地创建 ssh-key**

```js
// git bash 查看是否已经创建过ssh-key
ll -a ~/.ssh/
```

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504111000.png)

首先，进入 .ssh 目录下

接着，创建 ssh-key，xxxxx@163.com 注意替换成你自己的邮箱账号

```sh
ssh-keygen -t rsa -C "xxxxx@qq.com"
```

一路回车执行完上述命令后，这时会在本地的 .ssh 目录创建两个文件：

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504111755.png)

**2、把 id_rsa_github.pub 文件的内容复制到远程 github 上 :point_down:**

> 点击这个链接配置 github keys：**[GitHub Settings - Keys](https://github.com/settings/keys)**

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504112239.png)

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504112532.png)

**3、测试拉取项目**

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504113110.png)

:::: warning 未配置多账号

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504113613.png)  
 我们现在有多个 id_rsa 文件，github 拉取时不知道使用哪一个 需要配置上对应的策略  
[:point_right:策略配置](#四、配置秘钥使用策略)
::::

### 三、git 本地配置多平台账号

我们刚刚创建 ssh-key（ xxxxx@163.com 注意替换成你自己的邮箱账号）的时候，生成了两个**id_rsa_github**文件，这样只能适用于一个账号多个平台，不能用于多个账号。

紧接着，那我们就再生成一套新的密钥，起一个不同的名字，然后通过配置来区分 github 用我们这套新的账号配置，公司 gitlab 用我们刚刚第二步骤里生成的那套账号配置，不就可以了嘛！

说干就干，还是第一步，先进入到 .ssh 目录：

再次执行下面命令（这次换成你的另一个账号）

```sh
ssh-keygen -t rsa -C "xxxxx@qq.com"
```

敲回车之后，修改密钥的名称，起一个不同的名字，如下图所示:point_down:。

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504114133.png)

好了，这样我们就配置了两个账号的密钥，一个用来链接公司的 gitlab，一个用来折腾自己的 GitHub。

### 四、配置秘钥使用策略

:::: info 话又说回来了
**还有个问题，怎么知道你提交远程仓库的时候，用哪个秘钥呢？**

我们还需要写个配置文件，当提交到公司的远程仓库 [http://xxx.github.com](http://xxx.github.com/) 的时候，我们用账号 A，提交自己的 [http://xxx.gitlab.com](http://xxx.gitlab.com/) 的时候，用账号 B。
::::

- **在 .ssh 目录新建 config 文件：**

执行命令： **vi config** ，敲下键盘的 **i** 键，切换至输入状态。

输入以下代码，注意改成你自己的账号，文件名字

```text
# 第一个账号，默认使用的账号
Host github.com
HostName github.com
User xxxx@xx.com
IdentityFile ~/.ssh/id_rsa_github


# 第二个账号
Host xxx.gitlab.com  # 你的第二个远程仓库地址，用第二个账号
HostName github.com
User xxxxx2@xx.com  # 你的第二套账号邮箱
IdentityFile ~/.ssh/id_rsa_gitlab # 你的第二套账号对应的秘钥
```

- 依次按下 **esc** 、 **:** ，输入 **wq** ，敲下回车，保存文件。

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504120821.png)

然后就可以顺利的进行多账号多个远程仓库的使用啦~

### 五、测试一把

- **github 拉取项目**:white_check_mark:  
  ![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504121853.png)
- **gitlab 拉取项目**:white_check_mark:  
  ![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230504121920.png)

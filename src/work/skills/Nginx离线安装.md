---
title: CentOS7在线/离线安装nginx记录
shortTitle: Nginx在线/离线安装
icon: nginx
author: zzzzzxm
date: 2023-05-06 15:48:03
isOriginal: true
sticky: false
star: false
category:
  - 工作
  - 日常记录
tag:
  - NGINX
---

## 1.准备阶段

### **查看系统信息**

- 查看系统内核版本

```shell
cat /etc/redhat-release
```

- 查看系统位数

```shell
getconf WORD_BIT
```

:::: info
先拿到系统信息为后续下载对应系统的安装包做准备  
演示使用系统为**CentOS7.9.2009 x86_64**
::::

### **查看安装所需依赖**

通过官网离线安装的示例（:point_down:下图为官网截图）可以看出，需要的依赖包括：**openssl、pcre、zlib**  
依赖安装编译需要**gcc 环境**  
![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230506171411.png)

:::: tip
先查看当前系统是否存在上面的环境,若存在则可以考虑不重复安装  
若显示结果中有环境的版本信息，则表示环境已经安装，若没显示则没有安装

- [x] gcc 环境 执行命令`gcc -v`和`g++ -v`
- [x] openssl 环境 执行命令`openssl version`
- [x] pcre 环境 执行命令`pcre-config --version`
- [x] zlib 环境 执行命令`yum list installed | grep zlib`

::::

### **准备安装所需依赖（离线安装使用）**

**1.** （**如果已经安装 gcc ，忽略此步骤**）在 CentOS 7 的安装镜像，packages 目录，找到安装 gcc 相关的 rpm 包，并放到一个文件夹里（1），列表如下（_注意：不同版本的操作系统，对应的 rpm 版本也不同_）

:point_right:[CentOS 7.9.2009 Packages 下载](http://mirror.centos.org/centos/7.9.2009/os/x86_64/Packages/) **CTRL+F 搜索关键字快速定位**

| 序号 | 安装包                                    |
| ---- | ----------------------------------------- |
| 1    | cpp-4.8.5-44.el7.x86_64.rpm               |
| 2    | gcc-4.8.5-44.el7.x86_64.rpm               |
| 3    | glibc-2.17-317.el7.x86_64.rpm             |
| 4    | glibc-common-2.17-317.el7.x86_64.rpm      |
| 5    | glibc-devel-2.17-317.el7.x86_64.rpm       |
| 6    | glibc-headers-2.17-317.el7.x86_64.rpm     |
| 7    | kernel-headers-3.10.0-1160.el7.x86_64.rpm |
| 8    | libmpc-1.0.1-3.el7.x86_64.rpm             |
| 9    | mpfr-3.1.1-4.el7.x86_64.rpm               |

**2.** （**如果已经安装 gcc-c++ ，忽略此步骤**）在 CentOS 7 的安装镜像，packages 目录，找到安装 gcc-c++ 相关的 rpm 包，并放到一个文件夹里（2），列表如下（_注意：不同版本的操作系统，对应的 rpm 版本也不同_）  
:point_right:[CentOS 7.9.2009 Packages 下载](http://mirror.centos.org/centos/7.9.2009/os/x86_64/Packages/)

| 序号 | 安装包                                  |
| ---- | --------------------------------------- |
| 1    | gcc-c++-4.8.5-44.el7.x86_64.rpm         |
| 2    | libstdc++-devel-4.8.5-44.el7.x86_64.rpm |

**3.** （**如果已经安装对应依赖 ，可考虑忽略此步骤**）下载 Nginx 需要依赖的离线安装包，放到一个文件夹里（3）  
:point_right:[OpenSSL 安装包下载](https://www.openssl.org/source/openssl-1.1.0e.tar.gz)  
:point_right:[Pcre 安装包下载](https://sourceforge.net/projects/pcre/files/pcre/8.45/pcre-8.45.tar.gz/download)  
:point_right:[Zlib 安装包下载](https://sourceforge.net/projects/libpng/files/zlib/1.2.11/zlib-1.2.11.tar.gz/download)

**4.** 下载 Nginx 离线安装包，放到文件夹 4：  
:point_right:[Nginx 安装包下载](http://nginx.org/download/nginx-1.18.0.tar.gz)

:::: tip 哥们是好人
如果你的版本跟哥们一样 那么这里有打包好的程序包可以直接使用:smile:  
:point_right:[全部安装包下载](https://pan.baidu.com/s/1Y2Y3JOJSpfdg289D2tVEug?pwd=zzxm)
::::

## 2.安装阶段

:::: tip 安装步骤
1、安装依赖：gcc、gcc-c++、ssl、pcre、zlib。**注意：一定要先安装 gcc，再安装 gcc-c++。然后再安装其他，其他的没有先后顺序。**  
2、安装 Nginx。
::::

### 1.安装 gcc （如果已经安装 gcc ，忽略此步骤）

::: tabs

@tab 在线安装

```shell
yum install gcc-c++
```

@tab 离线安装

先进入到文件夹 1

```shell
rpm -Uvh *.rpm --nodeps --force
```

进入到文件夹 2

```shell
rpm -Uvh *.rpm --nodeps --force
```

:::

### 2.安装 pcre （如果已经安装 pcre ，可以考虑忽略此步骤）

::: tabs

@tab 在线安装

```shell
yum install -y pcre pcre-devel
```

@tab 离线安装
进入到文件夹 3

```shell
tar -zxvf pcre-8.45.tar.gz ##解压pcre
cd pcre-8.45/
./configure ##配置
make ##构建
make install ##安装
```

:::

### 3.安装 zlib （如果已经安装 zlib ，可以考虑忽略此步骤）

::: tabs

@tab 在线安装

```shell
yum install -y zlib zlib-devel
```

@tab 离线安装
进入到文件夹 3

```shell
tar -zxvf zlib-1.2.11.tar.gz # 解压zlib
cd zlib-1.2.11/
./configure # 配置
make # 构建
make install # 安装
```

:::

### 4.安装 openssl （如果已经安装 openssl ，可以考虑忽略此步骤）

::: tabs

@tab 在线安装

```shell
yum install -y openssl openssl-devel
```

@tab 离线安装
进入到文件夹 3

```shell
tar -zxvf openssl-1.1.0e.tar.gz # 解压openssl
cd openssl-1.1.0e/
./config # 配置
make # 构建
make install # 安装
```

:::

### 5.安装 nginx

::: tabs

@tab 在线安装

**下载 nginx 安装包**

例：下载至`~/`文件夹下

`wget http://nginx.org/download/nginx-1.22.1.tar.gz`

下载完成后，解压：`tar -xvf nginx-1.22.1.tar.gz`

**配置安装**

进入解压目录并配置安装地址`/usr/local/nginx`，命令如下

```bash
cd ~/nginx-1.22.1
​
./configure --prefix=/usr/local/nginx   # 配置
make    # 编译
make install    # 安装
```

@tab 离线安装
进入到文件夹 4

```shell
tar -zxvf nginx-1.18.0.tar.gz
cd nginx-1.18.0/
./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-pcre=../../3/pcre-8.45 --with-zlib=../../3/zlib-1.2.11 --with-openssl=../../3/openssl-1.1.0e
make
make install
```

:::

### 6.测试 nginx

```shell
cd /usr/local/nginx/sbin/
./nginx -t
```

出现如下文字即安装成功:point_down:

```text
nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
```

## 3.Nginx 相关配置

### 设置全局 nginx 环境变量

**1.编辑 profile 文件**

```bash
sudo vi /etc/profile
```

**2.添加核心代码**

```bash
export NGINX_HOME=/usr/local/nginx
export PATH=$PATH:$NGINX_HOME/sbin
```

**3.保存退出**

```ruby
:wq
```

**4.重载 profile 文件**

```bash
source /etc/profile
```

**5.验证是否成功**

```auto
nginx -v
```

### nginx 相关常用命令

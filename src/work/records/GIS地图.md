---
title: OpenLayers加载离线Google地图
shortTitle: OpenLayers加载离线Google地图
icon: javascript
author: zzzzzxm
date: 2023-05-06 15:37:20
isOriginal: true
sticky: false
star: false
category:
  - 工作
  - 技术方案
tag:
  - JS
---

### **1.Google 地图瓦片下载**

查找了半天地图下载工具，各种花里胡哨还有收费的。哥们一想，这瓦片下载不就是通过接口一点点调用人家地图官方的接口下载吗？我写一个不就完了吗。
于是乎，我兴致勃勃的打开了 IDEA。转念一想，这玩意既然能写，那别人肯定有写好的啊，何必浪费我摸鱼的时间。于是哥们一番搜索找到了一个看似特别不错(**使用了，嘎嘎好使，强烈推荐**)的地图瓦片下载器:point_down::point_down::point_down:

```card
title: 地图下载器
desc: 使用Java开发的地图瓦片图下载工具，支持OpenStreetMap、天地图、谷歌地图、高德地图、腾讯地图、必应地图的XYZ瓦片图下载与合并。
logo: /moyu.png
link: https://gitee.com/CrimsonHu/java_map_download
color: #096DD9
```

为了节约时间，哥们直接下载了打包好的程序包 :point_right: [地图下载器程序包 Windows](https://pan.baidu.com/s/1CA7sdH6zL4OjJxVydKwrWQ?pwd=mdve)

下载安装包后解压文件夹会得到一个**地图下载器**目录，里面文件如下：  
![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230509162004.png)

双击`run.bat`即可启动程序！

:::: warning 提示
若无法打开，请将文件夹改为英文，并注意文件夹所在详细路径是否为**全英文**
::::

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230509162314.png)

可以看到地图下载器提供了友好的交互页面，功能也挺全。
我们要下载 Google 世界地图瓦片,那么需要再选中了 Google 地图瓦片后点击上方的`任务->直接下载世界地图`

在下载设置中选择要下载瓦片的层级和下载到的路径  
![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230509162743.png)

点击预估下载量可以查看瓦片大概占用多少存储，确认自己的存储空间够用  
![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230509163022.png)

:::: warning 特别提醒
**特别说明 Google 地图下载需要科学上网**  
如果你需要一个稳定的 VPN 的话，可以看哥们这篇文章:point_right:[不会科学上网的程序员不是好程序员]()

::::

如果可以科学上网的话，在地图下载上方打开`网络->代理设置`

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230509164139.png)

开始下载任务

![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230509164327.png)

这样在你的下载目录里就可以看到下载好的瓦片了

### **2.离线瓦片服务搭建**

**1. 首先要把下载好的瓦片搞到内网服务器上面。**

**2. 使用 nginx 代理的方式将这些瓦片做成可以通过 http 链接`/offlineMapTiles/{z}/{x}/{y}.png`访问的服务。**

:::: details nginx 配置文件

```sh
user  root;
#设置工作进程数 一般为 Cpu 核心*2  4*2
worker_processes  24;
# 日志输出参数
error_log  /var/log/nginx/error.log;
# 进程ID
#pid        logs/nginx.pid;

events {
    #指定运行模型
    use epoll;
    # 工作连接数  默认512 根据自己的情况调整
    worker_connections  1024;
}

#http模块
http {
    #能够支持的类型 在 这个文件下写着  mime.types
    include       mime.types;
    default_type  application/octet-stream;
    #关闭访问日志记录
    access_log  off;
    #启动 发送文件
    sendfile        on;
    #连接超时时间
    keepalive_timeout  65;
    # 开启压缩文件
    #gzip  on;

    server {
        listen       80;
        server_name  localhost;
        access_log  off;

        location /tiles {
#----------------------------------------------------需要调整路径
            alias   /map/;
            # 开启自动索引
            autoindex on;
	        index  index.html index.htm;
        }


        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

}

```

::::

### **3.OpenLayers3 加载离线 Google 地图**

搭建好离线瓦片服务之后，使用 OpenLayers 加载离线地图就非常简单了

::: details 代码示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Openlayers接入离线地图瓦片示例</title>
    <link rel="stylesheet" href="../css/demo.css" />
    <script src="../lib/openlayers/ol.js"></script>
  </head>

  <body>
    <div id="map" class="map"></div>
    <script>
      const mapTilesURL = "http://ip:port/tiles/{z}/{x}/{y}/tile.png" //瓦片服务请求地址
      const mapCenter = [116.403926, 39.919778] //地图中心 天安门附近
      const map = new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            source: new ol.source.XYZ({
              url: mapTilesURL,
            }),
          }),
        ],
        view: new ol.View({
          center: ol.proj.transform(mapCenter, "EPSG:4326", "EPSG:3857"), //地图中心
          zoom: 6, //地图当前层级
          maxZoom: 18, //最大层级
        }),
      })
    </script>
  </body>
</html>
```

:::

### **4.接入效果展示**

:point_down::point_down::point_down:  
![](https://raw.githubusercontent.com/202210230530/blog-images/master/blog-images/20230904111206.png)

### **5.OpenLayers 地图操作用例**

[OpenLayers 地图用例](./OpenLayers地图用例.html)  
[OpenLayers 亿级节点渲染方案](./OpenLayers亿级节点渲染方案.html)

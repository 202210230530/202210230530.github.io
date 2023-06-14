---
title: OpenLayers3加载离线Google地图
shortTitle: OpenLayers3加载离线Google地图
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
我需要干啥呢？

- [x] **把已经下载的文件同步到内网服务器**
- [x] **有新文件接入后自动同步到服务器**

咋整呢？写个脚本搞定就成！:thumbsup:  
作为摸:fish:老手，自己写脚本岂不是太 `low `了，这次我们**让`ChatGPT`为我们打工**写个脚本

:::: details GPT 生成脚本
Q: 请用 java 实现一个脚本，1.要求自动将 window 指定目录下的文件同步到 linux 服务器上。2.要求监听当前目录，有新文件时自动同步文件 3.脚本参数要求 window 目录可配置、linux 目录可配置

A: 正在为您搜索：java 实现脚本、window 目录、linux 服务器、文件同步

很高兴回答您的问题。根据您提供的要求，可以使用 Java 编写一个脚本来同步文件。

首先，使用 Java 中的 SFTP 库实现将文件从 Windows 同步到 Linux 服务器上。我们可以使用 JSch 库（[1]）来连接 Linux 服务器并上传文件。

接着，我们需要在 Windows 上监听目录的变化。我们可以使用 Java 标准库中的 WatchService 类实现（[2]）。

最后，在程序启动时，我们可以读取命令行参数以获取 Windows 和 Linux 目录的路径。这可以使用 Java 中的 Args4j 库（[3]）来实现。

示例代码如下：

```java
import com.jcraft.jsch.*;
import org.kohsuke.args4j.CmdLineException;
import org.kohsuke.args4j.CmdLineParser;

import java.io.IOException;
import java.nio.file.*;

public class FileSync {

    private static final int PORT = 22;

    private enum OS {
        WINDOWS,
        LINUX
    }

    private OS os;
    private Path windowsPath;
    private String linuxUser;
    private String linuxHost;
    private Path linuxPath;

    public static void main(String[] args) throws IOException {
        FileSync fileSync = new FileSync();
        fileSync.parseArgs(args);
        fileSync.watchDirectory();
    }

    private void parseArgs(String[] args) {
        FileSyncOptions options = new FileSyncOptions();
        CmdLineParser parser = new CmdLineParser(options);

        try {
            parser.parseArgument(args);
        } catch (CmdLineException e) {
            System.err.println(e.getMessage());
            parser.printUsage(System.err);
            System.exit(1);
        }

        windowsPath = Paths.get(options.getWindowsPath());
        linuxUser = options.getLinuxUser();
        linuxHost = options.getLinuxHost();
        linuxPath = Paths.get(options.getLinuxPath());

        if (System.getProperty("os.name").startsWith("Windows")) {
            os = OS.WINDOWS;
        } else {
            os = OS.LINUX;
        }
    }

    private void watchDirectory() throws IOException {
        WatchService watchService = FileSystems.getDefault().newWatchService();
        windowsPath.register(watchService, StandardWatchEventKinds.ENTRY_CREATE);

        while (true) {
            WatchKey key;
            try {
                key = watchService.take();
            } catch (InterruptedException e) {
                return;
            }

            for (WatchEvent<?> event : key.pollEvents()) {
                Path filePath = windowsPath.resolve((Path) event.context());
                syncFile(filePath.toString());
            }

            key.reset();
        }
    }

    private void syncFile(String filePath) {
        String destinationFilePath;

        if (os == OS.WINDOWS) {
            destinationFilePath = constructRemotePath(linuxPath, filePath);
        } else {
            destinationFilePath = linuxPath.resolve(filePath).toString();
        }

        JSch jsch = new JSch();
        Session session = null;
        ChannelSftp channel = null;

        try {
            session = jsch.getSession(linuxUser, linuxHost, PORT);
            session.setConfig("StrictHostKeyChecking", "no");
            session.connect();

            channel = (ChannelSftp) session.openChannel("sftp");
            channel.connect();

            channel.put(filePath, destinationFilePath);
        } catch (JSchException | SftpException e) {
            System.err.println("Failed to sync file: " + filePath);
            System.err.println(e.getMessage());
        } finally {
            if (channel != null) {
                channel.disconnect();
            }

            if (session != null) {
                session.disconnect();
            }
        }
    }

    private String constructRemotePath(Path remoteDir, String filePath) {
        Path fileName = Paths.get(filePath).getFileName();
        return remoteDir.resolve(fileName).toString();
    }
}

```

您可以使用以下命令行参数来运行：

```sh
java FileSync --windows-path "C:\path\to\directory" --linux-user user --linux-host host --linux-path "/path/to/directory"
```

其中，`--windows-path`指定 Windows 目录的路径，`--linux-user`和`--linux-host`指定 Linux 服务器的登录用户名和主机名，`--linux-path`指定 Linux 目录的路径。

希望这能帮到您！
::::

OK! 那我们试一下好不好用！ 不好用，下次再调试！

**2.使用 nginx 代理的方式将这些瓦片做成可以通过 http 链接`/offlineMapTiles/{z}/{x}/{y}.png`访问的服务**

我的 nginx 配置文件说明

### **3.OpenLayers3 加载离线 Google 地图**

### **4.绘制区域**

### **5.区域监控**

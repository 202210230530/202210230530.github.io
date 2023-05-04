---
title: 拒绝重复代码，高效摸鱼！！
shortTitle: VSCODE代码片段
icon: vscode
author: zzzzzxm
date: 2023-04-26 16:24:01
isOriginal: true
sticky: false
star: false
category:
  - 工作
  - 随笔
tag:
  - VSCODE
---

## 一、起步

### 1.如何设置

Windows 系统: 文件 > 首选项 > 用户代码片段

Mac 系统: Code > 首选项 > 用户片段

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a3e3e7d90b443ce8410ca683b3b966f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image)

### 2\. 选择已有代码片段或创建代码片段（可以对现有的进行修改，也可以新建代码片段）

代码片段分两种：

1.  全局代码片段（每种语言环境下都能触发代码块）。
2.  对应语言的局部代码片段（只能在对应语言环境下才能触发），新建全局代码片段会在 `snippets` 目录下生成 `.code-snippets` 为后缀的配置文件，而新建对应语言的代码片段会生成 `对应语言 + .json` 的配置文件。

> 下图是创建代码块的开始界面：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fe91e83aeaf49c68949ccf52845d910~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image)

如：我们新建一个叫 my-snippets 的代码片段文件

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e12d9742e48645abbc143bee4a5971c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image)

新建完之后会出现默认的示例，看起来是个类似 json 的配置文件。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce55e390e4ff4948b83eef058f30392f~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image)

接下来我们可以在开心的在新建的 `my-snippets.code-snippets` 文件中设置我们的代码片段了。 😀😀😀

## 二、Snippet 语法

然而创建后的默认示例你可能会懵逼，这，都是些啥？ 😳 😳 😳

接下来就用这个默认示例讲解一下 VSCode 的 Snippet 语法。

```php
// Example:
"Print to console": {
    "scope": "javascript,typescript",
    "prefix": "log",
    "body": [
        "console.log('$1');",
        "$2"
    ],
    "description": "Log output to console"
}
```

- `Example` 下面的 `Print to console` 对应代码片段名称（触发代码片段的时候会展示匹配到的代码片段名称）。
- `prefix` 对应触发代码片段的字符。
- `body` 对应代码片段内容，可以是字符串，也可以为数组，若为数组每个元素都做为单独的一行插入。`body` 的内容支持 js 的转义字符，如 `\n\r` 等，我个人不建议用 `\n` ，可另起一行给数组多插入一项，不然一行太多的话不容易观察代码块的格式。
- `description` 对应代码片段描述。

### 1.占位符 $

`log` 方法中 `$` 后面紧跟数字可指定代码片段触发落入编辑器之后的光标位置，光标位置按照从小到大排序。 `log` 方法中当你输入 `log + TAB` 之后光标会默认落到 `log()` 的括号中（`$1` 的位置），如果此时没有手动移动光标位置，再次按 `TAB` 则光标会落到 `console.log()` 的第二行（ `$2` 的位置），当然，你也可以设置 `$3、$4` ... 等等。

> 需要注意的是：👇

`$0` 用于设置最终光标的位置，设置了 `$0` 之后，再往后设置其他占位符则不会生效， `$0` 终止了 `TAB键` 的光标跳转操作。

### 2.占位内容的可选项

```perl
"方法注释": {
    "prefix": "zs-Function",
    "body": [
      "/**",
      " * @description description...",
      " * @param { ${1|Boolean,Number,String,Object,Array,*|} } name description...",
      " * @return { ${2|Boolean,Number,String,Object,Array,*|} } description...",
      " */",
      "$0"
    ],
    "description": "添加方法注释"
  }
```

上面是一个简单的方法注释代码块，占位符默认不带可选项，如果要设置占位内容的可选项，写法为 `${1|a,b,c}`，括号中的 `1` 对应的是按 `TAB` 之后的光标落点顺序， `abc` 为可选的项，用逗号隔开。所以上面的代码在输入 `zs + TAB` 后第一个光标会落在 `param name... {}` 的大括号中（`$1` 的位置），如下图可以看到设置的可选项。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b785edf7c7fc4424a17c2e307bd63357~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image)

选择了参数类型之后，再次按 `TAB` , 光标会自动落到返回参数类型处（`$2` 的位置）并弹出可选项。如下所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06d157ea12cb4f50a81382f1c899a681~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image)

选择了第二个选项之后，再次按 `TAB` ,光标自动落到我们配置的 `$0` 处，也就是 `*/` 的下一行：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/955b0a49efa54691ba0599e934e6813b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image)

> 需要注意的是：👇

- 如果可选择内容只有一个值的话可以写成 `${1:default}` 的格式。
- 占位内容支持嵌套，比如 `${1:another ${2:placeholder}}`。

### 3.变量

使用 `$name` 或者 `${name:default}` 可以插入变量的值。如果未设置变量，则会插入其默认值或空字符串。当变量未知（未定义其名称）时，会将插入的变量名称转换为占位符。

> **_VSCode 中可以使用以下变量：_**

**_1）文档相关：_**

| 变量               | 变量含义                       |
| ------------------ | ------------------------------ |
| `TM_SELECTED_TEXT` | 当前选定的文本或空字符串       |
| `TM_CURRENT_LINE`  | 当前行的内容                   |
| `TM_CURRENT_WORD`  | 光标下的单词内容或空字符串     |
| `TM_LINE_INDEX`    | 基于零索引的行号               |
| `TM_LINE_NUMBER`   | 基于单索引的行号               |
| `TM_FILENAME`      | 当前文档的文件名               |
| `TM_FILENAME_BASE` | 当前文档没有扩展名的文件名     |
| `TM_DIRECTORY`     | 当前文档的目录                 |
| `TM_FILEPATH`      | 当前文档的完整文件路径         |
| `CLIPBOARD`        | 剪贴板的内容                   |
| `WORKSPACE_NAME`   | 已打开的工作空间或文件夹的名称 |

**_2）当前日期和时间：_**

| 变量                       | 变量含义                                        |
| -------------------------- | ----------------------------------------------- |
| `CURRENT_YEAR`             | 当前年份                                        |
| `CURRENT_YEAR_SHORT`       | 当前年份的最后两位数                            |
| `CURRENT_MONTH`            | 月份为两位数（例如'02'）                        |
| `CURRENT_MONTH_NAME`       | 月份的全名（例如'June'）（中文语言对应六月）    |
| `CURRENT_MONTH_NAME_SHORT` | 月份的简称（例如'Jun'）（中文语言对应是 6 月）  |
| `CURRENT_DATE`             | 这个月的哪一天                                  |
| `CURRENT_DAY_NAME`         | 当天是星期几（例如'星期一'）                    |
| `CURRENT_DAY_NAME_SHORT`   | 当天是星期几的简称（例如'Mon'）（中文对应周一） |
| `CURRENT_HOUR`             | 24 小时时钟格式的当前小时                       |
| `CURRENT_MINUTE`           | 当前分                                          |
| `CURRENT_SECOND`           | 当前秒                                          |

**_3）要插入行或块注释，请遵循当前语言：_**

| 变量                  | 变量含义                      |
| --------------------- | ----------------------------- |
| `BLOCK_COMMENT_START` | 输出：PHP /\*或 HTML 格式<!-- |
| `BLOCK_COMMENT_END`   | 输出：PHP \*/或 HTML 格式-->  |
| `LINE_COMMENT`        | 输出：PHP //或 HTML 格式      |

举个栗子：

> ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d253ba67a4b49dd92a171fb16f55f6c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image)

下面的代码块是常用的文件顶部添加作者和时间的块注释，其中用到了年（`CURRENT_YEAR`）月（`CURRENT_MONTH`）日（`$CURRENT_DATE`）的系统变量。

```bash
"作者和时间注释": {
    "prefix": "zs-Author & Time",
    "body": [
      "/**",
      " * Created by preference on $CURRENT_YEAR/$CURRENT_MONTH/$CURRENT_DATE",
      " */",
      "$0"
    ],
    "description": "添加作者和时间注释"
  }
```

再举个栗子：

> ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bec04f95151e428caaa662cb5e9eefc8~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.image)

下面的代码块是新建 `.Vue` 文件的模板代码块，其中用到了当前文档没有扩展名的文件名（`TM_FILENAME_BASE`），默认把文件名填入 `name` 和 `class` 中。

```swift
 "Vue模板": {
    "prefix": "vue-template",
    "body": [
      "<template>",
      "  <section class=\"$TM_FILENAME_BASE\">",
      "    $1",
      "  </section>",
      "</template>\n",
      "<script>",
      "export default {",
      " name: '$TM_FILENAME_BASE',",
      "  data() {",
      "    return {\n",
      "    }",
      "  },",
      "  components: {},",
      "  watch: {},",
      "  mounted() {},",
      "  methods: {}",
      "}",
      "</script>\n",
      "<style scoped lang=\"less\">\n",
      "</style>",
      "$0"
    ],
    "description": "Vue模板"
  }
```

## 三、开始使用

以写博客方便为例子，通过占位符和变量组合配合[VSCode 代码片段生成器](https://99cc.vip/public/tools/vscode_snippet/index.html)生成我们的 Vuepress 常用代码片段

::: tabs

@tab Frontmatter 代码

```json
/*markdown中的Frontmatter配置代码片段*/
	"vuepress-frontmatter": {
		"prefix": "blog",
		"body": [
			"---",
			"title: ${1:当前页面内容标题}",
			"shortTitle: $TM_FILENAME_BASE",
			"icon: ${2|note,html,css,javascript,es6,java,vue,react,linux,nginx,mysql,http,vscode,typescript,strong,repo,git|}",
			"author: zzzzzxm",
			"date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
			"isOriginal: ${3|true,false|}",
			"sticky: ${4|false,true|}",
			"star: ${5|false,true,任意number|}",
			"category:",
			"  - ${6|工作,生活,摸鱼|}",
			"  - ${7|随笔,日常记录,技术方案,小技巧,小游戏|}",
			"tag:",
			"  - ${8|HTML,CSS,JS,JAVA,MYSQL,NGINX,VUE,REACT,WEBPACK,VITE,GIT,TS,VSCODE,工具|}",
			"---"
		],
		"description": "博客Frontmatter配置"
	}
```

@tab 卡片代码

````json
	/*markdown增强部分代码片段*/
	"vuepress markdown增强语法卡片代码片段": {
		"prefix": "```card",
		"body": [
			"```card",
			"title: ${1:卡片标题}",
			"desc: ${2:卡片描述}",
			"logo: ${3:卡片LOGO}",
			"link: ${4:卡片链接地址}",
			"color: #096DD9",
			"```"
		],
		"description": "vuepress markdown增强语法card代码片段"
	}
````

@tab 自定义容器代码

````json
	/*markdown增强部分自定义容器代码片段*/
	"vuepress markdown增强语法自定义容器代码片段": {
		"prefix": "```container",
		"body": [
			":::: ${1|info,note,tip,warning,danger,details|} ${2:容器标题}",
			"${3:容器内容}",
			"::::"
		],
		"description": "vuepress markdown增强语法自定义容器代码片段"
	}
````

@tab TABS 代码

````json
	/*markdown增强部分TABS代码片段*/
	"vuepress markdown增强语法TABS代码片段": {
		"prefix": "```tabs",
		"body": [
			"::: tabs",
			"",
			"@tab ${1:选项卡1的标题}",
			"",
			"<!-- tab 1 内容 -->",
			"",
			"@tab ${2:选项卡2的标题}",
			"",
			"<!-- tab 2 内容 -->",
			"",
			":::",
			""
		],
		"description": "vuepress markdown增强语法TABS代码片段"
	}
````

:::

参考文章：[Creating your own snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets "https://code.visualstudio.com/docs/editor/userdefinedsnippets")

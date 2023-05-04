import { sidebar } from "vuepress-theme-hope"

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "快乐工作",
      icon: "keyboard",
      prefix: "work/",
      link: "work/",
    },
    {
      text: "快乐生活",
      icon: "note",
      prefix: "life/",
      link: "life/",
    },
    {
      text: "快乐摸鱼",
      icon: "note",
      prefix: "moyu/",
      link: "moyu/",
    },
    {
      text: "文章",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
  "/work/": [
    {
      text: "实用技巧汇总",
      icon: "style",
      prefix: "skills/",
      children: "structure",
    },
    {
      text: "解决方案记录",
      icon: "workingDirectory",
      prefix: "records/",
      children: "structure",
    },
    {
      text: "技术文档分享",
      icon: "repo",
      prefix: "documents/",
      children: "structure",
    },
    {
      text: "随便玩玩",
      icon: "alias",
      prefix: "fun/",
      children: "structure",
    },
  ],
  "/life/": [
    {
      text: "运动打卡",
      icon: "strong",
      prefix: "fitness/",
      children: "structure",
    },
    {
      text: "装修记录",
      icon: "linter",
      prefix: "furnish/",
      children: "structure",
    },
  ],
  "/moyu/": [
    {
      text: "摸鱼小游戏",
      icon: "window",
      prefix: "games/",
      children: "structure",
    },
    {
      text: "身心愉悦",
      icon: "actions",
      prefix: "happy/",
      children: "structure",
    },
  ],
})

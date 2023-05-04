import { navbar } from "vuepress-theme-hope"

export const zhNavbar = navbar([
  "/",
  {
    text: "快乐工作",
    icon: "keyboard",
    prefix: "/work/",
    children: [
      {
        text: "实用技巧汇总",
        icon: "style",
        link: "skills/",
      },
      {
        text: "解决方案记录",
        icon: "workingDirectory",
        link: "records/",
      },
      { text: "技术文档分享", icon: "repo", link: "documents/" },
      { text: "随便玩玩", icon: "alias", link: "fun/" },
      { text: "拒绝健忘", icon: "proposal", link: "token/" },
    ],
  },
  {
    text: "快乐生活",
    icon: "line",
    prefix: "/life/",
    children: [
      {
        text: "运动打卡",
        icon: "strong",
        link: "fitness/",
      },
      {
        text: "装修记录",
        icon: "linter",
        link: "furnish/",
      },
    ],
  },
  {
    text: "快乐摸鱼",
    icon: "network",
    prefix: "/moyu/",
    children: [
      {
        text: "摸鱼小游戏",
        icon: "window",
        link: "games/",
      },
      {
        text: "身心愉悦",
        icon: "actions",
        link: "happy/",
      },
    ],
  },
])

import { defineUserConfig } from "vuepress"
import theme from "./theme.js"
import plugins from "./plugins.js"
export default defineUserConfig({
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Zzzzzxm的摸鱼小破站",
      description: "随便写点东西，反正比闲着刷抖音强",
    },
    // "/zh/": {
    //   lang: "zh-CN",
    //   title: "快乐摸鱼",
    //   description: "随便写点东西，反正比闲着刷抖音强",
    // },
  },

  theme,

  plugins,
  // Enable it with pwa
  shouldPrefetch: false,
})

import { Plugin } from "vuepress"
import { searchProPlugin } from "vuepress-plugin-search-pro"

/**
 * 拓展组件
 */
const plugins: Plugin[] = []
/**添加全局搜索组件 */
plugins.push(
  searchProPlugin({
    indexContent: true,
    hotReload: true,
    customFields: [
      {
        getter: ({ frontmatter }) => frontmatter.tag as string[],
        formatter: `标签: $content`,
      },
      {
        getter: (page) => page.frontmatter.category,
        formatter: `分类: $content`,
      },
    ],
  })
)
export default plugins

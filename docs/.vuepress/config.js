const { navList } = require('../config/nav');
const { sidebarList } = require('../config/sidebar');

module.exports = {
  title: '奔跑的蜗牛',  //标题
  keywords: '前端开发',
  description: '技术笔录',
  repo: 'https://github.com/KavenLong?tab=repositories',  //仓库地址
  base: '/snails/',  // 配合部署项目
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  lastUpdated: 'Last Updated',
  themeConfig: {  //主题配置
    logo: '/img/logo.png',
    nav: navList,
    sidebar: sidebarList
  }
}

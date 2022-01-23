const { navList } = require('../config/nav');
const { sidebarList } = require('../config/sidebar');

module.exports = {
  theme: 'vdoing',
  title: '奔跑的蜗牛',
  keywords: '前端开发',
  description: '技术笔录',
  repo: 'https://github.com/KavenLong?tab=repositories',
  base: '/snails/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  lastUpdated: 'Last Updated',
  plugins: [['one-click-copy', {
    copyMessage: '复制成功',
    toolTipMessage: '剪切成功',
    duration: 300,
  }]],
  themeConfig: {
    author: 'Kaven',
    logo: '/img/logo.png',
    nav: navList,
    sidebar: sidebarList
  }
}

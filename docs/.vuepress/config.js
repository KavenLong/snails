const { navList } = require('../config/nav');
const { sidebarList } = require('../config/sidebar');

module.exports = {
  theme: 'vdoing',
  title: "Kaven's Blog",
  keywords: '前端开发',
  description: "Kaven's Blog",
  repo: 'https://github.com/KavenLong?tab=repositories',
  base: '/snails/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: "Kaven's Blog"}]
  ],
  lastUpdated: 'Last Updated',
  markdown: {
    lineNumbers: true
  },
  plugins: [['one-click-copy', {
    copyMessage: '复制成功',
    toolTipMessage: '剪切成功',
    duration: 300,
  }]],
  themeConfig: {
    author: 'Kaven',
    logo: '/img/logo.png',
    nav: navList,
    sidebar: sidebarList,
    footer: {
      copyrightInfo: 'Kaven'
    },
    // 博主信息 (显示在首页侧边栏)
    blogger: {
      avatar: '/snails/img/author.jpg',
      name: 'Kaven Long',
      slogan: '人生这条路怎么选都有遗憾 何不拼一把',
    },
  }
}

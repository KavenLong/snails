module.exports = {
  title: '奔跑的蜗牛',  //标题
  keywords: '前端开发',
  description: '技术笔录',
  repo: 'https://github.com/zeroonbush/blog.git',  //仓库地址
  base: '/snails/',  // 配合部署项目
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  lastUpdated: 'Last Updated',
  themeConfig: {  //主题配置
    logo: '/img/logo.png',
    nav: [  //导航栏
      { text: '首页', link: '/' },
      { text: '工具软件', link: '/js_docs/' },
      { text: '前端', link: '/css_docs/' },
      { 
        text: '项目构建',
        items: [
          { text: 'Webpack', link: '/guide/vue/test01' },
          { text: 'Vite', link: '/guide/vue/test02' }
        ]
      },
      { text: 'Node', link: '/react_docs/' },
      { text: '问题收录', link: '/react_docs/' },
      { text: 'DevOps', link: '/react_docs/' },
      {
        text: '2020',
        items: [  //多级导航栏
          { text: 'May', link: '/guide/vue/test01' },
          { text: 'June', link: '/guide/vue/test02' }
        ]
      },
      { text: 'github', link: 'https://github.com/zeroonbush/blog.git' }
    ],
    sidebar: {  //侧边拦，对应导航中的link文件夹路径，注意这里是 ‘/’结束
      '/guide/vue/': [
        {
          title: 'Vue 学习',
          collapsable: true,
          children: [{
            title: '测试01',
            path: 'test01'
          }, {
            title: '测试02',
            path: 'test02'
          }]
        }
      ],
      '/': ['']
    }
  }
}

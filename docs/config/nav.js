const navList = [ //导航栏
  {
    text: '工具软件',
    link: '/js_docs/'
  },
  {
    text: '前端',
    items: [{
      text: 'TypeScript整理',
      link: '/guide/typescript/typescript'
    }]
  },
  {
    text: '工程化',
    items: [{
      text: '构建工具',
      items: [{
          text: 'Webpack',
          link: '/guide/build-tools/build-webpack/webpack'
        },
        {
          text: 'Vite',
          link: '/guide/build-tools/build-vite/vite'
        }
      ]
    }],
  },
  {
    text: '服务端',
    link: '/react_docs/'
  },
  {
    text: '问题收录',
    link: '/react_docs/'
  },
  {
    text: 'DevOps',
    link: '/react_docs/'
  },
  {
    text: 'github',
    link: 'https://github.com/KavenLong?tab=repositories'
  }
]

module.exports = {
  navList
}
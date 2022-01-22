const sidebarList = { //侧边拦，对应导航中的link文件夹路径，注意这里是 ‘/’结束
  '/guide/typescript-finishing/': [{
    title: 'TypeScript',
    collapsable: false,
    children: [{
      title: 'TypeScript介绍',
      path: 'introduction'
    }, {
      title: 'TypeScript整理',
      path: 'typescriptFinishing'
    }]
  }],
  '/guide/build-tools/build-webpack/': [{
    title: 'webpack项目构建',
    collapsable: false,
    children: [{
      title: 'webpack介绍',
      path: 'webpack'
    }]
  }],
  '/guide/build-tools/build-vite/': [{
    title: 'vite项目构建',
    collapsable: false,
    children: [{
      title: 'vite介绍',
      path: 'vite'
    }]
  }],
  '/': ['']
}

module.exports = {
  sidebarList
}
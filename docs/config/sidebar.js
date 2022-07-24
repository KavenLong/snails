const sidebarList = { //侧边拦，对应导航中的link文件夹路径，注意这里是 ‘/’结束
  '/typescript/': [{
    title: 'TypeScript',
    collapsable: false,
    children: [{
      title: 'TypeScript简介',
      path: 'introduction'
    }, {
      title: 'TypeScript规范',
      path: 'specification'
    }, {
      title: 'TypeScript整理',
      path: 'typescriptFinishing'
    }]
  }],
  '/build-tools/build-webpack/': [{
    title: 'webpack项目构建',
    collapsable: false,
    children: [{
      title: 'webpack介绍',
      path: 'webpack'
    }]
  }],
  '/build-tools/build-vite/': [{
    title: 'vite项目构建',
    collapsable: false,
    children: [{
      title: 'vite介绍',
      path: 'vite'
    }]
  }],
  '/bit/': [{
    title: 'Bit',
    collapsable: false,
    children: [{
      title: 'Bit 私有化部署',
      path: 'bit'
    }]
  }],
  '/': ['']
}

module.exports = {
  sidebarList
}
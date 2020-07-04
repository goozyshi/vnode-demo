const menu = [
  {
    path: '/',
    name: 'Home',
    label: '首页',
    icon: 'el-icon-s-home'
  },
  {
    path: '/book',
    name: '书籍',
    label: '书籍',
    icon: 'el-icon-reading',
    children: [
      { path: '/cover', name: 'cover', label: '封面' },
      { path: '/codex', name: 'codex', label: '附录' }
    ]
  },
  {
    path: '/other',
    name: 'other',
    label: '其他',
    icon: 'el-icon-magic-stick',
    children: [
      { path: '/about', name: 'about', label: '关于' }
    ]
  }
]
export default menu

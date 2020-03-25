const headerMenuConfig = [];

/** @description options
 * path {String} 路由地址
 * icon {String} 菜单的图标
 * name {String} 菜单的名称,
 * children {Array} 子菜单
 * nav {Number} 菜单类型，1左侧菜单，2右侧菜单，默认1
 * hideInMenu {Boolean} 是否在菜单中显示
 * authorities {Array} 权限列表标识
 */
const asideMenuConfig = [
  {
    name: '数据页面',
    path: '/dashboard',
    icon: 'chart-pie',
    children: [
      {
        name: '分析页面',
        path: '/dashboard/analysis',
        authorities: ['add', 'edit']
      }
    ]
  },
  {
    name: '列表页面',
    path: '/list',
    icon: 'chart-bar',
    // nav: 2,
    children: [
      {
        name: '卡片列表',
        path: '/list/card'
      }
    ]
  },
  {
    name: '结果&缺省',
    path: '/feedback',
    icon: 'warning',
    children: [
      {
        name: '成功页面',
        path: '/feedback/success'
      },
      {
        name: '失败页面',
        path: '/feedback/fail'
      },
      {
        name: '403',
        path: '/feedback/403'
      },
      {
        name: '404',
        path: '/feedback/404'
      },
      {
        name: '500',
        path: '/feedback/500'
      }
    ]
  },
  {
    name: '登录&注册',
    path: '/user',
    icon: 'account',
    hideInMenu: true,
    children: [
      {
        name: '登录',
        path: '/user/login'
      },
      {
        name: '注册',
        path: '/user/register'
      }
    ]
  }
];

export { headerMenuConfig, asideMenuConfig };

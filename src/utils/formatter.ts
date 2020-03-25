import { pathToRegexp } from 'path-to-regexp';
import { Tabs } from '@/routes';

/**
 * @description 格式化菜单数据，把菜单数组转化为key:value的形式
 * [{name: "默认页面", path: "/app/index", icon: "book"}] =>{"/app/index": {name: "默认页面", path: "/app/index", icon: "book"}}
 * @param {Array} menuConfig
 * @returns {Object}
 */
function getFlatMenuData(menuConfig) {
  let keys = {};
  menuConfig.forEach(item => {
    if (item.children) {
      keys[item.path] = {
        ...item
      };
      keys = {
        ...keys,
        ...getFlatMenuData(item.children)
      };
    } else {
      keys[item.path] = {
        ...item
      };
    }
  });
  return keys;
}
/**
 * @description 格式化菜单，返回路由与菜单匹配数据[{name:string,path:string,component:JSX}]
 * @param {Array}  routerConfig
 * @param {Array} menuConfig
 * @returns {Array}
 */
function getRouterData(routerConfig, asideMenuConfig) {
  const menuData = getFlatMenuData(asideMenuConfig);
  // console.log('原始路由', routerConfig);
  // console.log('权限菜单', asideMenuConfig);
  // console.log('格式化后的数据', menuData);
  const routerData: any[] = [];
  routerConfig.forEach((item, index) => {
    // 过滤菜单，当路由的 path 能在 menuData 中找到匹配（即菜单项对应路由），则合并菜单数据
    // eg.  router /product/:id === /product/123
    const pathRegexp = pathToRegexp(item.path);
    const menuKey = Object.keys(menuData).find(key =>
      pathRegexp.test(`${key}`)
    );
    let menuItem: { [attr: string]: any } = {};
    if (menuKey) {
      menuItem = menuData[menuKey];
      let router = routerConfig[index];
      router = {
        ...menuItem,
        ...router,
        name: router.name || menuItem.name
      };
      // 通过后台设置配置模板，嵌套右侧菜单显示容器
      if (
        router.children &&
        Array.isArray(router.children) &&
        Number(router.nav) === 2
      ) {
        router.component = Tabs;
      }
      routerData.push(router);
    }
  });
  // console.log('处理后的路由权限数据', routerData);
  return routerData;
}

export { getRouterData };

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { pathToRegexp } from 'path-to-regexp';
import { Link, withRouter, store as appStore } from 'ice';
import { Nav } from '@alifd/next';
import { getRouterData } from '@/utils/formatter';
import routerConfig from '@/routes';
import { IMenuItem } from '@/models/app';
import { asideMenuConfig } from '../../menuConfig';

const SubNav = Nav.SubNav;
const NavItem = Nav.Item;

function getNavMenuItems(menusData: any[], isCollapse = false) {
  if (!menusData) {
    return [];
  }

  return menusData
    .filter(item => item.name && !item.hideInMenu)
    .map((item, index) => {
      return getSubMenuOrItem(item, index, isCollapse);
    });
}

function getSubMenuOrItem(item: IMenuItem, index: number, isCollapse: boolean) {
  if (
    item.children &&
    item.children.some(child => child.name && item.nav !== 2)
  ) {
    const childrenItems = getNavMenuItems(item.children);
    if (childrenItems && childrenItems.length > 0) {
      const subNav = (
        <SubNav
          key={item.path}
          icon={item.icon}
          label={item.name}
          mode={isCollapse ? 'popup' : 'inline'}
        >
          {childrenItems}
        </SubNav>
      );

      return subNav;
    }
    return null;
  }
  const navItem = (
    <NavItem key={item.path} icon={item.icon}>
      <Link to={item.path}>{item.name}</Link>
    </NavItem>
  );

  return navItem;
}
interface Arr {
  path: string;
  component: any;
}
/**
 * @description 格式化路由配置 [{path,component}]
 * @param routers
 */
function formatterRouter(routers: typeof routerConfig): Arr[] {
  const arr: Arr[] = [];
  for (const item of routers) {
    if (item.children && Array.isArray(item.children)) {
      arr.push(
        ...item.children
          .filter(items => items.component)
          .map(items => ({ path: items.path, component: items.component }))
      );
    }
  }
  return arr;
}
const Navigation = (props, context) => {
  const { location } = props;
  const { pathname } = location;
  const { isCollapse } = context;
  const actions = appStore.useModelActions('app');
  const pathRegexp = pathToRegexp(pathname);
  /**
   * @description 获取默认展开菜单项
   */
  const getDefaultOpenKeys = () => {
    type OpenKeys = string[];
    function getRoot(
      list,
      parentPath: undefined | string = undefined
    ): OpenKeys {
      const [...arr] = list;
      let data: OpenKeys = [];
      for (const item of arr) {
        if (pathRegexp.test(item.path)) {
          data = (parentPath &&
            parentPath.split(',').filter(items => items)) || [item.path];
          break;
        }
        if (item.children && Array.isArray(item.children)) {
          data = getRoot(
            item.children,
            (parentPath && `${parentPath},${item.path}`) || item.path
          );
        }
        if (data.length > 0) {
          break;
        }
      }
      return data;
    }
    return getRoot(asideMenuConfig);
  };
  useEffect(() => {
    const routerList = formatterRouter(routerConfig);
    const list = getRouterData(routerList, asideMenuConfig);
    actions.setRouterList(list);
  }, []);

  return (
    <Nav
      type="primary"
      selectedKeys={[pathname]}
      defaultOpenKeys={getDefaultOpenKeys()}
      defaultSelectedKeys={[pathname]}
      embeddable
      openMode="single"
      iconOnly={isCollapse}
      hasArrow={false}
    >
      {getNavMenuItems(asideMenuConfig, isCollapse)}
    </Nav>
  );
};

Navigation.contextTypes = {
  isCollapse: PropTypes.bool
};

const PageNav = withRouter(Navigation);

export default PageNav;

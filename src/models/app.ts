import { getDefaultLanguage } from '@/locales';

export interface IMenuItem {
  name: string;
  path: string;
  component: any;
  icon?: string;
  nav?: number; // 子菜单显示方式，默认左侧，2右侧
  hideInMenu?: boolean; // 菜单是否显示
  authorities?: string[];
  children?: IMenuItem[];
}
interface Locales {
  state: {
    language: string;
    routerList: IMenuItem[];
  };
  reducers: any;
  effects: any;
}
const locales: Locales = {
  state: {
    language: getDefaultLanguage(), // 系统语言
    routerList: [] // 权限路由数据
  },
  reducers: {
    setRouterList(prevState, list) {
      return {
        ...prevState,
        routerList: list
      };
    }
  },
  effects: {}
};

export default locales;

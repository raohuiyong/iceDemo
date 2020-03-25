import { lazy } from 'ice';

export const Tabs = lazy(() => import('@/layouts/Tabs'));
/**
 * path {String} 除了根目录'/'和'/user'外，一级目录（如/list）需要配合nav: 2使用，否则会默认到子菜单的第一个或者'/'下面的第一个
 * exact {Boolean} 严格匹配模式
 */
const routerConfig = [
  {
    path: '/user',
    component: lazy(() => import('@/layouts/UserLayout')),
    children: [
      {
        path: '/login',
        component: lazy(() => import('@/pages/Login'))
      },
      {
        path: '/register',
        component: lazy(() => import('@/pages/Register'))
      },
      {
        path: '/',
        redirect: '/user/login'
      }
    ]
  },
  {
    path: '/',
    component: lazy(() => import('@/layouts/BasicLayout')),
    children: [
      {
        path: '/aishop/user/tabs',
        component: Tabs
      },
      {
        path: '/dashboard/analysis',
        component: lazy(() => import('@/pages/Analysis'))
      },
      {
        path: '/list',
        exact: true,
        component: Tabs
      },
      {
        path: '/list/card',
        component: lazy(() => import('@/pages/CardListPage'))
      },
      {
        path: '/feedback/fail',
        component: lazy(() => import('@/pages/FeedbackFail'))
      },
      {
        path: '/feedback/success',
        component: lazy(() => import('@/pages/FeedbackSuccess'))
      },
      {
        path: '/feedback/403',
        component: lazy(() => import('@/pages/FeedbackForbidden'))
      },
      {
        path: '/feedback/404',
        component: lazy(() => import('@/pages/FeedbackNotFound'))
      },
      {
        path: '/feedback/500',
        component: lazy(() => import('@/pages/FeedbackServerError'))
      },
      {
        path: '/',
        redirect: '/dashboard/analysis'
      }
    ]
  }
];
export default routerConfig;

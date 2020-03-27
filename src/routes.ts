import { lazy } from 'ice';
import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: lazy(()=> import('@/pages/Login')),
      },
      {
        path: '/register',
        component: lazy(()=> import('@/pages/Register')),
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard/analysis',
        component: lazy(()=> import('@/pages/Analysis')),
      },
      {
        path: '/dashboard/monitor',
        component: lazy(()=> import('@/pages/Monitor')),
      },
      {
        path: '/',
        redirect: '/dashboard/analysis',
      },
    ],
  },
];
export default routerConfig;

import * as React from 'react';
import { createApp } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';

const locale = getLocale();

const appConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    ),
  },
  router: {
    type: 'browser',
    fallback: <div>路由加载中....</div>
  },
};
createApp(appConfig);

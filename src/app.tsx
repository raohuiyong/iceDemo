import * as React from 'react';
import { createApp, IAppConfig } from 'ice';
import PageLoading from '@/components/PageLoading';
import LocaleProvider from '@/components/LocaleProvider';

/* IFTRUE_isChina */
console.log(process.env.NODE_ENV);
/* FITRUE_isChina */

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => <LocaleProvider>{children}</LocaleProvider>
  },
  router: {
    type: 'browser',
    fallback: <PageLoading />
  },
  request: {
    baseURL: '',
    interceptors: {
      request: {
        onConfig: config => {
          return config;
        },
        onError: error => {
          return Promise.reject(error);
        }
      },
      response: {
        onConfig: config => {
          return config;
        },
        onError: error => {
          return Promise.reject(error);
        }
      }
    }
  }
};
createApp(appConfig);

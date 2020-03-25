import React, { Fragment } from 'react';
import { withRouter, store as appStore } from 'ice';
import { pathToRegexp } from 'path-to-regexp';
import { Tab } from '@alifd/next';
import PageLoading from '@/components/PageLoading';

function Tabs(props) {
  const [counterState] = appStore.useModel('app');
  const { routerList } = counterState;
  const { location, history } = props;
  const parents = routerList.filter(item => {
    const pathRegexp = pathToRegexp(location.pathname);
    if (pathRegexp.test(item.path)) {
      return true;
    }
    return false;
  })[0];
  const list = ((parents && parents?.nav === 2 && parents?.children) || []).map(
    item => {
      const pathRegexp = pathToRegexp(item.path);
      return routerList.filter(itemNext => {
        if (pathRegexp.test(itemNext.path)) {
          return true;
        }
        return false;
      })[0];
    }
  );
  if (parents && parents?.nav !== 2) {
    const { path = '/' } =
      ((parents && parents?.children) || []).filter(item => item)[0] || {};
    history.replace(path);
  }
  return (
    <Fragment>
      {(list.length > 0 && (
        <Tab size="small" shape="capsule">
          {list.map(item => {
            return (
              <Tab.Item title={item.name} key={item.path}>
                <item.component authorities={item.authorities} />
              </Tab.Item>
            );
          })}
        </Tab>
      )) || <PageLoading />}
    </Fragment>
  );
}
export default withRouter(Tabs);

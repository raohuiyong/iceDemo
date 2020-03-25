import React, { useState, useCallback, useEffect, Suspense } from 'react';
import { ConfigProvider } from '@alifd/next';
import intl from 'react-intl-universal';
import PageLoading from '@/components/PageLoading';
import locales, { getDefaultLanguage, getDefaultLocale } from '@/locales';
import { getDevice } from '@/utils';

(function() {
  const throttle = function(type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})();

interface Props {
  children: React.ReactElement;
}
function LocaleProvider(props: Props) {
  console.log('111111');
  const { children } = props;
  const languages = getDefaultLanguage();
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>(
    getDevice(NaN)
  );
  const onResize = useCallback((e: any) => {
    setDevice(getDevice(e && e.target && e.target.innerWidth));
  }, []);
  useEffect(() => {
    window.addEventListener('optimizedResize', onResize);
    return () => {
      window.removeEventListener('optimizedResize', onResize);
    };
  }, []);
  intl.init({
    currentLocale: languages,
    locales
  });

  function fallbackUI(props) {
    const { error, errorInfo } = props;
    return <h1 style={{ color: 'red' }}>Error: {error.toString()}</h1>;
  }
  function afterCatch(error, errorInfo) {
    console.log('错误捕获');
    console.error(error);
    console.error(errorInfo);
  }
  return (
    <ConfigProvider locale={getDefaultLocale(languages)} device={device}>
      <ConfigProvider.ErrorBoundary
        fallbackUI={fallbackUI}
        afterCatch={afterCatch}
      >
        <Suspense fallback={<PageLoading />}>
          {React.Children.only(children)}
        </Suspense>
      </ConfigProvider.ErrorBoundary>
    </ConfigProvider>
  );
}

export default LocaleProvider;

const webpack = require('webpack');
const localConfig = require('./src/utils/config');
const package = require('./package.json');

// 设置项目最终生成目录地址
const outputDir =
  (process.env.npm_config_local_set &&
    `dist_${process.env.npm_config_local_set}`) ||
  'dist';

// 按需编译配置
const compileOptions = {
  isINT: (process.env.npm_config_local_set || 'zh_cn') !== 'zh_cn', // 国际版
  isChina: (process.env.npm_config_local_set || 'zh_cn') === 'zh_cn' // 国内版
};

// 接口代理配置
const proxy = {
  '/system/': {
    target: localConfig.developmentIP,
    secure: !/^https:\/\//.test(localConfig.developmentIP),
    changeOrigin: true,
    enable: true
  }
};
// 默认的环境配置
const defineDefault = {
  VERSION: `v${package.version}`,
  OSIP: localConfig.productionIP
};

module.exports = ({ context, onGetWebpackConfig }) => {
  context.userConfig.outputDir = outputDir;
  context.userConfig.proxy = proxy;
  context.userConfig.define = Object.assign(
    {},
    context.userConfig.define,
    defineDefault
  );
  if (process.env.NODE_ENV === 'production') {
    // 生产环境
    context.userConfig.define = Object.assign({}, context.userConfig.define, {
      OSIP: localConfig.productionIP
    });
  }
  onGetWebpackConfig(config => {
    ['tsx', 'ts'].forEach(rule => {
      if (config.module.rules.get(rule)) {
        config.module
          .rule(rule)
          .use('js-conditional-compile-loader')
          .loader('js-conditional-compile-loader')
          .options(compileOptions);
      }
    });

    if (process.env.NODE_ENV === 'production') {
      const date = new Date();
      config.plugin('WebpackBannerPlugin').use(
        new webpack.BannerPlugin(`
      *************************************************************************
      *
      * DeepCam Shenzhen CONFIDENTIAL
      * FILE: <tag>
      *
      *  [2016] - [${date.getFullYear()}] DeepCam Shenzhen
      *  All Rights Reserved.

     NOTICE:
      * All information contained herein is, and remains the property of DeepCam Shenzhen.
      * The intellectual and technical concepts contained herein are proprietary to DeepCam
      * Shenzhen and may be covered by China and Foreign Patents,patents in process, and
      * are protected by trade secret or copyright law.
      * Dissemination of this information or reproduction of this material
      * is strictly forbidden unless prior written permission is obtained
      * DeepCam Shenzhen.
      *
      *
      * Written: huiyong.rao
      * Updated: ${date.getFullYear()}年${date.getMonth() +
          1}月${date.getDate()}日
      *`)
      );
    } else {
      ['scss-module'].forEach(rule => {
        if (config.module.rules.get(rule)) {
          config.module
            .rule(rule)
            .use('css-module-ts-loader')
            .loader('css-modules-typescript-loader')
            .before('css-loader');
        }
      });
      config
        .plugin('WatchIgnorePlugin')
        .use(new webpack.WatchIgnorePlugin([/css\.d\.ts$/]));
    }
    config.performance.hints(false);
  });
};

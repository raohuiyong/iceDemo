import moment from 'moment';
import { getLocale } from '@/utils/locale';

import alifdENUS from '@alifd/next/lib/locale/en-us';
// eslint-disable-next-line import/order
import initENUS from './en-US';

/* IFTRUE_isChina */
import 'moment/locale/zh-cn';
import 'moment/locale/zh-tw';
import alifdZHTW from '@alifd/next/lib/locale/zh-tw';
import alifdZHCN from '@alifd/next/lib/locale/zh-cn';
import initZHCN from './zh-CN';
import initZHTW from './zh-TW';
/* FITRUE_isChina */

// 全局语言类型常量
export const enUS = 'en-US';
/* IFTRUE_isChina */
export const zhCN = 'zh-CN';
export const zhTW = 'zh-TW';
/* FITRUE_isChina */

interface Locales {
  [enUS]: any /* IFTRUE_isChina */;
  [zhCN]: any;
  [zhTW]: any /* FITRUE_isChina */;
}
// 用户自定义语言
const locales: Locales = {
  [enUS]: initENUS /* IFTRUE_isChina */,
  [zhCN]: initZHCN,
  [zhTW]: initZHTW /* FITRUE_isChina */
};
// 框架内置语言
const internal: Locales = {
  [enUS]: alifdENUS /* IFTRUE_isChina */,
  [zhCN]: alifdZHCN,
  [zhTW]: alifdZHTW /* FITRUE_isChina */
};

export function getDefaultLanguage(
  str: string | undefined = undefined,
  languages = locales
): string {
  const lang = str || getLocale();
  return (
    (Object.keys(languages).includes(lang) && lang) /* IFTRUE_isChina */ ||
    zhCN /* FITRUE_isChina */ ||
    enUS
  );
}
interface LocaleObj {
  [attr: string]: string;
}
export function getDefaultLocale(
  str: string | undefined = undefined
): LocaleObj {
  const lang: string = getDefaultLanguage(str, internal);
  switch (lang) {
    /* IFTRUE_isChina */
    case zhCN:
      moment.locale('zh-cn');
      return internal[zhCN];
    case zhTW:
      moment.locale('zh-tw');
      return internal[zhTW];
    /* FITRUE_isChina */
    default:
      moment.locale('en');
      return internal[enUS];
  }
}
export default locales;

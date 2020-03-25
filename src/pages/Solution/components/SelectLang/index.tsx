import React from 'react';
import { Select, Card } from '@alifd/next';
import { getLocale, setLocale } from '@/utils/locale';
import styles from './index.module.scss';

const Option = Select.Option;
const LANG_CONFIG = {
  'zh-CN': {
    text: '简体中文',
    icon: '🇨🇳',
  },
  'en-US': {
    text: 'English',
    icon: '🇬🇧',
  },
};

function changeLang(key) {
  setLocale(key);
}

export default function SelectLang() {
  const selectedLang = getLocale();
  return (
    <Card free className={styles.card}>
      <Card.Header
        title="app.i18n.demo"
        extra={(
          <Select
            onChange={changeLang}
            value={selectedLang}
            size="small"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {Object.keys(LANG_CONFIG).map((lang) => {
              return (
                <Option value={lang} key={lang}>
                  {LANG_CONFIG[lang].text}
                </Option>
              );
            })}
          </Select>)}
      />
      <Card.Divider />
      <Card.Content>
        app.i18n.content
      </Card.Content>
    </Card>
  );
}

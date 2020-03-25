import React from 'react';
import { Loading } from '@alifd/next';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

export default function PageLoading(props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Loading {...props}>
        {props.children || <div className={styles.center}> </div>}
      </Loading>
    </div>
  );
}
PageLoading.propTypes = {
  tip: PropTypes.string,
};
PageLoading.defaultProps = {
  tip: '加载中...'
};

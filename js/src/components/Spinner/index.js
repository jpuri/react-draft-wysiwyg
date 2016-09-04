/* @flow */

import React from 'react';
import styles from './styles.css';

// This is stateless component
export default () =>
  <div className={styles.spinner}>
    <div className={styles.bounce1} />
    <div className={styles.bounce2} />
    <div className={styles.bounce3} />
  </div>;

/* @flow */

import React from 'react';
import classNames from 'classnames';

import Option from '../../../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

const RemoveComponent = ({ config, onChange }) => {
  const { icon, className, title } = config;
  return (
    <div className="rdw-remove-wrapper" aria-label="rdw-remove-control">
      <Option
        className={classNames(className)}
        onClick={onChange}
        title={title}
      >
        <img
          src={icon}
          alt=""
        />
      </Option>
    </div>
  );
};

export default RemoveComponent;

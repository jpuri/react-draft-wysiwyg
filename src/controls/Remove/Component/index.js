/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Option from '../../../components/Option';
import './styles.css';

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

RemoveComponent.propTypes = {
  onChange: PropTypes.func,
  config: PropTypes.object,
};

export default RemoveComponent;

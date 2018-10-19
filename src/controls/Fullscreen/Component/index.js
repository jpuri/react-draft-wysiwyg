/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Option from '../../../components/Option';
import './styles.css';

const FullscreenComponent = ({ config, onChange, translations }) => {
  const { icon, className, title } = config;
  return (
    <div className="rdw-fullscreen-wrapper" aria-label="rdw-fullscreen-control">
      <Option
        className={classNames(className)}
        onClick={onChange}
        title={title || translations['components.controls.fullscreen.fullscreen']}
      >
        <img
          src={icon}
          alt=""
        />
      </Option>
    </div>
  );
};

FullscreenComponent.propTypes = {
  onChange: PropTypes.func,
  config: PropTypes.object,
  translations: PropTypes.object,
};

export default FullscreenComponent;

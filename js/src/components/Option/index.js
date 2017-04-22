/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Option extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any,
    value: PropTypes.string,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  onClick: Function = () => {
    const { disabled, onClick, value } = this.props;
    if (!disabled) {
      onClick(value);
    }
  };

  render() {
    const { children, className, activeClassName, active, disabled } = this.props;
    return (
      <div
        className={classNames('rdw-option-wrapper', className, {
          [`rdw-option-active ${activeClassName}`]: active,
          'rdw-option-disabled': disabled,
        })}
        onClick={this.onClick}
        aria-selected={active}
      >
        {children}
      </div>
    );
  }
}

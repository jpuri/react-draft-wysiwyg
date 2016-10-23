/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Option extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.instanceOf(Component),
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
        className={classNames(
          'option-wrapper',
          className,
          {
            [`option-active ${activeClassName}`]: active,
            'option-disabled': disabled,
          }
        )}
        onClick={this.onClick}
      >
        {children}
      </div>
    );
  }
}

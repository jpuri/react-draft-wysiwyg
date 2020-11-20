/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Option extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any,
    value: PropTypes.string,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    activeClassName: '',
  }

  onClick: Function = () => {
    const { disabled, onClick, value } = this.props;
    if (!disabled) {
      onClick(value);
    }
  };

  render() {
    const { children, className, activeClassName, active, disabled } = this.props;

    const OptionClass = classNames({
      ['Editor-option']: true,
      [`Editor-option--active`]: active && !activeClassName,
      [`${activeClassName}`]: active && activeClassName,
      ['Editor-option--disabled']: disabled,
    }, className);

    return (
      <div
        className={OptionClass}
        onClick={this.onClick}
        aria-selected={active}
      >
        {children}
      </div>
    );
  }
}

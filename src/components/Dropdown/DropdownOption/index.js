/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';

export default class DropDownOption extends Component {
  static propTypes = {
    children: PropTypes.any,
    value: PropTypes.any,
    onClick: PropTypes.func,
    onSelect: PropTypes.func,
    setHighlighted: PropTypes.func,
    index: PropTypes.number,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    highlighted: PropTypes.bool,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
    highlightedClassName: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    activeClassName: '',
    disabledClassName: '',
    highlightedClassName: ''
  }

  onClick: Function = (event): void => {
    const { onSelect, onClick, value, disabled } = this.props;
    if (!disabled) {
      if (onSelect) {
        onSelect(value);
      }
      if (onClick) {
        event.stopPropagation();
        onClick(value);
      }
    }
  };

  setHighlighted: Function = (): void => {
    const { setHighlighted, index } = this.props;
    setHighlighted(index);
  };

  resetHighlighted: Function = (): void => {
    const { setHighlighted } = this.props;
    setHighlighted(-1);
  };

  render(): Object {
    const {
      children,
      active,
      disabled,
      highlighted,
      className,
      activeClassName,
      disabledClassName,
      highlightedClassName,
      title,
    } = this.props;
    return (
      <li
        className={classNames(
          'rdw-dropdownoption-default',
          className,
          { [`rdw-dropdownoption-active ${activeClassName}`]: active,
            [`rdw-dropdownoption-highlighted ${highlightedClassName}`]: highlighted,
            [`rdw-dropdownoption-disabled ${disabledClassName}`]: disabled,
          })
        }
        onMouseEnter={this.setHighlighted}
        onMouseLeave={this.resetHighlighted}
        onClick={this.onClick}
        title={title}
      >
        {children}
      </li>
    );
  }
}
// todo: review classname use above.

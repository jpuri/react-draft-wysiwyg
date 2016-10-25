/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class DropDownOption extends Component {

  static propTypes = {
    children: PropTypes.any,
    value: PropTypes.any,
    onSelect: PropTypes.func,
    setHighlighted: PropTypes.func,
    index: PropTypes.number,
    active: PropTypes.bool,
    highlighted: PropTypes.bool,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    highlightedClassName: PropTypes.string,
  };

  onClick: Function = (): void => {
    const { onSelect, value } = this.props;
    if (onSelect) {
      onSelect(value);
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
      highlighted,
      className,
      activeClassName,
      highlightedClassName,
     } = this.props;
    return (
      <li
        className={classNames(
            'dropdownoption-default',
            className,
            { [`dropdownoption-active ${activeClassName}`]: active,
              [`dropdownoption-highlighted ${highlightedClassName}`]: highlighted,
            })
        }
        onMouseEnter={this.setHighlighted}
        onMouseLeave={this.resetHighlighted}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }
}

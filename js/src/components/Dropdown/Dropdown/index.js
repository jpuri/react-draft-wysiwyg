/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Dropdown extends Component {

  static propTypes = {
    children: PropTypes.instanceOf(Component),
    onChange: PropTypes.func,
    className: PropTypes.string,
    optionWrapperClassName: PropTypes.string,
  };

  state: Object = {
    expanded: false,
    highlighted: -1,
  };

  onChange: Function = (value: any): void => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.toggleExpansion();
  };

  onKeyDown: Function = (event: Object): void => {
    event.preventDefault();
    const { children } = this.props;
    const { expanded, highlighted } = this.state;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      if (!expanded) {
        this.toggleExpansion();
      } else {
        this.setHighlighted((highlighted === children[1].length - 1) ? 0 : highlighted + 1);
      }
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      this.setHighlighted(highlighted <= 0 ? children[1].length - 1 : highlighted - 1);
    } else if (event.key === 'Enter') {
      if (highlighted > -1) {
        this.onChange(this.props.children[1][highlighted].props.value);
      } else {
        this.toggleExpansion();
      }
    } else if (event.key === 'Escape') {
      this.collapse();
    }
  };

  setHighlighted: Function = (highlighted: number): void => {
    this.setState({
      highlighted,
    });
  };

  collapse: Function = (): void => {
    this.setState({
      highlighted: -1,
      expanded: false,
    });
  };

  toggleExpansion: Function = (): void => {
    const expanded = !this.state.expanded;
    this.setState({
      highlighted: -1,
      expanded,
    });
  };

  render() {
    const { children, className, optionWrapperClassName } = this.props;
    const { expanded, highlighted } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        tabIndex="0"
        onKeyDown={this.onKeyDown}
        className={`dropdown-wrapper ${className}`}
        onMouseLeave={this.collapse}
      >
        <a
          className="dropdown-selectedtext"
          onClick={this.toggleExpansion}
        >
          {children[0]}
          <div
            className={classNames({
              'dropdown-carettoclose': expanded,
              'dropdown-carettoopen': !expanded,
            })}
          />
        </a>
        {expanded ?
          <ul
            className={`dropdown-optionwrapper ${optionWrapperClassName}`}
          >
            {
              React.Children.map(options, (option, index) => {
                const temp = React.cloneElement(
                  option, {
                    onSelect: this.onChange,
                    highlighted: highlighted === index,
                    setHighlighted: this.setHighlighted,
                    index,
                  });
                return temp;
              })
            }
          </ul> : undefined}
      </div>
    );
  }
}

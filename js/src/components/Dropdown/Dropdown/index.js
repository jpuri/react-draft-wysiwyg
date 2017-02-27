/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Dropdown extends Component {

  static propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    modalHandler: PropTypes.object,
    optionWrapperClassName: PropTypes.string,
    ariaLabel: PropTypes.string,
  };

  state: Object = {
    expanded: false,
    highlighted: -1,
  };

  componentWillMount(): void {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.expandCollapseDropdown);
  }

  componentWillUnmount(): void {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapseDropdown);
  }

  onChange: Function = (value: any): void => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.toggleExpansion();
  };

  onKeyDown: Function = (event: Object): void => {
    const { children } = this.props;
    const { expanded, highlighted } = this.state;
    let actioned = false;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      if (!expanded) {
        this.toggleExpansion();
        actioned = true;
      } else {
        this.setHighlighted((highlighted === children[1].length - 1) ? 0 : highlighted + 1);
        actioned = true;
      }
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      this.setHighlighted(highlighted <= 0 ? children[1].length - 1 : highlighted - 1);
      actioned = true;
    } else if (event.key === 'Enter') {
      if (highlighted > -1) {
        this.onChange(this.props.children[1][highlighted].props.value);
        actioned = true;
      } else {
        this.toggleExpansion();
        actioned = true;
      }
    } else if (event.key === 'Escape') {
      this.collapse();
      actioned = true;
    }
    if (actioned) {
      event.preventDefault();
    }
  };

  onDropdownClick: Function = (): void => {
    this.signalExpanded = !this.state.expanded;
  };

  setHighlighted: Function = (highlighted: number): void => {
    this.setState({
      highlighted,
    });
  };

  expandCollapseDropdown = () => {
    this.setState({
      highlighted: -1,
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

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

  stopPropagation: Function = (event: Object): void => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { children, className, optionWrapperClassName, ariaLabel } = this.props;
    const { expanded, highlighted } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        onKeyDown={this.onKeyDown}
        className={classNames('rdw-dropdown-wrapper', className)}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'rdw-dropdown'}
      >
        <a
          className="rdw-dropdown-selectedtext"
          onClick={this.onDropdownClick}
        >
          {children[0]}
          <div
            className={classNames({
              'rdw-dropdown-carettoclose': expanded,
              'rdw-dropdown-carettoopen': !expanded,
            })}
          />
        </a>
        {expanded ?
          <ul className={classNames('rdw-dropdown-optionwrapper', optionWrapperClassName)} onClick={this.stopPropagation}>
            {
              React.Children.map(options, (option, index) => {
                const temp = option && React.cloneElement(
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

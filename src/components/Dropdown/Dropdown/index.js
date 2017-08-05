/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.css';

import { stopPropagation } from '../../../utils/common';

export default class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    optionWrapperClassName: PropTypes.string,
    ariaLabel: PropTypes.string,
    title: PropTypes.string,
  };

  state: Object = {
    highlighted: -1,
  };

  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        highlighted: -1,
      });
    }
  }

  onChange: Function = (value: any): void => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.toggleExpansion();
  };

  setHighlighted: Function = (highlighted: number): void => {
    this.setState({
      highlighted,
    });
  };

  toggleExpansion: Function = (): void => {
    const { doExpand, doCollapse, expanded } = this.props;
    if (expanded) {
      doCollapse();
    } else {
      doExpand();
    }
  };

  render() {
    const {
      expanded,
      children,
      className,
      optionWrapperClassName,
      ariaLabel,
      onExpandEvent,
      title,
    } = this.props;
    const { highlighted } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        className={classNames('rdw-dropdown-wrapper', className)}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'rdw-dropdown'}
      >
        <a
          className="rdw-dropdown-selectedtext"
          onClick={onExpandEvent}
          title={title}
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
          <ul
            className={classNames('rdw-dropdown-optionwrapper', optionWrapperClassName)}
            onClick={stopPropagation}
          >
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

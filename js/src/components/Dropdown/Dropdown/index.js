/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

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
    } = this.props;
    const { highlighted } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div
        className={classNames('rdw-dropdown-wrapper', className)}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'rdw-dropdown'}
      >
        <a className="rdw-dropdown-selectedtext" onClick={onExpandEvent}>
          {children[0]}
          <div
            className={classNames({
              'rdw-dropdown-carettoclose': expanded,
              'rdw-dropdown-carettoopen': !expanded,
            })}
          />
        </a>
        {expanded
          ? <ul
            className={classNames('rdw-dropdown-optionwrapper', optionWrapperClassName)}
            onClick={stopPropagation}
          >
            {React.Children.map(options, (option, index) => {
              const temp =
                  option &&
                  React.cloneElement(option, {
                    onSelect: this.onChange,
                    highlighted: highlighted === index,
                    setHighlighted: this.setHighlighted,
                    index,
                  });
              return temp;
            })}
          </ul>
          : undefined}
      </div>
    );
  }
}

// onKeyDown: Function = (event: Object): void => {
//   const { expanded, children, doCollapse } = this.props;
//   const { highlighted } = this.state;
//   let actioned = false;
//   if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
//     if (!expanded) {
//       this.toggleExpansion();
//       actioned = true;
//     } else {
//       this.setHighlighted((highlighted === children[1].length - 1) ? 0 : highlighted + 1);
//       actioned = true;
//     }
//   } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
//     this.setHighlighted(highlighted <= 0 ? children[1].length - 1 : highlighted - 1);
//     actioned = true;
//   } else if (event.key === 'Enter') {
//     if (highlighted > -1) {
//       this.onChange(this.props.children[1][highlighted].props.value);
//       actioned = true;
//     } else {
//       this.toggleExpansion();
//       actioned = true;
//     }
//   } else if (event.key === 'Escape') {
//     doCollapse();
//     actioned = true;
//   }
//   if (actioned) {
//     event.preventDefault();
//   }
// };

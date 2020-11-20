import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@innovaccer/design-system';

import { stopPropagation } from '../../../utils/common';

export default class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.any,
    onChange: PropTypes.func,
    className: PropTypes.string,
    expanded: PropTypes.bool,
    menu: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    optionWrapperClassName: PropTypes.string,
    triggerClassName: PropTypes.string,
    ariaLabel: PropTypes.string,
    title: PropTypes.string,
  };

  state = {
    highlighted: -1,
  };

  componentDidUpdate(prevProps) {
    const { expanded } = this.props;
    if (prevProps.expanded && !expanded) {
      this.setState({
        highlighted: -1,
      });
    }
  }

  onChange = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.toggleExpansion();
  };

  setHighlighted = highlighted => {
    this.setState({
      highlighted,
    });
  };

  toggleExpansion = () => {
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
      triggerClassName,
      ariaLabel,
      onExpandEvent,
      menu,
    } = this.props;

    const { highlighted } = this.state;
    const options = children.slice(1, children.length);

    const DropdownWrapperClass = classNames({
      ['Editor-dropdown']: true,
      ['Editor-dropdown--expanded']: expanded,
    }, className);

    return (
      <div
        className={DropdownWrapperClass}
        aria-expanded={expanded}
        aria-label={ariaLabel || 'Editor-dropdown'}
      >
        <a
          className={triggerClassName}
          onClick={onExpandEvent}
        >
          {children[0]}
          {!menu && (
            <Icon name="keyboard_arrow_down" />
          )}
        </a>
        {expanded && (
          <ul
            className={classNames(
              'Editor-dropdown-optionWrapper',
              optionWrapperClassName
            )}
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
        )}
      </div>
    );
  }
}

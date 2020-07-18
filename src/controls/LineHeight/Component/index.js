/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';

export default class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  state = {
    defaultLineHeight: undefined,
  };

  render() {
    const {
      config: { icon, className, dropdownClassName, options, title },
      onChange,
      expanded,
      doCollapse,
      onExpandEvent,
      doExpand,
      translations,
    } = this.props;
    let { currentState: { lineHeight: currentLineHeight } } = this.props;
    let defaultLineHeight = 1.2;
    defaultLineHeight = Number(defaultLineHeight);
    currentLineHeight = currentLineHeight ||
      (options && options.indexOf(defaultLineHeight) >= 0 && defaultLineHeight);
    return (
      <div className="rdw-lineheight-wrapper" aria-label="rdw-line-height-control">
        <Dropdown
          className={classNames('rdw-lineheight-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title || translations['components.controls.lineHeight.lineHeight']}
        >
          {currentLineHeight ?
            <span>{currentLineHeight}</span> :
            <img src={icon} alt="" />
          }
          {
            options.map((size, index) =>
              (<DropdownOption
                className="rdw-lineheight-option"
                active={currentLineHeight === size}
                value={size}
                key={index}
              >
                {size}
              </DropdownOption>),
            )
          }
        </Dropdown>
      </div>
    );
  }
}

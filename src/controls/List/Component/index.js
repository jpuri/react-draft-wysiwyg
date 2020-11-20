/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Option from '../../../components/Option';
import { Icon, Tooltip } from '@innovaccer/design-system';

export default class LayoutComponent extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
    // indentDisabled: PropTypes.bool,
    // outdentDisabled: PropTypes.bool,
    className: PropTypes.string,
  };

  options: Array = ['unordered', 'ordered'];

  toggleBlockType: Function = (blockType: String): void => {
    const { onChange } = this.props;
    onChange(blockType);
  };

  render(): Object {
    const {
      config,
      currentState: { listType },
      className
    } = this.props;

    const { options, unordered, ordered } = config;

    const ListClass = classNames({
      ['d-flex']: true,
    }, className);

    return (
      <div className={ListClass}>
        <Tooltip tooltip={unordered.title}>
          <Option
            value="unordered"
            onClick={this.toggleBlockType}
            active={listType === 'unordered'}
            className="mr-2"
          >
            <Icon
              appearance={listType === 'unordered' ? 'info' : 'default'}
              name={unordered.icon}
              size={20}
            />
          </Option>
        </Tooltip>
        <Tooltip tooltip={ordered.title}>
          <Option
            value="ordered"
            onClick={this.toggleBlockType}
            active={listType === 'ordered'}
          >
            <Icon
              appearance={listType === 'ordered' ? 'info' : 'default'}
              name={ordered.icon}
              size={20}
            />
          </Option>
        </Tooltip>
      </div>
    );
  }
}

/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { getFirstIcon } from '../../../../utils/toolbar';
import { Dropdown, DropdownOption } from '../../../Dropdown';
import Option from '../../../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class LayoutComponent extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  options: Array = ['unordered', 'ordered', 'indent', 'outdent'];

  toggleBlockType: Function = (blockType: String): void => {
    const { onChange } = this.props;
    onChange(blockType);
  };

  indent: Function = (): void => {
    const { onChange } = this.props;
    onChange('indent');
  };

  outdent: Function = (): void => {
    const { onChange } = this.props;
    onChange('outdent');
  };

  // todo: evaluate refactoring this code to put a loop there and in other places also in code
  // hint: it will require moving click handlers
  renderInFlatList(): Object {
    const { config, currentState: { listType } } = this.props;
    const { options, unordered, ordered, indent, outdent, className } = config;
    return (
      <div className={classNames('rdw-list-wrapper', className)} aria-label="rdw-list-control">
        {options.indexOf('unordered') >= 0 && <Option
          value="unordered"
          onClick={this.toggleBlockType}
          className={classNames(unordered.className)}
          active={listType === 'unordered'}
        >
          <img
            src={unordered.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('ordered') >= 0 && <Option
          value="ordered"
          onClick={this.toggleBlockType}
          className={classNames(ordered.className)}
          active={listType === 'ordered'}
        >
          <img
            src={ordered.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('indent') >= 0 && <Option
          onClick={this.indent}
          className={classNames(indent.className)}
        >
          <img
            src={indent.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('outdent') >= 0 && <Option
          onClick={this.outdent}
          className={classNames(outdent.className)}
        >
          <img
            src={outdent.icon}
            alt=""
          />
        </Option>}
      </div>
    );
  }

  renderInDropDown(): Object {
    const { config, expanded, doCollapse, doExpand, onExpandEvent, onChange, currentState: { listType } } = this.props;
    const { options, className, dropdownClassName } = config;
    return (
      <Dropdown
        className={classNames('rdw-list-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-list-control"
      >
        <img
          src={getFirstIcon(config)}
          alt=""
        />
        { this.options
          .filter(option => options.indexOf(option) >= 0)
          .map((option, index) => (<DropdownOption
            key={index}
            value={option}
            className={classNames('rdw-list-dropdownOption', config[option].className)}
            active={listType === option}
          >
            <img
              src={config[option].icon}
              alt=""
            />
          </DropdownOption>))
        }
      </Dropdown>
    );
  }

  render(): Object {
    const { config: { inDropdown } } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

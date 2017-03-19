/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { getFirstIcon } from '../../../../utils/toolbar';
import Option from '../../../Option';
import { Dropdown, DropdownOption } from '../../../Dropdown';

import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Inline extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentValue: PropTypes.object,
  };

  renderInFlatList(): Object {
    const { config, currentValue, onChange } = this.props;
    return (
      <div className={classNames('rdw-inline-wrapper', config.className)} aria-label="rdw-inline-control">
        {
          config.options
          .map((style, index) =>
            <Option
              key={index}
              value={style.toUpperCase()}
              onClick={onChange}
              className={classNames(config[style].className)}
              active={
                currentValue[style.toUpperCase()] === true ||
                (style.toUpperCase() === 'MONOSPACE' && currentValue['CODE'])
              }
            >
              <img
                alt=""
                src={config[style].icon}
              />
            </Option>
          )
        }
      </div>
    );
  }

  renderInDropDown(): Object {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      currentValue,
      onChange,
    } = this.props;
    return (
      <Dropdown
        className={classNames('rdw-inline-dropdown', config.className)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-inline-control"
      >
        <img
          src={getFirstIcon(config)}
          alt=""
        />
        {
          config.options
          .map((style, index) =>
            <DropdownOption
              key={index}
              value={style.toUpperCase()}
              className={classNames('rdw-inline-dropdownoption', config[style].className)}
              active={
                currentValue[style.toUpperCase()] === true ||
                (style.toUpperCase() === 'MONOSPACE' && currentValue['CODE'])
              }
            >
              <img
                src={config[style].icon}
                alt=""
              />
            </DropdownOption>)
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

// todo: make subscript less low

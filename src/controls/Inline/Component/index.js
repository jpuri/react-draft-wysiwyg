/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';

import './styles.css';

export default class Inline extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
    translations: PropTypes.object,
  };

  renderInFlatList(): Object {
    const { config, currentState, onChange, translations } = this.props;
    return (
      <div className={classNames('rdw-inline-wrapper', config.className)} aria-label="rdw-inline-control">
        {
          config.options
            .map((style, index) =>
              (<Option
                key={index}
                value={style}
                onClick={onChange}
                className={classNames(config[style].className)}
                active={
                  currentState[style] === true ||
                  (style === 'MONOSPACE' && currentState.CODE)
                }
                title={config[style].title || translations[`components.controls.inline.${style}`]}
              >
                <img
                  alt=""
                  src={config[style].icon}
                />
              </Option>),
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
      currentState,
      onChange,
      translations,
    } = this.props;
    const { className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('rdw-inline-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-inline-control"
        title={title}
      >
        <img
          src={getFirstIcon(config)}
          alt=""
        />
        {
          config.options
            .map((style, index) =>
              (<DropdownOption
                key={index}
                value={style}
                className={classNames('rdw-inline-dropdownoption', config[style].className)}
                active={
                  currentState[style] === true ||
                  (style === 'MONOSPACE' && currentState.CODE)
                }
                title={config[style].title || translations[`components.controls.inline.${style}`]}
              >
                <img
                  src={config[style].icon}
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

// todo: make subscript less low

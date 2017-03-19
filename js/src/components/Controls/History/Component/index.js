/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { getFirstIcon } from '../../../../utils/toolbar';
import Option from '../../../Option';
import { Dropdown, DropdownOption } from '../../../Dropdown';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class History extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onUndo: PropTypes.func,
    onRedo: PropTypes.func,
    undoDisabled: PropTypes.bool,
    redoDisabled: PropTypes.bool,
  };

  renderInDropDown(): Object {
    const {
      config,
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      undoDisabled,
      redoDisabled,
      onUndo,
      onRedo,
    } = this.props;
    const {options, undo, redo, className} = config;
    return (
      <Dropdown
        className={classNames('rdw-history-dropdown', className)}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-history-control"
      >
        <img
          src={getFirstIcon(config)}
          alt=""
        />
        {options.indexOf('undo') >= 0 && <DropdownOption
          onClick={onUndo}
          disabled={undoDisabled}
          className={classNames('rdw-history-dropdownoption', undo.className)}
        >
          <img
            src={undo.icon}
            alt=""
          />
        </DropdownOption>}
        {options.indexOf('redo') >= 0 && <DropdownOption
          onClick={onRedo}
          disabled={redoDisabled}
          className={classNames('rdw-history-dropdownoption', redo.className)}
        >
          <img
            src={redo.icon}
            alt=""
          />
        </DropdownOption>}
      </Dropdown>
    );
  }

  renderInFlatList(): Object {
    const {
        config: { options, undo, redo, className },
        undoDisabled,
        redoDisabled,
        onUndo,
        onRedo,
    } = this.props;
    return (
      <div className={classNames('rdw-history-wrapper', className)} aria-label="rdw-history-control">
        {options.indexOf('undo') >= 0 && <Option
          value="unordered-list-item"
          onClick={onUndo}
          className={classNames(undo.className)}
          disabled={undoDisabled}
        >
          <img
            src={undo.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('redo') >= 0 && <Option
          value="ordered-list-item"
          onClick={onRedo}
          className={classNames(redo.className)}
          disabled={redoDisabled}
        >
          <img
            src={redo.icon}
            alt=""
          />
        </Option>}
      </div>
    );
  }

  render(): Object {
    const { config } = this.props;
    if (config.inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

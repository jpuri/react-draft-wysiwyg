/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Option from '../../../Option';
import { Dropdown, DropdownOption } from '../../../Dropdown';
import { getFirstIcon } from '../../../../utils/toolbar';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class TextAlign extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  renderInFlatList(): Object {
    const { config: { options, left, center, right, justify, className }, onChange, currentState: { textAlignment }} = this.props;
    return (
      <div className={classNames('rdw-text-align-wrapper', className)} aria-label="rdw-textalign-control">
        {options.indexOf('left') >= 0 && <Option
          value="left"
          className={classNames(left.className)}
          active={textAlignment === 'left'}
          onClick={onChange}
          title={left.title}
        >
          <img
            src={left.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('center') >= 0 && <Option
          value="center"
          className={classNames(center.className)}
          active={textAlignment === 'center'}
          onClick={onChange}
          title={center.title}
        >
          <img
            src={center.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('right') >= 0 && <Option
          value="right"
          className={classNames(right.className)}
          active={textAlignment === 'right'}
          onClick={onChange}
          title={right.title}
        >
          <img
            src={right.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('justify') >= 0 && <Option
          value="justify"
          className={classNames(justify.className)}
          active={textAlignment === 'justify'}
          onClick={onChange}
          title={justify.title}
        >
          <img
            src={justify.icon}
            alt=""
          />
        </Option>}
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
      currentState: { textAlignment },
      onChange,
    } = this.props;
    const { options, left, center, right, justify, className, dropdownClassName, title } = config;
    return (
      <Dropdown
        className={classNames('rdw-text-align-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-textalign-control"
        title={title}
      >
        <img
          src={(textAlignment && config[textAlignment].icon) || getFirstIcon(config)}
          alt=""
        />
        {options.indexOf('left') >= 0 && <DropdownOption
          value="left"
          active={textAlignment === 'left'}
          className={classNames('rdw-text-align-dropdownOption', left.className)}
          title={left.title}
        >
          <img
            src={left.icon}
            alt=""
          />
        </DropdownOption>}
        {options.indexOf('center') >= 0 && <DropdownOption
          value="center"
          active={textAlignment === 'center'}
          className={classNames('rdw-text-align-dropdownOption', center.className)}
          title={center.title}
        >
          <img
            src={center.icon}
            alt=""
          />
        </DropdownOption>}
        {options.indexOf('right') >= 0 && <DropdownOption
          value="right"
          active={textAlignment === 'right'}
          className={classNames('rdw-text-align-dropdownOption', right.className)}
          title={right.title}
        >
          <img
            src={right.icon}
            alt=""
          />
        </DropdownOption>}
        {options.indexOf('justify') >= 0 && <DropdownOption
          value="justify"
          active={textAlignment === 'justify'}
          className={classNames('rdw-text-align-dropdownOption', justify.className)}
          title={justify.title}
        >
          <img
            src={justify.icon}
            alt=""
          />
        </DropdownOption>}
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

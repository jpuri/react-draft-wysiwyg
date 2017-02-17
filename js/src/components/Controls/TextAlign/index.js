/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectedBlocksMetadata, setBlockData } from 'draftjs-utils';
import classNames from 'classnames';
import Option from '../../Option';
import { Dropdown, DropdownOption } from '../../Dropdown';
import { getFirstIcon } from '../../../utils/toolbar';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class TextAlign extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
  };

  state = {
    currentTextAlignment: undefined,
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState !== this.props.editorState) {
      this.setState({
        currentTextAlignment: getSelectedBlocksMetadata(properties.editorState).get('text-align'),
      });
    }
  }

  addBlockAlignmentData:Function = (value: string) => {
    const { editorState, onChange } = this.props;
    const { currentTextAlignment } = this.state;
    if (currentTextAlignment !== value) {
      onChange(setBlockData(editorState, { 'text-align': value }));
    } else {
      onChange(setBlockData(editorState, { 'text-align': undefined }));
    }
  }

  renderInFlatList(config: Object): Object {
    const { currentTextAlignment } = this.state;
    const { options, left, center, right, justify, className } = config;
    return (
      <div className={classNames('rdw-text-align-wrapper', className)} aria-label="rdw-textalign-control">
        {options.indexOf('left') >= 0 && <Option
          value="left"
          className={classNames(left.className)}
          active={currentTextAlignment === 'left'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={left.icon}
            role="presentation"
          />
        </Option>}
        {options.indexOf('center') >= 0 && <Option
          value="center"
          className={classNames(center.className)}
          active={currentTextAlignment === 'center'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={center.icon}
            role="presentation"
          />
        </Option>}
        {options.indexOf('right') >= 0 && <Option
          value="right"
          className={classNames(right.className)}
          active={currentTextAlignment === 'right'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={right.icon}
            role="presentation"
          />
        </Option>}
        {options.indexOf('justify') >= 0 && <Option
          value="justify"
          className={classNames(justify.className)}
          active={currentTextAlignment === 'justify'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={justify.icon}
            role="presentation"
          />
        </Option>}
      </div>
    );
  }

  renderInDropDown(config: Object): Object {
    const { currentTextAlignment } = this.state;
    const { options, left, center, right, justify, className } = config;
    const { modalHandler } = this.props;
    return (
      <Dropdown
        className={classNames('rdw-text-align-dropdown', className)}
        onChange={this.addBlockAlignmentData}
        modalHandler={modalHandler}
        aria-label="rdw-textalign-control"
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
        />
        {options.indexOf('left') >= 0 && <DropdownOption
          value="left"
          active={currentTextAlignment === 'left'}
          className={classNames('rdw-text-align-dropdownOption', left.className)}
        >
          <img
            src={left.icon}
            role="presentation"
          />
        </DropdownOption>}
        {options.indexOf('center') >= 0 && <DropdownOption
          value="center"
          active={currentTextAlignment === 'center'}
          className={classNames('rdw-text-align-dropdownOption', center.className)}
        >
          <img
            src={center.icon}
            role="presentation"
          />
        </DropdownOption>}
        {options.indexOf('right') >= 0 && <DropdownOption
          value="right"
          active={currentTextAlignment === 'right'}
          className={classNames('rdw-text-align-dropdownOption', right.className)}
        >
          <img
            src={right.icon}
            role="presentation"
          />
        </DropdownOption>}
        {options.indexOf('justify') >= 0 && <DropdownOption
          value="justify"
          active={currentTextAlignment === 'justify'}
          className={classNames('rdw-text-align-dropdownOption', justify.className)}
        >
          <img
            src={justify.icon}
            role="presentation"
          />
        </DropdownOption>}
      </Dropdown>
    );
  }

  render(): Object {
    const { config } = this.props;
    if (config.inDropdown) {
      return this.renderInDropDown(config);
    }
    return this.renderInFlatList(config);
  }
}

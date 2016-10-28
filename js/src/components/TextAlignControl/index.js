/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectedBlocksMetadata, setBlockData } from 'draftjs-utils';
import Option from '../Option';
import { Dropdown, DropdownOption } from '../Dropdown';
import { getFirstIcon } from '../../utils/toolbar';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class TextAlignControl extends Component {

  static propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
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
    const { options, left, center, right, justify } = config;
    return (
      <div className="text-align-wrapper">
        {options.indexOf('left') >= 0 && <Option
          value="left"
          active={currentTextAlignment === 'left'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={left.icon}
            role="presentation"
            className="text-align-icon"
          />
        </Option>}
        {options.indexOf('center') >= 0 && <Option
          value="center"
          active={currentTextAlignment === 'center'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={center.icon}
            role="presentation"
            className="text-align-icon"
          />
        </Option>}
        {options.indexOf('right') >= 0 && <Option
          value="right"
          active={currentTextAlignment === 'right'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={right.icon}
            role="presentation"
            className="text-align-icon"
          />
        </Option>}
        {options.indexOf('justify') >= 0 && <Option
          value="justify"
          active={currentTextAlignment === 'justify'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={justify.icon}
            role="presentation"
            className="text-align-icon"
          />
        </Option>}
      </div>
    );
  }

  renderInDropDown(config: Object): Object {
    const { currentTextAlignment } = this.state;
    const { options, left, center, right, justify } = config;
    return (
      <Dropdown
        className="text-align-dropdown"
        onChange={this.addBlockAlignmentData}
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
          className="text-align-icon"
        />
        {options.indexOf('left') >= 0 && <DropdownOption
          value="left"
          active={currentTextAlignment === 'left'}
          className="text-align-dropdownOption"
        >
          <img
            src={left.icon}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>}
        {options.indexOf('center') >= 0 && <DropdownOption
          value="center"
          active={currentTextAlignment === 'center'}
          className="text-align-dropdownOption"
        >
          <img
            src={center.icon}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>}
        {options.indexOf('right') >= 0 && <DropdownOption
          value="right"
          active={currentTextAlignment === 'right'}
          className="text-align-dropdownOption"
        >
          <img
            src={right.icon}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>}
        {options.indexOf('justify') >= 0 && <DropdownOption
          value="justify"
          active={currentTextAlignment === 'justify'}
          className="text-align-dropdownOption"
        >
          <img
            src={justify.icon}
            role="presentation"
            className="text-align-icon"
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

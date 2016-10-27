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
    return (
      <div className="text-align-wrapper">
        {config.get('options').first('left') && <Option
          value="left"
          active={currentTextAlignment === 'left'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={config.get('left').get('icon')}
            role="presentation"
            className="text-align-icon"
          />
        </Option>}
        {config.get('options').first('center') && <Option
          value="center"
          active={currentTextAlignment === 'center'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={config.get('center').get('icon')}
            role="presentation"
            className="text-align-icon"
          />
        </Option>}
        {config.get('options').first('right') && <Option
          value="right"
          active={currentTextAlignment === 'right'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={config.get('right').get('icon')}
            role="presentation"
            className="text-align-icon"
          />
        </Option>}
        {config.get('options').first('justify') && <Option
          value="justify"
          active={currentTextAlignment === 'justify'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={config.get('justify').get('icon')}
            role="presentation"
            className="text-align-icon"
          />
        </Option>}
      </div>
    );
  }

  renderInDropDown(config: Object): Object {
    const { currentTextAlignment } = this.state;
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
        {config.get('options').first('left') && <DropdownOption
          value="left"
          active={currentTextAlignment === 'left'}
          className="text-align-dropdownOption"
        >
          <img
            src={config.get('left').get('icon')}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>}
        {config.get('options').first('center') && <DropdownOption
          value="center"
          active={currentTextAlignment === 'center'}
          className="text-align-dropdownOption"
        >
          <img
            src={config.get('center').get('icon')}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>}
        {config.get('options').first('right') && <DropdownOption
          value="right"
          active={currentTextAlignment === 'right'}
          className="text-align-dropdownOption"
        >
          <img
            src={config.get('right').get('icon')}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>}
        {config.get('options').first('justify') && <DropdownOption
          value="justify"
          active={currentTextAlignment === 'justify'}
          className="text-align-dropdownOption"
        >
          <img
            src={config.get('justify').get('icon')}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>}
      </Dropdown>
    );
  }

  render(): Object {
    const { config } = this.props;
    if (config && config.get('inDropdown')) {
      return this.renderInDropDown(config);
    }
    return this.renderInFlatList(config);
  }
}

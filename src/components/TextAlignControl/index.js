/* @flow */

import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import { getSelectedBlocksMetadata, setBlockData } from 'draftjs-utils';
import Option from '../Option';
import {
  Dropdown,
  DropdownOption,
} from '../Dropdown';
import left from '../../../images/align-left.svg';
import center from '../../../images/align-center.svg';
import right from '../../../images/align-right.svg';
import justify from '../../../images/align-justify.svg';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class TextAlignControl extends Component {

  static propTypes = {
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    onChange: PropTypes.func.isRequired,
    inDropdown: PropTypes.bool,
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
    onChange(setBlockData(editorState, { 'text-align': value }));
  }

  renderInFlatList(): Object {
    const { currentTextAlignment } = this.state;
    return (
      <div className="text-align-wrapper">
        <Option
          value="left"
          active={currentTextAlignment === 'left'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={left}
            role="presentation"
            className="text-align-icon"
          />
        </Option>
        <Option
          value="center"
          active={currentTextAlignment === 'center'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={center}
            role="presentation"
            className="text-align-icon"
          />
        </Option>
        <Option
          value="right"
          active={currentTextAlignment === 'right'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={right}
            role="presentation"
            className="text-align-icon"
          />
        </Option>
        <Option
          value="justify"
          active={currentTextAlignment === 'justify'}
          onClick={this.addBlockAlignmentData}
        >
          <img
            src={justify}
            role="presentation"
            className="text-align-icon"
          />
        </Option>
      </div>
    );
  }

  renderInDropDown(): Object {
    const { currentTextAlignment } = this.state;
    return (
      <Dropdown
        className="text-align-dropdown"
        onChange={this.addBlockAlignmentData}
      >
        <img
          src={left}
          role="presentation"
          className="text-align-icon"
        />
        <DropdownOption
          value="left"
          active={currentTextAlignment === 'left'}
          className="text-align-dropdownOption"
        >
          <img
            src={left}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>
        <DropdownOption
          value="center"
          active={currentTextAlignment === 'center'}
          className="text-align-dropdownOption"
        >
          <img
            src={center}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>
        <DropdownOption
          value="right"
          active={currentTextAlignment === 'right'}
          className="text-align-dropdownOption"
        >
          <img
            src={right}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>
        <DropdownOption
          value="justify"
          active={currentTextAlignment === 'justify'}
          className="text-align-dropdownOption"
        >
          <img
            src={justify}
            role="presentation"
            className="text-align-icon"
          />
        </DropdownOption>
      </Dropdown>
    );
  }

  render(): Object {
    const { inDropdown } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}

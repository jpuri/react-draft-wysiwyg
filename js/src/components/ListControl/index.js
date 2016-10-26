/* @flow */

import React, { Component, PropTypes } from 'react';
import { RichUtils } from 'draft-js';
import { changeDepth, getSelectedBlocksType } from 'draftjs-utils';
import { Dropdown, DropdownOption } from '../Dropdown';
import Option from '../Option';
import indent from '../../../../images/indent.svg';
import outdent from '../../../../images/outdent.svg';
import ordered from '../../../../images/list-ordered.svg';
import unordered from '../../../../images/list-unordered.svg';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class ListControl extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };

  state: Object = {
    currentBlockType: 'unstyled',
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(editorState),
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentBlockType: getSelectedBlocksType(properties.editorState),
      });
    }
  }

  onDropdownChange: Function = (value: string): void => {
    if (value === 'unordered-list-item' || value === 'ordered-list-item') {
      this.toggleBlockType(value);
    } else if (value === 'indent') {
      this.indent();
    } else {
      this.outdent();
    }
  };

  toggleBlockType: Function = (blockType): void => {
    const { onChange, editorState } = this.props;
    const newState = RichUtils.toggleBlockType(
      editorState,
      blockType
    );
    if (newState) {
      onChange(newState, true);
    }
  };

  adjustDepth: Function = (adjustment): void => {
    const { onChange, editorState } = this.props;
    const newState = changeDepth(
      editorState,
      adjustment,
      4,
    );
    if (newState) {
      onChange(newState, true);
    }
  };

  indent: Function = (): void => {
    this.adjustDepth(1);
  };

  outdent: Function = (): void => {
    this.adjustDepth(-1);
  };

  renderInFlatList(currentBlockType: string): Object {
    return (
      <div className="list-wrapper">
        <Option
          value="unordered-list-item"
          onClick={this.toggleBlockType}
          active={currentBlockType === 'unordered-list-item'}
        >
          <img
            src={unordered}
            className="list-icon"
            role="presentation"
          />
        </Option>
        <Option
          value="ordered-list-item"
          onClick={this.toggleBlockType}
          active={currentBlockType === 'ordered-list-item'}
        >
          <img
            src={ordered}
            role="presentation"
            className="list-icon"
          />
        </Option>
        <Option
          onClick={this.indent}
        >
          <img
            src={indent}
            role="presentation"
            className="list-icon"
          />
        </Option>
        <Option
          onClick={this.outdent}
        >
          <img
            src={outdent}
            role="presentation"
            className="list-icon"
          />
        </Option>
      </div>
    );
  }

  renderInDropDown(currentBlockType: string): Object {
    return (
      <Dropdown
        className="list-dropdown"
        onChange={this.onDropdownChange}
      >
        <img
          src={unordered}
          role="presentation"
          className="list-icon"
        />
        <DropdownOption
          value="unordered-list-item"
          className="list-dropdownOption"
          active={currentBlockType === 'unordered-list-item'}
        >
          <img
            src={unordered}
            role="presentation"
            className="list-icon"
          />
        </DropdownOption>
        <DropdownOption
          value="ordered-list-item"
          className="list-dropdownOption"
          active={currentBlockType === 'ordered-list-item'}
        >
          <img
            src={ordered}
            role="presentation"
            className="list-icon"
          />
        </DropdownOption>
        <DropdownOption
          value="indent"
          className="list-dropdownOption"
        >
          <img
            src={indent}
            role="presentation"
            className="list-icon"
          />
        </DropdownOption>
        <DropdownOption
          value="outdent"
          className="list-dropdownOption"
        >
          <img
            src={outdent}
            role="presentation"
            className="list-icon"
          />
        </DropdownOption>
      </Dropdown>
    );
  }

  render(): Object {
    const { config } = this.props;
    const { currentBlockType } = this.state;
    if (config && config.get('inDropdown')) {
      return this.renderInDropDown(currentBlockType);
    }
    return this.renderInFlatList(currentBlockType);
  }
}

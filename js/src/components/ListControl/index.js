/* @flow */

import React, { Component, PropTypes } from 'react';
import { RichUtils } from 'draft-js';
import { changeDepth, getSelectedBlocksType } from 'draftjs-utils';
import { getFirstIcon } from '../../utils/toolbar';
import { Dropdown, DropdownOption } from '../Dropdown';
import Option from '../Option';
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

  renderInFlatList(currentBlockType: string, config: Object): Object {
    return (
      <div className="list-wrapper">
        {config.get('options').first('unordered') && <Option
          value="unordered-list-item"
          onClick={this.toggleBlockType}
          active={currentBlockType === 'unordered-list-item'}
        >
          <img
            src={config.get('unordered').get('icon')}
            className="list-icon"
            role="presentation"
          />
        </Option>}
        {config.get('options').first('ordered') && <Option
          value="ordered-list-item"
          onClick={this.toggleBlockType}
          active={currentBlockType === 'ordered-list-item'}
        >
          <img
            src={config.get('ordered').get('icon')}
            role="presentation"
            className="list-icon"
          />
        </Option>}
        {config.get('options').first('indent') && <Option
          onClick={this.indent}
        >
          <img
            src={config.get('indent').get('icon')}
            role="presentation"
            className="list-icon"
          />
        </Option>}
        {config.get('options').first('outdent') && <Option
          onClick={this.outdent}
        >
          <img
            src={config.get('outdent').get('icon')}
            role="presentation"
            className="list-icon"
          />
        </Option>}
      </div>
    );
  }

  renderInDropDown(currentBlockType: string, config: Object): Object {
    return (
      <Dropdown
        className="list-dropdown"
        onChange={this.onDropdownChange}
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
          className="list-icon"
        />
        {config.get('options').first('unordered') && <DropdownOption
          value="unordered-list-item"
          className="list-dropdownOption"
          active={currentBlockType === 'unordered-list-item'}
        >
          <img
            src={config.get('unordered').get('icon')}
            role="presentation"
            className="list-icon"
          />
        </DropdownOption>}
        {config.get('options').first('ordered') && <DropdownOption
          value="ordered-list-item"
          className="list-dropdownOption"
          active={currentBlockType === 'ordered-list-item'}
        >
          <img
            src={config.get('ordered').get('icon')}
            role="presentation"
            className="list-icon"
          />
        </DropdownOption>}
        {config.get('options').first('indent') && <DropdownOption
          value="indent"
          className="list-dropdownOption"
        >
          <img
            src={config.get('indent').get('icon')}
            role="presentation"
            className="list-icon"
          />
        </DropdownOption>}
        {config.get('options').first('outdent') && <DropdownOption
          value="outdent"
          className="list-dropdownOption"
        >
          <img
            src={config.get('outdent').get('icon')}
            role="presentation"
            className="list-icon"
          />
        </DropdownOption>}
      </Dropdown>
    );
  }

  render(): Object {
    const { config } = this.props;
    const { currentBlockType } = this.state;
    if (config && config.get('inDropdown')) {
      return this.renderInDropDown(currentBlockType, config);
    }
    return this.renderInFlatList(currentBlockType, config);
  }
}

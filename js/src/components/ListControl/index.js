/* @flow */

import React, { Component, PropTypes } from 'react';
import { RichUtils } from 'draft-js';
import { changeDepth, getSelectedBlocksType } from 'draftjs-utils';
import { getFirstIcon } from '../../Utils/toolbar';
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

  options: Array = [{ type: 'unordered', value: 'unordered-list-item' },
    { type: 'ordered', value: 'ordered-list-item' },
    { type: 'indent', value: 'indent' },
    { type: 'outdent', value: 'outdent' }];

  toggleBlockType: Function = (blockType: String): void => {
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

  // todo: evaluate refactoring this code to put a loop there and in other places also in code
  // hint: it will require moving click handlers
  renderInFlatList(currentBlockType: string, config: Object): Object {
    const { options, unordered, ordered, indent, outdent, className } = config;
    return (
      <div className={`list-wrapper ${className}`}>
        {options.indexOf('unordered') >= 0 && <Option
          value="unordered-list-item"
          onClick={this.toggleBlockType}
          className={unordered.className}
          active={currentBlockType === 'unordered-list-item'}
        >
          <img
            src={unordered.icon}
            role="presentation"
          />
        </Option>}
        {options.indexOf('ordered') >= 0 && <Option
          value="ordered-list-item"
          onClick={this.toggleBlockType}
          className={ordered.className}
          active={currentBlockType === 'ordered-list-item'}
        >
          <img
            src={ordered.icon}
            role="presentation"
          />
        </Option>}
        {options.indexOf('indent') >= 0 && <Option
          onClick={this.indent}
          className={indent.className}
        >
          <img
            src={indent.icon}
            role="presentation"
          />
        </Option>}
        {options.indexOf('outdent') >= 0 && <Option
          onClick={this.outdent}
          className={outdent.className}
        >
          <img
            src={outdent.icon}
            role="presentation"
          />
        </Option>}
      </div>
    );
  }

  renderInDropDown(currentBlockType: string, config: Object): Object {
    const { options, className } = config;
    return (
      <Dropdown
        className={`list-dropdown ${className}`}
        onChange={this.onDropdownChange}
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
        />
        { this.options
          .filter(option => options.indexOf(option.type) >= 0)
          .map((option, index) => (<DropdownOption
            key={index}
            value={option.value}
            className={`list-dropdownOption ${config[option.type].className}`}
            active={currentBlockType === option.value}
          >
            <img
              src={config[option.type].icon}
              role="presentation"
            />
          </DropdownOption>))
        }
      </Dropdown>
    );
  }

  render(): Object {
    const { config } = this.props;
    const { currentBlockType } = this.state;
    if (config.inDropdown) {
      return this.renderInDropDown(currentBlockType, config);
    }
    return this.renderInFlatList(currentBlockType, config);
  }
}

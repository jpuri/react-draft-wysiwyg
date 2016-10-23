/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState } from 'draft-js';
import Option from '../Option';
import { Dropdown, DropdownOption } from '../Dropdown';

import bold from '../../../../images/bold.svg';
import italic from '../../../../images/italic.svg';
import underline from '../../../../images/underline.svg';
import strikethrough from '../../../../images/strikethrough.svg';
import monospace from '../../../../images/monospace.svg';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class InlineControl extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.instanceOf(EditorState).isRequired,
    inDropdown: PropTypes.bool,
  };

  state: Object = {
    currentStyles: {},
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentStyles: getSelectionInlineStyle(editorState),
      });
    }
  }

  componentWillReceiveProps(properties: Object): void {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentStyles: getSelectionInlineStyle(properties.editorState),
      });
    }
  }

  stylesMap: Array<Object> = [{
    value: 'BOLD',
    icon: bold,
  }, {
    value: 'ITALIC',
    icon: italic,
  }, {
    value: 'UNDERLINE',
    icon: underline,
  }, {
    value: 'STRIKETHROUGH',
    icon: strikethrough,
  }, {
    value: 'CODE',
    icon: monospace,
  }];

  toggleInlineStyle: Function = (style: string): void => {
    const { editorState, onChange } = this.props;
    const newState = RichUtils.toggleInlineStyle(
      editorState,
      style
    );
    if (newState) {
      onChange(newState, true);
    }
  };

  renderInFlatList(currentStyles: string): Object {
    return (
      <div className="inline-wrapper">
        {
          this.stylesMap.map((style, index) =>
            <Option
              key={index}
              value={style.value}
              onClick={this.toggleInlineStyle}
              active={currentStyles[style.value] === true}
            >
              <img
                role="presentation"
                src={style.icon}
                className="inline-icon"
              />
            </Option>
          )
        }
      </div>
    );
  }

  renderInDropDown(currentStyles: string): Object {
    return (
      <Dropdown
        className="inline-dropdown"
        onChange={this.toggleInlineStyle}
      >
        <img
          src={bold}
          role="presentation"
          className="inline-icon"
        />
        {
          this.stylesMap.map((style, index) =>
            <DropdownOption
              key={index}
              value={style.value}
              className="inline-dropdownoption"
              active={currentStyles[style.value] === true}
            >
              <img
                src={style.icon}
                role="presentation"
                className="inline-icon"
              />
            </DropdownOption>)
          }
      </Dropdown>
    );
  }

  render(): Object {
    const { inDropdown } = this.props;
    const { currentStyles } = this.state;
    if (inDropdown) {
      return this.renderInDropDown(currentStyles);
    }
    return this.renderInFlatList(currentStyles);
  }
}

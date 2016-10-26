/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils } from 'draft-js';
import Option from '../Option';
import { Dropdown, DropdownOption } from '../Dropdown';

import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class InlineControl extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
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

  styleList: Array<string> = ['bold', 'italic', 'underline', 'strikeThrough', 'code'];

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

  getFirstVisibleStyle = (config:Object): Object => {
    const filteredStyles = this.styleList.filter(style => config.get(style).get('visible'));
    return filteredStyles && config.get(filteredStyles[0]);
  }

  renderInFlatList(currentStyles: string, config: Object): Object {
    return (
      <div className="inline-wrapper">
        {
          this.styleList
          .filter(style => config.get(style).get('visible'))
          .map((style, index) =>
            <Option
              key={index}
              value={style.value}
              onClick={this.toggleInlineStyle}
              active={currentStyles[style.value] === true}
            >
              <img
                role="presentation"
                src={config.get(style).get('icon')}
                className="inline-icon"
              />
            </Option>
          )
        }
      </div>
    );
  }

  renderInDropDown(currentStyles: string, config: Object): Object {
    const firstVisibleStyle = this.getFirstVisibleStyle(config);
    return (
      <Dropdown
        className="inline-dropdown"
        onChange={this.toggleInlineStyle}
      >
        <img
          src={firstVisibleStyle && firstVisibleStyle.get('icon')}
          role="presentation"
          className="inline-icon"
        />
        {
          this.styleList
          .filter(style => config.get(style).get('visible'))
          .map((style, index) =>
            <DropdownOption
              key={index}
              value={style.value}
              className="inline-dropdownoption"
              active={currentStyles[style.value] === true}
            >
              <img
                src={config.get(style).get('icon')}
                role="presentation"
                className="inline-icon"
              />
            </DropdownOption>)
          }
      </Dropdown>
    );
  }

  render(): Object {
    const { config } = this.props;
    const { currentStyles } = this.state;
    if (config && config.get('inDropdown')) {
      return this.renderInDropDown(currentStyles, config);
    }
    return this.renderInFlatList(currentStyles, config);
  }
}

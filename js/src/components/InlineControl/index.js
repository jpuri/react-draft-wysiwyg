/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils } from 'draft-js';
import { getFirstIcon } from '../../utils/toolbar';
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

  renderInFlatList(currentStyles: string, config: Object): Object {
    return (
      <div className="inline-wrapper">
        {
          config.options
          .map((style, index) =>
            <Option
              key={index}
              value={style.value}
              onClick={this.toggleInlineStyle}
              active={currentStyles[style.value] === true}
            >
              <img
                role="presentation"
                src={config[style].icon}
                className="inline-icon"
              />
            </Option>
          )
        }
      </div>
    );
  }

  renderInDropDown(currentStyles: string, config: Object): Object {
    return (
      <Dropdown
        className="inline-dropdown"
        onChange={this.toggleInlineStyle}
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
          className="inline-icon"
        />
        {
          config.options
          .map((style, index) =>
            <DropdownOption
              key={index}
              value={style.value}
              className="inline-dropdownoption"
              active={currentStyles[style.value] === true}
            >
              <img
                src={config[style].icon}
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
    if (config.inDropdown) {
      return this.renderInDropDown(currentStyles, config);
    }
    return this.renderInFlatList(currentStyles, config);
  }
}

// todo: move all controls to separate folder controls

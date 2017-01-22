/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import classNames from 'classnames';
import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../Option';
import { Dropdown, DropdownOption } from '../../Dropdown';

import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class Inline extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
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
    const newStyle = style === 'MONOSPACE' ? 'CODE' : style;
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      newStyle
    );
    if (newStyle === 'SUBSCRIPT' || newStyle === 'SUPERSCRIPT') {
      const removeStyle = newStyle === 'SUBSCRIPT' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
      const contentState = Modifier.removeInlineStyle(
        newState.getCurrentContent(),
        newState.getSelection(),
        removeStyle
      );
      newState = EditorState.push(newState, contentState, 'change-inline-style');
    }
    if (newState) {
      onChange(newState);
    }
  };

  renderInFlatList(currentStyles: string, config: Object): Object {
    return (
      <div className={classNames('rdw-inline-wrapper', config.className)} aria-label="rdw-inline-control">
        {
          config.options
          .map((style, index) =>
            <Option
              key={index}
              value={style.toUpperCase()}
              onClick={this.toggleInlineStyle}
              className={classNames(config[style].className)}
              active={
                currentStyles[style.toUpperCase()] === true ||
                (style.toUpperCase() === 'MONOSPACE' && currentStyles['CODE'])
              }
            >
              <img
                role="presentation"
                src={config[style].icon}
              />
            </Option>
          )
        }
      </div>
    );
  }

  renderInDropDown(currentStyles: string, config: Object): Object {
    const { modalHandler } = this.props;
    return (
      <Dropdown
        className={classNames('rdw-inline-dropdown', config.className)}
        onChange={this.toggleInlineStyle}
        modalHandler={modalHandler}
        aria-label="rdw-inline-control"
      >
        <img
          src={getFirstIcon(config)}
          role="presentation"
        />
        {
          config.options
          .map((style, index) =>
            <DropdownOption
              key={index}
              value={style.toUpperCase()}
              className={classNames('rdw-inline-dropdownoption', config[style].className)}
              active={
                currentStyles[style.toUpperCase()] === true ||
                (style.toUpperCase() === 'MONOSPACE' && currentStyles['CODE'])
              }
            >
              <img
                src={config[style].icon}
                role="presentation"
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
// make subscript less low

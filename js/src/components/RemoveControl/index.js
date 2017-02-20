/* @flow */

import React, { Component, PropTypes } from 'react';
import { EditorState, Modifier } from 'draft-js';
import classNames from 'classnames';
import Option from '../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class RemoveControl extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
    customStyleMap: PropTypes.object
  };

  removeAllInlineStyles: Function = (editorState: EditorState): void => {
    const { customStyleMap } = this.props;
    let contentState = editorState.getCurrentContent();
    const inlineStyles = Object.keys(customStyleMap).concat(['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'MONOSPACE',
      'FONTFAMILY', 'COLOR', 'BGCOLOR', 'FONTSIZE', 'SUPERSCRIPT', 'SUBSCRIPT']);
    inlineStyles.forEach((style) => {
      contentState = Modifier.removeInlineStyle(
        contentState,
        editorState.getSelection(),
        style
      );
    });

    contentState = Modifier.setBlockData(
      contentState,
      editorState.getSelection(),
      { 'text-align': undefined });

    return EditorState.push(editorState, contentState, 'change-inline-style');
  };

  removeInlineStyles: Function = (): void => {
    const { editorState, onChange } = this.props;
    onChange(this.removeAllInlineStyles(editorState));
  };

  render(): Object {
    const { config: { icon, className } } = this.props;
    return (
      <div className="rdw-remove-wrapper" aria-label="rdw-remove-control">
        <Option
          className={classNames(className)}
          onClick={this.removeInlineStyles}
        >
          <img
            src={icon}
            role="presentation"
          />
        </Option>
      </div>
    );
  }
}

// todo: add unit test case

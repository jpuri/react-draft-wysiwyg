/* @flow */

import React, { Component, PropTypes } from 'react';
import { EditorState, Modifier } from 'draft-js';
import { Component } from './Component';

export default class Remove extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    config: PropTypes.object,
  };

  removeAllInlineStyles: Function = (editorState: EditorState): void => {
    let contentState = editorState.getCurrentContent();
    [
      'BOLD',
      'ITALIC',
      'UNDERLINE',
      'STRIKETHROUGH',
      'MONOSPACE',
      'FONTFAMILY',
      'COLOR',
      'BGCOLOR',
      'FONTSIZE',
      'SUPERSCRIPT',
      'SUBSCRIPT',
    ].forEach((style) => {
      contentState = Modifier.removeInlineStyle(
        contentState,
        editorState.getSelection(),
        style
      );
    });
    return EditorState.push(editorState, contentState, 'change-inline-style');
  };

  removeInlineStyles: Function = (): void => {
    const { editorState, onChange } = this.props;
    onChange(this.removeAllInlineStyles(editorState));
  };

  render(): Object {
    const { config } = this.props;
    const RemoveComponent = config.component || Component;
    if (Comp) {
      return (
        <RemoveComponent
          config={config}
          onChange={this.removeInlineStyles}
        />
      );
    }
  }
}

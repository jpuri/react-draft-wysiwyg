/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import { Editor } from '../../src';
import toolbar from './redesignedToolbar.js';

import './styles.css';

class Redesigned extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  toggleBold: Function = (): void => {
    const { editorState, onChange } = this.props;
    const newState = RichUtils.toggleInlineStyle(
      editorState,
      'BOLD',
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    return (
      <div className="rdw-storybook-custom-option" onClick={this.toggleBold}>B</div>
    );
  }
}

const CustomToolbarRedesigned = () =>
  (<div className="rdw-storybook-root">
    <Editor
      toolbar={toolbar}
      toolbarClassName="rdw-storybook-toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
      placeholder="Type your message..."
    />
  </div>);

export default CustomToolbarRedesigned;

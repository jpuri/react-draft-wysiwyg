/* @flow */

import React from 'react';
import { Editor } from '../../src';
import './styles.css';

const FloatingToolbar = () =>
  (<div className="rdw-storybook-root">
    <h3>Toolbar appears as editor is clicked</h3>
    <Editor
      toolbarOnFocus
      toolbarClassName="rdw-storybook-toolbar-absolute"
      wrapperClassName="rdw-storybook-wrapper-margined"
      editorClassName="rdw-storybook-editor"
    />
  </div>);

export default FloatingToolbar;

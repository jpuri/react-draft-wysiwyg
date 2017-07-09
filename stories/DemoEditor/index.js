/* @flow */

import React from 'react';
import { Editor } from '../../src';

const DemoEditor = () =>
  (<div className="rdw-storybook-root">
    <Editor
      toolbarClassName="rdw-storybook--toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
    />
  </div>);

export default DemoEditor;

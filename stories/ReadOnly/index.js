/* @flow */

import React from 'react';
import { Editor } from '../../src';

const Basic = () =>
  (<div className="rdw-storybook-root">
    <h3>ReadOnly editor</h3>
    <Editor
      readOnly
      toolbarClassName="rdw-storybook--toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
    />
  </div>);

export default Basic;
